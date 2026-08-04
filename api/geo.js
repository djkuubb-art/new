module.exports = function handler(req, res) {
  const country = String(
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    ''
  ).toUpperCase();

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
  res.status(200).json({ country });
};
