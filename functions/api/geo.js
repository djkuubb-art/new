const noStoreHeaders = {
  'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Cloudflare-CDN-Cache-Control': 'no-store',
  'Pragma': 'no-cache',
  'Content-Type': 'application/json; charset=utf-8'
};

export async function onRequest({ request }) {
  const cf = request.cf || {};

  const country = String(cf.country || request.headers.get('cf-ipcountry') || '').toUpperCase();
  const city = String(cf.city || request.headers.get('cf-ipcity') || '');
  const region = String(
    cf.regionCode || cf.region || request.headers.get('cf-region-code') || request.headers.get('cf-region') || ''
  );

  return new Response(JSON.stringify({ country, city, region }), {
    status: 200,
    headers: noStoreHeaders
  });
}
