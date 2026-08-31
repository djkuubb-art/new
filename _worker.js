const ALLOWED_EVENTS = new Set([
  'page_view',
  'cta_click',
  'age_gate_open',
  'age_selected',
  'profile_open',
  'language_change',
  'voice_message_visible',
  'voice_message_play',
  'voice_message_complete',
  'voice_cta_play',
  'voice_notification_open_main_profile'
]);

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const COOKIE_NAME = 'rmc_analytics_admin';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
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

const cleanText = (value, maxLength = 120) => {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength);
};

const json = (data, status = 200, extraHeaders = {}) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders
  }
});

const noStoreHeaders = (extra = {}) => ({
  'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Pragma': 'no-cache',
  ...extra
});

const decodeHeader = (value) => {
  if (!value) return '';
  try {
    return decodeURIComponent(String(value).replace(/\+/g, ' '));
  } catch (_) {
    return String(value);
  }
};

const parseCookies = (header = '') => {
  const cookies = {};
  String(header).split(';').forEach((part) => {
    const index = part.indexOf('=');
    if (index < 0) return;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!key) return;
    try { cookies[key] = decodeURIComponent(value); }
    catch (_) { cookies[key] = value; }
  });
  return cookies;
};

const bytesEqual = (left, right) => {
  if (!(left instanceof Uint8Array) || !(right instanceof Uint8Array) || left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left[i] ^ right[i];
  return diff === 0;
};

const sha256 = async (value) => new Uint8Array(
  await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(value)))
);

const safeEqualText = async (left, right) => bytesEqual(await sha256(left), await sha256(right));

const base64Url = (bytes) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const getPassword = (env) => String(env.ANALYTICS_PASSWORD || '');

const getSigningSecret = (env) => {
  const serverSecret = String(env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '');
  return `${getPassword(env)}\u0000${serverSecret}`;
};

const sign = async (env, payload) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSigningSecret(env)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return base64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))));
};

const createSessionToken = async (env) => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const random = new Uint8Array(18);
  crypto.getRandomValues(random);
  const nonce = base64Url(random);
  const payload = `${expiresAt}.${nonce}`;
  return `${payload}.${await sign(env, payload)}`;
};

const verifySessionToken = async (env, token) => {
  if (!getPassword(env) || !getSigningSecret(env)) return false;
  const parts = String(token || '').split('.');
  if (parts.length !== 3) return false;
  const [expiresRaw, nonce, signature] = parts;
  if (!/^\d{10,}$/.test(expiresRaw) || !/^[A-Za-z0-9_-]{16,}$/.test(nonce)) return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  return safeEqualText(signature, await sign(env, `${expiresRaw}.${nonce}`));
};

const isAuthenticated = async (request, env) => {
  const cookies = parseCookies(request.headers.get('cookie') || '');
  return verifySessionToken(env, cookies[COOKIE_NAME]);
};

