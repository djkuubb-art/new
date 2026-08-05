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

const cleanText = (value, maxLength = 120) => {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength);
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

const parseBody = (req) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body || '');
  return raw ? JSON.parse(raw) : {};
};

const sameOrigin = (req) => {
  const origin = cleanText(req.headers.origin || '', 240);
  if (!origin) return true;
  try {
    return new URL(origin).host === String(req.headers.host || '');
  } catch (_) {
    return false;
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sameOrigin(req)) return res.status(403).json({ error: 'Invalid origin' });

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > 8192) return res.status(413).json({ error: 'Payload too large' });

  const supabaseUrl = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const serviceKey = String(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  if (!supabaseUrl || !serviceKey) {
    return res.status(503).json({ error: 'Analytics database is not configured' });
  }

  let body;
  try {
    body = parseBody(req);
  } catch (_) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const eventName = cleanText(body.event_name, 64);
  const eventId = cleanText(body.event_id, 36);
  const sessionId = cleanText(body.session_id, 36);

  if (!ALLOWED_EVENTS.has(eventName)) return res.status(400).json({ error: 'Invalid event' });
  if (!UUID_PATTERN.test(eventId) || !UUID_PATTERN.test(sessionId)) {
    return res.status(400).json({ error: 'Invalid identifier' });
  }

  const country = cleanText(
    req.headers['x-vercel-ip-country'] || req.headers['cf-ipcountry'] || '',
    2
  ).toUpperCase();

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
    country,
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
      return res.status(502).json({ error: 'Analytics insert failed' });
    }

    return res.status(204).end();
  } catch (error) {
    console.error('Analytics request failed', error instanceof Error ? error.message : error);
    return res.status(502).json({ error: 'Analytics service unavailable' });
  }
};
