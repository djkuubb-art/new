const SOURCE_URL = 'https://res.cloudinary.com/cbsmrwea/image/upload/v1788273455/grok-image-eb4ab127-955d-4d72-8798-0a93df4c4277.jpg';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  let upstream = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      upstream = await fetch(SOURCE_URL, {
        cache: 'no-store',
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'user-agent': 'RealMeetClub-Image-Proxy/1.0'
        }
      });

      if (upstream.ok) break;
    } catch (_) {
      upstream = null;
    }

    if (attempt < 2) await sleep(180 * (attempt + 1));
  }

  if (!upstream || !upstream.ok) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('CDN-Cache-Control', 'no-store');
    res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
    return res.status(502).end();
  }

  const contentType = upstream.headers.get('content-type') || 'image/jpeg';
  const etag = upstream.headers.get('etag');
  const lastModified = upstream.headers.get('last-modified');

  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('CDN-Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400');
  if (etag) res.setHeader('ETag', etag);
  if (lastModified) res.setHeader('Last-Modified', lastModified);

  if (req.method === 'HEAD') return res.status(200).end();

  const body = Buffer.from(await upstream.arrayBuffer());
  return res.status(200).send(body);
};