const sessionCookie = (token) => [
  `${COOKIE_NAME}=${encodeURIComponent(token)}`,
  'Path=/',
  `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  'HttpOnly',
  'Secure',
  'SameSite=Strict'
].join('; ');

const clearSessionCookie = () => [
  `${COOKIE_NAME}=`,
  'Path=/',
  'Max-Age=0',
  'HttpOnly',
  'Secure',
  'SameSite=Strict'
].join('; ');

const sameOrigin = (request) => {
  const origin = cleanText(request.headers.get('origin') || '', 240);
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch (_) {
    return false;
  }
};

const geoForRequest = (request) => {
  const cf = request.cf || {};
  const country = String(
    cf.country ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    ''
  ).toUpperCase();

  const city = decodeHeader(
    cf.city ||
    request.headers.get('cf-ipcity') ||
    request.headers.get('x-vercel-ip-city') ||
    ''
  );

  const region = decodeHeader(
    cf.regionCode ||
    cf.region ||
    request.headers.get('cf-region-code') ||
    request.headers.get('cf-region') ||
    request.headers.get('x-vercel-ip-country-region') ||
    ''
  );

  return { country, city, region };
};

const cleanMetadata = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const output = {};
  for (const [key, raw] of Object.entries(value).slice(0, 12)) {
    const safeKey = cleanText(key, 40);
    if (!safeKey) continue;
    if (typeof raw === 'string') output[safeKey] = cleanText(raw, 160);
    else if (typeof raw === 'number' && Number.isFinite(raw)) output[safeKey] = raw;
    else if (typeof raw === 'boolean') output[safeKey] = raw;
  }
  return output;
};

const handleGeo = async (request) => json(geoForRequest(request), 200, noStoreHeaders());

const handleGo = async (request, env) => {
  const fallback = 'https://www.realmeetclub.com/';
  const destination = String(env.AFFILIATE_URL || fallback);
  let target;

  try { target = new URL(destination); }
  catch (_) { target = new URL(fallback); }

  const incoming = new URL(request.url);
  const blocked = new Set(['slot']);
  for (const [key, value] of incoming.searchParams.entries()) {
    if (!blocked.has(key)) target.searchParams.set(key, value);
  }

  if (incoming.searchParams.has('slot')) {
    target.searchParams.set('utm_content', incoming.searchParams.get('slot') || '');
  }
  if (!target.searchParams.has('utm_source')) target.searchParams.set('utm_source', 'heartmatch');
  if (!target.searchParams.has('utm_medium')) target.searchParams.set('utm_medium', 'landing');

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'no-store'
    }
  });
};

const handleTrack = async (request, env) => {
  const headers = noStoreHeaders();
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { ...headers, Allow: 'POST' });
  if (!sameOrigin(request)) return json({ error: 'Invalid origin' }, 403, headers);

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 8192) return json({ error: 'Payload too large' }, 413, headers);

  const supabaseUrl = String(env.SUPABASE_URL || '').replace(/\/$/, '');
  const serviceKey = String(env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '');
  if (!supabaseUrl || !serviceKey) return json({ error: 'Analytics database is not configured' }, 503, headers);

  let body;
  try { body = await request.json(); }
  catch (_) { return json({ error: 'Invalid JSON' }, 400, headers); }

  const eventName = cleanText(body.event_name, 64);
  const eventId = cleanText(body.event_id, 36);
  const sessionId = cleanText(body.session_id, 36);

  if (!ALLOWED_EVENTS.has(eventName)) return json({ error: 'Invalid event' }, 400, headers);
  if (!UUID_PATTERN.test(eventId) || !UUID_PATTERN.test(sessionId)) {
    return json({ error: 'Invalid identifier' }, 400, headers);
  }

  let referrerHost = cleanText(body.referrer_host, 180);
  if (referrerHost) {
    try { referrerHost = new URL(`https://${referrerHost}`).hostname.slice(0, 180); }
    catch (_) { referrerHost = ''; }
  }

  const row = {
    event_id: eventId,
    session_id: sessionId,
    event_name: eventName,
    locale: cleanText(body.locale, 12),
    country: cleanText(geoForRequest(request).country, 2).toUpperCase(),
    device: cleanText(body.device, 16),
    slot: cleanText(body.slot, 64),
    path: cleanText(body.path, 240),
    referrer_host: referrerHost,
    source: cleanText(body.source, 120),
    medium: cleanText(body.medium, 120),
    campaign: cleanText(body.campaign, 160),
    term: cleanText(body.term, 160),
    content: cleanText(body.content, 160),
    sub1: cleanText(body.sub1, 160),
    sub2: cleanText(body.sub2, 160),
    sub3: cleanText(body.sub3, 160),
    metadata: cleanMetadata(body.metadata)
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (!response.ok) {
      const message = (await response.text()).slice(0, 500);
      console.error('Analytics insert failed', response.status, message);
      return json({ error: 'Analytics insert failed' }, 502, headers);
    }

    return new Response(null, { status: 204, headers });
  } catch (error) {
    console.error('Analytics request failed', error instanceof Error ? error.message : error);
    return json({ error: 'Analytics service unavailable' }, 502, headers);
  }
};

const handleAnalyticsAuth = async (request, env) => {
  const headers = noStoreHeaders({ 'X-Robots-Tag': 'noindex, nofollow, noarchive' });
  if (!getPassword(env)) return json({ authenticated: false, error: 'Panel password is not configured' }, 503, headers);

  if (request.method === 'GET') {
    return json({ authenticated: await isAuthenticated(request, env) }, 200, headers);
  }

  if (request.method === 'DELETE') {
    if (!sameOrigin(request)) return json({ error: 'Invalid origin' }, 403, headers);
    return new Response(null, { status: 204, headers: { ...headers, 'Set-Cookie': clearSessionCookie() } });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { ...headers, Allow: 'GET, POST, DELETE' });
  }

  if (!sameOrigin(request)) return json({ error: 'Invalid origin' }, 403, headers);
  if (Number(request.headers.get('content-length') || 0) > 2048) {
    return json({ error: 'Payload too large' }, 413, headers);
  }

  let body;
  try { body = await request.json(); }
  catch (_) { return json({ error: 'Invalid JSON' }, 400, headers); }

  const suppliedPassword = typeof body.password === 'string' ? body.password : '';
  if (!(await safeEqualText(suppliedPassword, getPassword(env)))) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return json({ authenticated: false, error: 'Nieprawidłowe hasło' }, 401, headers);
  }

  return json(
    { authenticated: true },
    200,
    { ...headers, 'Set-Cookie': sessionCookie(await createSessionToken(env)) }
  );
};

