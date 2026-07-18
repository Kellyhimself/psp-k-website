-- ============================================================
-- PSP-K Admin Roles Setup
-- Run this once in the Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_profiles (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT        NOT NULL,
  display_name TEXT,
  role         TEXT        NOT NULL DEFAULT 'content_admin'
                           CHECK (role IN ('content_admin', 'super_admin')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Authenticated admins can read all profiles (needed for Manage Admins tab)
CREATE POLICY "Authenticated admins can view admin_profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (true);

-- All inserts / updates / deletes go through API routes using the service role key.
-- No direct client-side writes are allowed.
