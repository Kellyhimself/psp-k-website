
-- Add special_interest_groups column to registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS special_interest_groups TEXT[];

-- Or if you prefer JSONB
-- ADD COLUMN IF NOT EXISTS special_interest_groups JSONB;

-- Since the code will send an array of strings, TEXT[] (text array) is appropriate for Postgres.
-- If Supabase Client sends it as a JSON array, Supabase usually handles the conversion if defined as array.

-- To run this:
-- 1. Go to Supabase Dashboard -> SQL Editor
-- 2. Paste this command
-- 3. Click Run
