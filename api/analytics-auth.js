const {
  clearSessionCookie,
  createSessionToken,
  getPassword,
  isAuthenticated,
  safeEqual,
  sessionCookie
} = require('../lib/analytics-auth');

const cleanOrigin = (value) => {
  try { return new URL(String(value || '')).host; }
  catch (_) { return ''; }
};

const sameOrigin = (req) => {
  const origin = cleanOrigin(req.headers.origin);
  if (!origin) return true;
  return origin === String(req.headers.host || '');
};

const parseBody = (req) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body || '');
  return raw ? JSON.parse(raw) : {};
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  if (!getPassword()) {
    return res.status(503).json({ authenticated: false, error: 'Panel password is not configured' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ authenticated: isAuthenticated(req) });
  }

  if (req.method === 'DELETE') {
    if (!sameOrigin(req)) return res.status(403).json({ error: 'Invalid origin' });
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sameOrigin(req)) return res.status(403).json({ error: 'Invalid origin' });
  if (Number(req.headers['content-length'] || 0) > 2048) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  let body;
  try { body = parseBody(req); }
  catch (_) { return res.status(400).json({ error: 'Invalid JSON' }); }

  const suppliedPassword = typeof body.password === 'string' ? body.password : '';
  if (!safeEqual(suppliedPassword, getPassword())) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return res.status(401).json({ authenticated: false, error: 'Nieprawidłowe hasło' });
  }

  res.setHeader('Set-Cookie', sessionCookie(createSessionToken()));
  return res.status(200).json({ authenticated: true });
};
