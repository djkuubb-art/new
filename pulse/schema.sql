CREATE TABLE IF NOT EXISTS pulse_events (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 event_id TEXT NOT NULL UNIQUE,
 event TEXT NOT NULL CHECK (event IN ('visit','outbound')),
 link_id TEXT,
 click_id TEXT NOT NULL,
 occurred_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS pulse_events_time ON pulse_events(occurred_at);
CREATE INDEX IF NOT EXISTS pulse_events_click ON pulse_events(click_id);
