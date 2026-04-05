-- PasteQueue Database Schema

-- Collections table (must be created before items due to FK)
CREATE TABLE collections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name        TEXT NOT NULL,
  color       TEXT DEFAULT '#6366f1',
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Clipboard items
CREATE TABLE items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content       TEXT NOT NULL,
  content_type  TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'url', 'code', 'image')),
  source_url    TEXT,
  source_title  TEXT,
  is_pinned     BOOLEAN DEFAULT false,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own items" ON items
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users see own collections" ON collections
  FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX items_user_created ON items (user_id, created_at DESC);
CREATE INDEX items_user_pinned ON items (user_id, is_pinned, created_at DESC);
CREATE INDEX items_collection ON items (collection_id);
CREATE INDEX items_content_search ON items USING GIN (to_tsvector('english', content));
CREATE INDEX collections_user ON collections (user_id, created_at DESC);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE items;
ALTER PUBLICATION supabase_realtime ADD TABLE collections;
