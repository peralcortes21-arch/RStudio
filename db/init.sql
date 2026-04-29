-- ══ USERS ══
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ CLIENTS ══
CREATE TABLE clients (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  audience TEXT,
  tone TEXT,
  color TEXT,
  color2 TEXT,
  style TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ CLIENT DOCS ══
CREATE TABLE client_docs (
  id SERIAL PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  base64 TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  analysis TEXT DEFAULT '',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ CALENDARS ══
CREATE TABLE calendars (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id TEXT REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ POSTS ══
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  calendar_id TEXT NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  hour TEXT DEFAULT '10:00',
  angle TEXT DEFAULT 'POST',
  type TEXT,
  hook TEXT NOT NULL,
  sub_title TEXT DEFAULT '',
  body TEXT DEFAULT '',
  cta TEXT DEFAULT '',
  visual TEXT DEFAULT '',
  prompt TEXT DEFAULT '',
  img_src TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ REFS ══
CREATE TABLE refs (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  base64 TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  analysis TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══ INDEXES ══
CREATE INDEX idx_clients_user ON clients(user_id);
CREATE INDEX idx_calendars_user ON calendars(user_id);
CREATE INDEX idx_calendars_client ON calendars(client_id);
CREATE INDEX idx_posts_calendar ON posts(calendar_id);
CREATE INDEX idx_posts_calendar_position ON posts(calendar_id, position);
CREATE INDEX idx_refs_user ON refs(user_id);
CREATE INDEX idx_client_docs_client ON client_docs(client_id, position);

-- ══ SEED USERS ══
-- Password: Master123 (bcrypt hash)
INSERT INTO users (email, password, name) VALUES
  ('nicolas@cliender.com', '$2b$10$3Q8zBFw4bDRr5vjLFKUbZuYs.ZOK/IW1Eb747z7k30xeA7UfgwOo2', 'nicolas'),
  ('pablo@cliender.com', '$2b$10$3Q8zBFw4bDRr5vjLFKUbZuYs.ZOK/IW1Eb747z7k30xeA7UfgwOo2', 'pablo'),
  ('toni@cliender.com', '$2b$10$3Q8zBFw4bDRr5vjLFKUbZuYs.ZOK/IW1Eb747z7k30xeA7UfgwOo2', 'toni'),
  ('dan@cliender.com', '$2b$10$3Q8zBFw4bDRr5vjLFKUbZuYs.ZOK/IW1Eb747z7k30xeA7UfgwOo2', 'dan');
