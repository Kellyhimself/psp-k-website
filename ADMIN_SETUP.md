# Admin Setup Guide - Featured Posts & News Management

## Overview

This guide explains how to set up the admin system for managing featured posts that appear in the hero slider on the homepage.

## Features

- ✅ **Dynamic Hero Slider** - Auto-rotating featured posts on homepage
- ✅ **Free Authentication** - Using Supabase Auth (completely free)
- ✅ **Admin Dashboard** - Manage all featured posts
- ✅ **Create/Edit/Delete Posts** - Full CRUD operations
- ✅ **Publish/Unpublish** - Control what appears on the site
- ✅ **Image Support** - Add images to featured posts
- ✅ **Display Order** - Control the order of posts in the slider

## Step 1: Update Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the updated `supabase-setup.sql` file (or just the new parts for `featured_posts` table)

The new table includes:
- `featured_posts` - Stores all featured posts/news
- RLS policies for public read and authenticated write
- Indexes for performance

## Step 2: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: admin@psp-k.co.ke (or your preferred email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ (check this)
4. Click **"Create user"**

**Important**: Save the email and password - you'll need it to log in!

## Step 3: Set Up Authentication Policies

The SQL script already includes policies, but verify:

1. Go to **Authentication** → **Policies**
2. Check that `featured_posts` table has:
   - ✅ Public SELECT (for reading published posts)
   - ✅ Authenticated ALL (for admin to manage posts)

## Step 4: Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/login` (or your domain)
2. Log in with the admin credentials you created
3. You'll be redirected to `/admin/dashboard`

## Step 5: Create Your First Featured Post

1. In the admin dashboard, click **"+ New Post"**
2. Fill in the form:
   - **Title**: Required - appears as the main heading
   - **Excerpt**: Short description shown below title
   - **Content**: Full text (optional, for future use)
   - **Image URL**: 
     - Use images from `/public/images/` folder: `/images/photo.jpg`
     - Or external URLs: `https://example.com/image.jpg`
   - **Link URL**: Where users go when clicking "Learn More"
     - Internal: `/about`, `/register`, etc.
     - External: `https://example.com`
   - **Display Order**: Lower numbers appear first (0, 1, 2, ...)
   - **Featured in Hero**: ✅ Check to show in slider
   - **Publish Now**: ✅ Check to make it live
3. Click **"Create Post"**

## Step 6: View on Homepage

1. Go to your homepage: `http://localhost:3000`
2. You should see your featured post in the hero slider
3. Posts auto-rotate every 5 seconds
4. Users can click arrows or dots to navigate

## Admin Features

### Dashboard (`/admin/dashboard`)
- View all posts (published and drafts)
- See status (Published/Draft)
- Quick actions: Publish/Unpublish, Edit, Delete
- Create new posts

### Create Post (`/admin/posts/new`)
- Full form to create new featured posts
- Preview options before publishing
- Save as draft option

### Edit Post (`/admin/posts/[id]/edit`)
- Edit existing posts
- Update all fields
- Change publish status

## Image Guidelines

### Using Local Images:
1. Place images in `/public/images/` folder
2. Use path: `/images/your-image.jpg`
3. Example: `/images/groupPhoto.jpg`

### Using External Images:
1. Use full URL: `https://example.com/image.jpg`
2. Ensure images are publicly accessible
3. Recommended: Use optimized images for faster loading

### Image Recommendations:
- **Aspect Ratio**: 16:9 or 21:9 (wide)
- **Size**: 1920x1080px or larger
- **Format**: JPG or WebP
- **File Size**: Under 500KB for best performance

## Best Practices

1. **Keep Posts Fresh**: Update featured posts regularly
2. **Limit Featured Posts**: 3-5 posts work best for the slider
3. **Clear Titles**: Keep titles concise and impactful
4. **Compelling Excerpts**: Write engaging short descriptions
5. **Quality Images**: Use high-quality, relevant images
6. **Display Order**: Order by importance (0 = most important)

## Security

- ✅ **Authentication Required**: Only authenticated users can manage posts
- ✅ **RLS Policies**: Database-level security
- ✅ **Session Management**: Automatic session refresh
- ✅ **Protected Routes**: Admin routes require login

## Troubleshooting

### Can't Log In?
- Verify user exists in Supabase Authentication
- Check email and password are correct
- Ensure "Auto Confirm User" was checked when creating user

### Posts Not Showing?
- Check "Published" status is enabled
- Verify "Featured in Hero" is checked
- Check browser console for errors
- Verify Supabase connection in `.env.local`

### Images Not Loading?
- Verify image path is correct
- Check image exists in `/public/images/` folder
- For external URLs, ensure they're publicly accessible
- Check browser console for 404 errors

### Slider Not Rotating?
- Ensure you have at least 2 published featured posts
- Check browser console for JavaScript errors
- Verify Supabase connection is working

## Next Steps

1. **Create Multiple Posts**: Add 3-5 featured posts for variety
2. **Add Images**: Use party photos, event images, or graphics
3. **Link to Pages**: Link posts to relevant pages (About, Register, etc.)
4. **Regular Updates**: Keep content fresh and current
5. **Monitor Performance**: Check which posts get the most engagement

## Cost

- ✅ **Supabase Auth**: FREE (unlimited users)
- ✅ **Database**: FREE tier (500MB, 2GB bandwidth)
- ✅ **Storage**: FREE tier (1GB)
- ✅ **Total Cost**: $0/month

Perfect for a political party website! 🎉

---

**Need Help?**
- Check Supabase dashboard for errors
- Review browser console for client-side errors
- Verify environment variables are set correctly

