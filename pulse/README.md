# Pulse collector for Cloudflare Pages

Prepared for the existing `realmeetclub-cf-test` Pages project. This does not use PHP or Vercel. The collector is disabled until explicitly configured.

## Activation (required before merging to production)

1. Inspect the current Pages build command/output directory. Ensure root `functions/` is compiled; if the build generates `_worker.js`, adapt its router instead (advanced mode ignores `functions/`). Keep existing routing/SEO behavior.
2. Create a D1 database and apply `pulse/schema.sql`. Bind it as `PULSE_DB` in the Pages environment. Use an isolated database for preview.
3. Generate a random 32-byte hex secret outside the repository. Set `PULSE_EXPORT_KEY` as an encrypted Pages secret. Never commit it or put it in HTML/URLs. Configure Pulse with the same secret through its authenticated collector connection form.
4. Set `PULSE_ENABLED=true`. The default origin allowlist contains `https://realmeetclub.com` and `https://www.realmeetclub.com`. For isolated preview tests, set `PULSE_ORIGIN` to the exact preview origin.
5. Redeploy; verify `/api/pulse-track` returns JSON 401 without export credentials (not HTML). Test a tagged visit and an age-option redirect, then verify stable export and deduplicated import into Pulse. Do not enable unattended pulls until verified.

## Contract and interpretation

`POST /api/pulse-track`: same-origin JSON `{event: 'visit'|'outbound',link_id: UUIDv4|null,click_id: UUIDv4}`. Server timestamps; no personal/contact/form data, IP, cookies or affiliate URL parameters stored. Browser-origin checks do not prove that traffic is human. Outbound means redirect initiated, not that the destination loaded or a conversion occurred.

`GET /api/pulse-track?after=0&limit=200` with `X-Pulse-Token`: existing `pulse-collector-v1` contract. Integer sequence cursor, immutable events, idempotent event IDs, at most 200 events. Untagged rows advance the cursor but are excluded from attributed events. An optional `summary` reports 90 days of UTC visit/outbound counts split into tagged and untagged. They are total browser navigation events, not unique people; old traffic is not reconstructed. Clients that ignore `summary` still import tagged events normally.

Existing links work without changing destinations. To identify a fanpage/post, use a link created in Pulse with its `pulse_link` ID. Plain old links remain unassigned; never infer page ownership from country/locale alone. FireAds does not currently provide a verified click-ID match; do not add guessed sub-ID parameters or attribute its lead amounts to these events.

The explicit outbound event is emitted in `email-transition.js` only after the redirect has been accepted. Test both age options and localized profile paths. Other custom landing flows (e.g. a separately hosted Julie page) need their own reviewed integration before claiming coverage.

No production activation, database, secret or successful live event receipt is asserted by this change.
