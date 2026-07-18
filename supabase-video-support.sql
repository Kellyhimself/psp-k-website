-- Run this in the Supabase SQL Editor to add video support to featured posts

ALTER TABLE featured_posts
  ADD COLUMN IF NOT EXISTS video_url TEXT;
