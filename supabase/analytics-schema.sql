create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_id uuid not null unique,
  session_id uuid not null,
  occurred_at timestamptz not null default now(),
  event_name text not null check (event_name in (
    'page_view',
    'cta_click',
    'age_gate_open',
    'age_selected',
    'profile_open',
    'language_change',
    'voice_message_visible',
    'voice_message_play',
    'voice_message_complete',
    'voice_cta_play',
    'voice_notification_open_main_profile'
  )),
  locale varchar(12) not null default '',
  country varchar(2) not null default '',
  device varchar(16) not null default '',
  slot varchar(64) not null default '',
  path varchar(240) not null default '',
  referrer_host varchar(180) not null default '',
  source varchar(120) not null default '',
  medium varchar(120) not null default '',
  campaign varchar(160) not null default '',
  term varchar(160) not null default '',
  content varchar(160) not null default '',
  sub1 varchar(160) not null default '',
  sub2 varchar(160) not null default '',
  sub3 varchar(160) not null default '',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists analytics_events_occurred_at_idx
  on public.analytics_events (occurred_at desc);

create index if not exists analytics_events_event_name_idx
  on public.analytics_events (event_name, occurred_at desc);

create index if not exists analytics_events_country_idx
  on public.analytics_events (country, occurred_at desc);

create index if not exists analytics_events_session_id_idx
  on public.analytics_events (session_id, occurred_at);

alter table public.analytics_events enable row level security;

revoke all on table public.analytics_events from anon, authenticated;
revoke all on sequence public.analytics_events_id_seq from anon, authenticated;

comment on table public.analytics_events is
  'Anonymous RealMeetClub funnel events. No IP address, email, name, GPS coordinates or city is stored.';

-- Example funnel report for the last 7 days:
-- select event_name, count(*)
-- from public.analytics_events
-- where occurred_at >= now() - interval '7 days'
-- group by event_name
-- order by count(*) desc;

-- Example country report:
-- select country, event_name, count(*)
-- from public.analytics_events
-- where occurred_at >= now() - interval '7 days'
-- group by country, event_name
-- order by country, count(*) desc;
