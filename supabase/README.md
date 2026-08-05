# RealMeetClub analytics setup

1. Create a free Supabase project.
2. Open **SQL Editor** and run the full contents of `supabase/analytics-schema.sql`.
3. In Supabase open **Project Settings → API** and copy:
   - Project URL
   - `service_role` key
4. In Vercel open **meetclub → Settings → Environment Variables** and add for both Preview and Production:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = `service_role` key
5. Redeploy the latest commit.

The service role key must stay server-side. Never place it in browser JavaScript or a public file.

The tracker stores only anonymous funnel data: event name, anonymous session UUID, country, locale, device type, CTA slot, page path, referrer hostname, UTM parameters and `sub1`–`sub3`. It does not store IP addresses, names, email addresses, city, GPS coordinates or message content.

Until both environment variables are configured, `/api/track` returns HTTP 503 and no data is stored.