const parseDateRange = (searchParams) => {
  const now = new Date();
  let from = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  let to = now;
  const fromRaw = cleanText(searchParams.get('from') || '', 10);
  const toRaw = cleanText(searchParams.get('to') || '', 10);
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
  if (rangeDays > MAX_RANGE_DAYS + 0.01) throw new Error(`Maksymalny zakres to ${MAX_RANGE_DAYS} dni`);
  return { from, to };
};

const sourceKey = (row) => cleanText(row.source, 180) || cleanText(row.referrer_host, 180) || 'direct';
const percentage = (value, base) => base > 0 ? Math.round((value / base) * 1000) / 10 : 0;

const uniqueCount = (rows, eventName) => {
  const sessions = new Set();
  for (const row of rows) {
    if (row.event_name === eventName && row.session_id) sessions.add(row.session_id);
  }
  return sessions.size;
};

const uniqueBreakdown = (rows, eventName, keyFn, limit = 20) => {
  const groups = new Map();
  for (const row of rows) {
    if (row.event_name !== eventName || !row.session_id) continue;
    const key = cleanText(String(keyFn(row) || ''), 180) || 'brak';
    if (!groups.has(key)) groups.set(key, new Set());
    groups.get(key).add(row.session_id);
  }
  return [...groups.entries()]
    .map(([name, sessions]) => ({ name, count: sessions.size }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
};

const dailyTrend = (rows) => {
  const days = new Map();
  for (const row of rows) {
    if (!row.session_id || typeof row.occurred_at !== 'string') continue;
    const day = row.occurred_at.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
    if (!days.has(day)) days.set(day, { page_view: new Set(), cta_click: new Set(), age_selected: new Set() });
    const bucket = days.get(day);
    if (bucket[row.event_name]) bucket[row.event_name].add(row.session_id);
  }

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

const handleAnalyticsData = async (request, env) => {
  const headers = noStoreHeaders({ 'X-Robots-Tag': 'noindex, nofollow, noarchive' });
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { ...headers, Allow: 'GET' });
  if (!(await isAuthenticated(request, env))) return json({ error: 'Wymagane logowanie' }, 401, headers);

  const supabaseUrl = String(env.SUPABASE_URL || '').replace(/\/$/, '');
  const secretKey = String(env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '');
  if (!supabaseUrl || !secretKey) return json({ error: 'Baza analityczna nie jest skonfigurowana' }, 503, headers);

  const url = new URL(request.url);
  let range;
  try { range = parseDateRange(url.searchParams); }
  catch (error) { return json({ error: error.message }, 400, headers); }

  const countryRaw = cleanText(url.searchParams.get('country') || '', 2).toUpperCase();
  const country = /^[A-Z]{2}$/.test(countryRaw) ? countryRaw : '';
  const deviceRaw = cleanText(url.searchParams.get('device') || '', 16).toLowerCase();
  const device = ['mobile', 'desktop'].includes(deviceRaw) ? deviceRaw : '';
  const localeRaw = cleanText(url.searchParams.get('locale') || '', 12);
  const locale = /^[A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(localeRaw) ? localeRaw : '';
  const selectedSource = cleanText(url.searchParams.get('source') || '', 180);

  try {
    const result = await fetchRows({ supabaseUrl, secretKey, from: range.from, to: range.to, country, device, locale });
    const availableSources = [...new Set(result.rows.map(sourceKey))].sort((a, b) => a.localeCompare(b));
    const rows = selectedSource ? result.rows.filter((row) => sourceKey(row) === selectedSource) : result.rows;

    const stageCounts = Object.fromEntries(FUNNEL_STAGES.map(([eventName]) => [eventName, uniqueCount(rows, eventName)]));
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
      (row) => row.metadata && typeof row.metadata.age_range === 'string' ? row.metadata.age_range : 'brak'
    );

    return json({
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
        voice_completion_rate: percentage(stageCounts.voice_message_complete || 0, stageCounts.voice_message_play || 0)
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
    }, 200, headers);
  } catch (error) {
    console.error('Analytics dashboard query failed', error instanceof Error ? error.message : error);
    return json({ error: 'Nie udało się pobrać danych z bazy' }, 502, headers);
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/geo') return handleGeo(request);
    if (url.pathname === '/api/go') return handleGo(request, env);
    if (url.pathname === '/api/track') return handleTrack(request, env);
    if (url.pathname === '/api/analytics-auth') return handleAnalyticsAuth(request, env);
    if (url.pathname === '/api/analytics-data') return handleAnalyticsData(request, env);

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'Not found' }, 404, noStoreHeaders());
    }

    return env.ASSETS.fetch(request);
  }
};
