const FALLBACK_URL = 'https://www.realmeetclub.com/';

const noStoreHeaders = {
  'Cache-Control': 'no-store',
  'CDN-Cache-Control': 'no-store',
  'Cloudflare-CDN-Cache-Control': 'no-store'
};

export async function onRequest({ request, env }) {
  const destination = String(env.AFFILIATE_URL || FALLBACK_URL);
  let target;

  try {
    target = new URL(destination);
  } catch (_) {
    target = new URL(FALLBACK_URL);
  }

  const incoming = new URL(request.url);

  for (const [key, value] of incoming.searchParams.entries()) {
    if (key !== 'slot') target.searchParams.set(key, value);
  }

  if (incoming.searchParams.has('slot')) {
    target.searchParams.set('utm_content', incoming.searchParams.get('slot') || '');
  }

  if (!target.searchParams.has('utm_source')) {
    target.searchParams.set('utm_source', 'heartmatch');
  }

  if (!target.searchParams.has('utm_medium')) {
    target.searchParams.set('utm_medium', 'landing');
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      ...noStoreHeaders
    }
  });
}
