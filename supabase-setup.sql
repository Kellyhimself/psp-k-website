-- Supabase Database Setup for PSP-K Website
-- Run this in your Supabase SQL Editor

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  id_number TEXT NOT NULL UNIQUE,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  county TEXT NOT NULL,
  constituency TEXT NOT NULL,
  ward TEXT NOT NULL,
  physical_address TEXT,
  disability_status TEXT,
  is_kenyan_citizen BOOLEAN NOT NULL DEFAULT false,
  not_member_of_other_party BOOLEAN NOT NULL DEFAULT false,
  agree_to_constitution BOOLEAN NOT NULL DEFAULT false,
  consent_to_data_processing BOOLEAN NOT NULL DEFAULT false,
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

-- Create featured_posts table for hero slider
CREATE TABLE IF NOT EXISTS featured_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  link_url TEXT,
  is_featured BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_posts ENABLE ROW LEVEL SECURITY;

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

-- Allow public to read published featured posts
CREATE POLICY "Allow public reads on featured_posts"
  ON featured_posts FOR SELECT
  TO anon
  USING (is_published = true);

-- Allow authenticated users to manage featured posts (admin)
CREATE POLICY "Allow authenticated users to manage featured_posts"
  ON featured_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Optional: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_id_number ON registrations(id_number);
CREATE INDEX IF NOT EXISTS idx_registrations_county ON registrations(county);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers(email);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_notices_published_at ON notices(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_featured_posts_published ON featured_posts(is_published, is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_featured_posts_published_at ON featured_posts(published_at DESC);

-- Add unique constraint to prevent duplicate registrations by ID number
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_id_number_unique ON registrations(id_number);

