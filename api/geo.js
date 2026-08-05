module.exports = function handler(req, res) {
  const decodeHeader = (value) => {
    try {
      return decodeURIComponent(String(value || '').replace(/\+/g, ' ')).trim();
    } catch (_) {
      return String(value || '').trim();
    }
  };

  const country = String(
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    ''
  ).toUpperCase();

  const city = decodeHeader(
    req.headers['x-vercel-ip-city'] ||
    req.headers['cf-ipcity'] ||
    ''
  );

  const region = decodeHeader(
    req.headers['x-vercel-ip-country-region'] ||
    req.headers['cf-region'] ||
    ''
  );

  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.status(200).json({ country, city, region });
};
