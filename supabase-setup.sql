-- Supabase Database Setup for PSP-K Website
-- Run this in your Supabase SQL Editor

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  id_number TEXT NOT NULL,
  county TEXT NOT NULL,
  constituency TEXT,
  ward TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  skills TEXT,
  availability TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notices table (optional, for dynamic news)
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts (public can submit forms)
CREATE POLICY "Allow public inserts on registrations"
  ON registrations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on volunteers"
  ON volunteers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to read notices
CREATE POLICY "Allow public reads on notices"
  ON notices FOR SELECT
  TO anon
  USING (true);

-- Optional: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers(email);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_notices_published_at ON notices(published_at DESC);

