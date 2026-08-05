const { isAuthenticated } = require('../lib/analytics-auth');

const BATCH_SIZE = 1000;
const MAX_ROWS = 100000;
const MAX_RANGE_DAYS = 31;

const FUNNEL_STAGES = [
  ['page_view', 'Wejścia'],
  ['voice_message_play', 'Start głosówki'],
  ['voice_message_complete', 'Pełne odsłuchanie'],
  ['cta_click', 'Kliknięcie CTA'],
  ['age_gate_open', 'Otwarcie wyboru wieku'],
  ['age_selected', 'Wybór wieku']
];

const cleanText = (value, maxLength = 180) => {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength);
};

const parseDateRange = (query) => {
  const now = new Date();
  let from = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  let to = now;

  const fromRaw = cleanText(query.from, 10);
  const toRaw = cleanText(query.to, 10);
  const dayPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (fromRaw) {
    if (!dayPattern.test(fromRaw)) throw new Error('Nieprawidłowa data początkowa');
    from = new Date(`${fromRaw}T00:00:00.000Z`);
  }

  if (toRaw) {
    if (!dayPattern.test(toRaw)) throw new Error('Nieprawidłowa data końcowa');
    to = new Date(`${toRaw}T00:00:00.000Z`);
    to.setUTCDate(to.getUTCDate() + 1);
  }

  if (!Number.isFinite(from.getTime()) || !Number.isFinite(to.getTime()) || from >= to) {
    throw new Error('Nieprawidłowy zakres dat');
  }

  const rangeDays = (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
  if (rangeDays > MAX_RANGE_DAYS + 0.01) {
    throw new Error(`Maksymalny zakres to ${MAX_RANGE_DAYS} dni`);
  }

  return { from, to };
};

const sourceKey = (row) => cleanText(row.source, 180) || cleanText(row.referrer_host, 180) || 'direct';

const percentage = (value, base) => base > 0 ? Math.round((value / base) * 1000) / 10 : 0;

const uniqueCount = (rows, eventName) => {
  const sessions = new Set();
  rows.forEach((row) => {
    if (row.event_name === eventName && row.session_id) sessions.add(row.session_id);
  });
  return sessions.size;
};

const uniqueBreakdown = (rows, eventName, keyFn, limit = 20) => {
  const groups = new Map();
  rows.forEach((row) => {
    if (row.event_name !== eventName || !row.session_id) return;
    const key = cleanText(String(keyFn(row) || ''), 180) || 'brak';
    if (!groups.has(key)) groups.set(key, new Set());
    groups.get(key).add(row.session_id);
  });
  return [...groups.entries()]
    .map(([name, sessions]) => ({ name, count: sessions.size }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
};

const dailyTrend = (rows) => {
  const days = new Map();
  rows.forEach((row) => {
    if (!row.session_id || typeof row.occurred_at !== 'string') return;
    const day = row.occurred_at.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return;
    if (!days.has(day)) {
      days.set(day, { page_view: new Set(), cta_click: new Set(), age_selected: new Set() });
    }
    const bucket = days.get(day);
    if (bucket[row.event_name]) bucket[row.event_name].add(row.session_id);
  });

  return [...days.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, values]) => ({
      date,
      visits: values.page_view.size,
      cta: values.cta_click.size,
      age: values.age_selected.size
    }));
};

const fetchRows = async ({ supabaseUrl, secretKey, from, to, country, device, locale }) => {
  const params = new URLSearchParams();
  params.set('select', 'event_name,session_id,country,locale,device,slot,referrer_host,source,metadata,occurred_at');
  params.append('occurred_at', `gte.${from.toISOString()}`);
  params.append('occurred_at', `lt.${to.toISOString()}`);
  params.set('order', 'occurred_at.asc');
  if (country) params.set('country', `eq.${country}`);
  if (device) params.set('device', `eq.${device}`);
  if (locale) params.set('locale', `eq.${locale}`);

  const endpoint = `${supabaseUrl}/rest/v1/analytics_events?${params.toString()}`;
  const rows = [];
  let truncated = false;

  for (let start = 0; start < MAX_ROWS; start += BATCH_SIZE) {
    const response = await fetch(endpoint, {
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        Range: `${start}-${start + BATCH_SIZE - 1}`,
        'Range-Unit': 'items'
      }
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 400);
      throw new Error(`Supabase ${response.status}: ${detail}`);
    }

    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Nieprawidłowa odpowiedź bazy');
    rows.push(...batch);
    if (batch.length < BATCH_SIZE) break;
    if (rows.length >= MAX_ROWS) truncated = true;
  }

  return { rows: rows.slice(0, MAX_ROWS), truncated };
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Wymagane logowanie' });

  const supabaseUrl = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const secretKey = String(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  if (!supabaseUrl || !secretKey) {
    return res.status(503).json({ error: 'Baza analityczna nie jest skonfigurowana' });
  }

  let range;
  try { range = parseDateRange(req.query || {}); }
  catch (error) { return res.status(400).json({ error: error.message }); }

  const countryRaw = cleanText(req.query?.country, 2).toUpperCase();
  const country = /^[A-Z]{2}$/.test(countryRaw) ? countryRaw : '';
  const deviceRaw = cleanText(req.query?.device, 16).toLowerCase();
  const device = ['mobile', 'desktop'].includes(deviceRaw) ? deviceRaw : '';
  const localeRaw = cleanText(req.query?.locale, 12);
  const locale = /^[A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(localeRaw) ? localeRaw : '';
  const selectedSource = cleanText(req.query?.source, 180);

  try {
    const result = await fetchRows({
      supabaseUrl,
      secretKey,
      from: range.from,
      to: range.to,
      country,
      device,
      locale
    });

    const availableSources = [...new Set(result.rows.map(sourceKey))].sort((a, b) => a.localeCompare(b));
    const rows = selectedSource
      ? result.rows.filter((row) => sourceKey(row) === selectedSource)
      : result.rows;

    const stageCounts = Object.fromEntries(
      FUNNEL_STAGES.map(([eventName]) => [eventName, uniqueCount(rows, eventName)])
    );
    const visits = stageCounts.page_view || 0;

    const funnel = FUNNEL_STAGES.map(([key, label], index) => {
      const count = stageCounts[key] || 0;
      const previousCount = index === 0 ? count : stageCounts[FUNNEL_STAGES[index - 1][0]] || 0;
      return {
        key,
        label,
        count,
        from_previous: index === 0 ? 100 : percentage(count, previousCount),
        from_start: percentage(count, visits)
      };
    });

    const countries = uniqueBreakdown(rows, 'page_view', (row) => row.country || 'brak');
    const devices = uniqueBreakdown(rows, 'page_view', (row) => row.device || 'brak');
    const locales = uniqueBreakdown(rows, 'page_view', (row) => row.locale || 'brak');
    const sources = uniqueBreakdown(rows, 'page_view', sourceKey);
    const ctaSlots = uniqueBreakdown(rows, 'cta_click', (row) => row.slot || 'unknown');
    const ageRanges = uniqueBreakdown(
      rows,
      'age_selected',
      (row) => row.metadata && typeof row.metadata.age_range === 'string'
        ? row.metadata.age_range
        : 'brak'
    );

    return res.status(200).json({
      generated_at: new Date().toISOString(),
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      filters: { country, device, locale, source: selectedSource },
      totals: {
        visits,
        voice_started: stageCounts.voice_message_play || 0,
        voice_completed: stageCounts.voice_message_complete || 0,
        cta: stageCounts.cta_click || 0,
        age_selected: stageCounts.age_selected || 0,
        cta_rate: percentage(stageCounts.cta_click || 0, visits),
        age_rate: percentage(stageCounts.age_selected || 0, visits),
        voice_completion_rate: percentage(
          stageCounts.voice_message_complete || 0,
          stageCounts.voice_message_play || 0
        )
      },
      funnel,
      trend: dailyTrend(rows),
      breakdowns: { countries, devices, locales, sources, cta_slots: ctaSlots, age_ranges: ageRanges },
      options: {
        countries: [...new Set(result.rows.map((row) => row.country).filter(Boolean))].sort(),
        locales: [...new Set(result.rows.map((row) => row.locale).filter(Boolean))].sort(),
        sources: availableSources
      },
      processed_rows: rows.length,
      truncated: result.truncated
    });
  } catch (error) {
    console.error('Analytics dashboard query failed', error instanceof Error ? error.message : error);
    return res.status(502).json({ error: 'Nie udało się pobrać danych z bazy' });
  }
};
