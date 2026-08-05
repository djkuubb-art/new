module.exports = async function handler(req, res) {
  const urls = {
    hero: 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:good,c_fill,g_auto,w_540,h_735/v1785806218/5_1_casfeq.png',
    avatar: 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:eco,c_fill,g_face,w_96,h_96/v1785806218/5_1_casfeq.png',
    card: 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:good,c_fill,g_auto,ar_3:4,w_480/v1785864718/a2da64a7-ee33-4baf-a2d6-e20504f45b50_ekpe66.png'
  };

  const results = {};
  for (const [name, url] of Object.entries(urls)) {
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const buffer = await response.arrayBuffer();
      results[name] = {
        ok: response.ok,
        status: response.status,
        type: response.headers.get('content-type'),
        bytes: buffer.byteLength,
        finalUrl: response.url
      };
    } catch (error) {
      results[name] = { ok: false, error: String(error && error.message || error) };
    }
  }

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(results);
};
