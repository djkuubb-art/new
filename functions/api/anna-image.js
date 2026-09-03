export async function onRequest({ request }) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response(null, {
      status: 405,
      headers: { Allow: 'GET, HEAD' }
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/anna.jpg?v=20260902-1',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'CDN-Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=86400',
      'Cloudflare-CDN-Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=86400'
    }
  });
}
