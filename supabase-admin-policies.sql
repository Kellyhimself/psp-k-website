-- Additional RLS Policies for Admin Access
-- Run this in your Supabase SQL Editor to allow authenticated admins to view registrations, volunteers, and contacts

-- Allow authenticated users (admins) to read registrations
CREATE POLICY "Allow authenticated users to read registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to read volunteers
CREATE POLICY "Allow authenticated users to read volunteers"
  ON volunteers FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to read contacts
CREATE POLICY "Allow authenticated users to read contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Allow authenticated users to update/delete registrations (if needed)
-- Uncomment if you want admins to be able to edit/delete registrations
-- CREATE POLICY "Allow authenticated users to update registrations"
--   ON registrations FOR UPDATE
--   TO authenticated
--   USING (true)
--   WITH CHECK (true);

-- CREATE POLICY "Allow authenticated users to delete registrations"
--   ON registrations FOR DELETE
--   TO authenticated
--   USING (true);

