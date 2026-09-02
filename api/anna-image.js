module.exports = function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('CDN-Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400');
  res.setHeader('Location', '/anna.jpg?v=20260902-1');
  return res.status(302).end();
};
