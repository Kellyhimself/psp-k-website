-- Run this in the Supabase SQL Editor

-- 1. Add video_url column to featured_posts
ALTER TABLE featured_posts
  ADD COLUMN IF NOT EXISTS video_url TEXT;

-- 2. Storage RLS policies for the featured-post-videos bucket
--    (Create the bucket first in Supabase Dashboard > Storage > New bucket
--     Name: featured-post-videos, Public: Yes, File size limit: 50MB)

-- Allow authenticated users (admins) to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'featured-post-videos');

-- Allow authenticated users to update/replace videos
CREATE POLICY "Authenticated users can update videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'featured-post-videos');

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated users can delete videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'featured-post-videos');

-- Allow public read access (needed for <video src="..."> to work)
CREATE POLICY "Public read access for videos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'featured-post-videos');
