module.exports = function handler(req, res) {
  const country = String(
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    ''
  ).toUpperCase();

  // This response depends on the visitor's IP country and must never be
  // shared through a CDN cache between different visitors.
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.status(200).json({ country });
};
