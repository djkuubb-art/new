module.exports = function handler(req, res) {
  const fallback = 'https://www.realmeetclub.com/';
  const destination = process.env.AFFILIATE_URL || fallback;
  let url;

  try {
    url = new URL(destination);
  } catch {
    url = new URL(fallback);
  }

  const blocked = new Set(['slot']);
  for (const [key, value] of Object.entries(req.query || {})) {
    if (!blocked.has(key) && typeof value === 'string') url.searchParams.set(key, value);
  }

  if (req.query?.slot) url.searchParams.set('utm_content', String(req.query.slot));
  if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'heartmatch');
  if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', 'landing');

  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, url.toString());
};
