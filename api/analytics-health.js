const { randomUUID } = require('crypto');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const supabaseUrl = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const secretKey = String(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  if (!supabaseUrl || !secretKey) {
    return res.status(503).json({ ok: false, error: 'Analytics environment variables are missing' });
  }

  const row = {
    event_id: randomUUID(),
    session_id: randomUUID(),
    event_name: 'page_view',
    locale: 'pl',
    country: '',
    device: 'server-test',
    slot: 'health_check',
    path: '/api/analytics-health',
    referrer_host: '',
    source: 'staging_health_check',
    medium: 'server',
    campaign: 'supabase_setup',
    term: '',
    content: '',
    sub1: '',
    sub2: '',
    sub3: '',
    metadata: { temporary_test: true }
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
      method: 'POST',
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      return res.status(502).json({ ok: false, status: response.status, error: detail });
    }

    return res.status(200).json({ ok: true, inserted: true });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Analytics request failed'
    });
  }
};
