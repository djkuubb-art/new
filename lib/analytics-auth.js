const crypto = require('crypto');

const COOKIE_NAME = 'rmc_analytics_admin';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const getPassword = () => String(process.env.ANALYTICS_PASSWORD || '');

const getSigningSecret = () => {
  const serverSecret = String(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''
  );
  return `${getPassword()}\u0000${serverSecret}`;
};

const safeEqual = (left, right) => {
  const leftHash = crypto.createHash('sha256').update(String(left)).digest();
  const rightHash = crypto.createHash('sha256').update(String(right)).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
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

const sign = (payload) => crypto
  .createHmac('sha256', getSigningSecret())
  .update(payload)
  .digest('base64url');

const createSessionToken = () => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const nonce = crypto.randomBytes(18).toString('base64url');
  const payload = `${expiresAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
};

const verifySessionToken = (token) => {
  if (!getPassword() || !getSigningSecret()) return false;
  const parts = String(token || '').split('.');
  if (parts.length !== 3) return false;
  const [expiresRaw, nonce, signature] = parts;
  if (!/^\d{10,}$/.test(expiresRaw) || !/^[A-Za-z0-9_-]{16,}$/.test(nonce)) return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(`${expiresRaw}.${nonce}`));
};

const isAuthenticated = (req) => {
  const cookies = parseCookies(req.headers.cookie || '');
  return verifySessionToken(cookies[COOKIE_NAME]);
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

module.exports = {
  clearSessionCookie,
  createSessionToken,
  getPassword,
  isAuthenticated,
  safeEqual,
  sessionCookie
};
