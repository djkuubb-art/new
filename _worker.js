const json = (data, status = 200, extraHeaders = {}) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders
  }
});

const noStoreHeaders = (extra = {}) => ({
  'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Pragma': 'no-cache',
  ...extra
});

const geoForRequest = (request) => {
  const cf = request.cf || {};
  return {
    country: String(cf.country || request.headers.get('cf-ipcountry') || '').toUpperCase(),
    city: String(cf.city || request.headers.get('cf-ipcity') || ''),
    region: String(cf.regionCode || cf.region || request.headers.get('cf-region-code') || request.headers.get('cf-region') || '')
  };
};

const handleGeo = (request) => json(geoForRequest(request), 200, noStoreHeaders());

const handleGo = (request, env) => {
  const fallback = 'https://www.realmeetclub.com/';
  const destination = String(env.AFFILIATE_URL || fallback);
  let target;

  try { target = new URL(destination); }
  catch (_) { target = new URL(fallback); }

  const incoming = new URL(request.url);
  for (const [key, value] of incoming.searchParams.entries()) {
    if (key !== 'slot') target.searchParams.set(key, value);
  }

  if (incoming.searchParams.has('slot')) {
    target.searchParams.set('utm_content', incoming.searchParams.get('slot') || '');
  }
  if (!target.searchParams.has('utm_source')) target.searchParams.set('utm_source', 'heartmatch');
  if (!target.searchParams.has('utm_medium')) target.searchParams.set('utm_medium', 'landing');

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'no-store'
    }
  });
};

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/api/geo') return handleGeo(request);
    if (pathname === '/api/go') return handleGo(request, env);
    return json({ error: 'Not found' }, 404, noStoreHeaders());
  }
};
