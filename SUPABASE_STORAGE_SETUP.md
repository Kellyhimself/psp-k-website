# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for direct image uploads in the admin panel.

## Step 1: Enable Storage in Supabase

1. **Go to Supabase Dashboard**:
   - Navigate to your project: [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your PSP-K project

2. **Open Storage**:
   - Click **"Storage"** in the left sidebar
   - You'll see the Storage interface

## Step 2: Create Storage Bucket

1. **Create New Bucket**:
   - Click **"New bucket"** button
   - Enter bucket name: `featured-post-images`
   - ✅ **Important**: Check **"Public bucket"** (this makes images publicly accessible)
   - Click **"Create bucket"**

2. **Verify Bucket Created**:
   - You should see `featured-post-images` in your bucket list
   - Status should show as "Public"

## Step 3: Set Up Storage Policies

Storage policies control who can upload, read, and delete files.

### Option A: Using SQL Editor (Recommended)

1. **Go to SQL Editor**:
   - Click **"SQL Editor"** in left sidebar
   - Click **"New query"**

2. **Run This SQL**:

```sql
-- Allow public to read images (for displaying on website)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'featured-post-images');

-- Allow authenticated users to upload images (admin only)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'featured-post-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'featured-post-images')
WITH CHECK (bucket_id = 'featured-post-images');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'featured-post-images');
```

3. **Click "Run"** (or press Ctrl+Enter)

### Option B: Using Dashboard UI

1. **Go to Storage → Policies**:
   - Click on `featured-post-images` bucket
   - Click **"Policies"** tab
   - Click **"New Policy"**

2. **Create Policies** (repeat for each):
   - **Policy 1**: Public Read
     - Policy name: "Public Access"
     - Allowed operation: SELECT
     - Target roles: public
     - USING expression: `bucket_id = 'featured-post-images'`
   
   - **Policy 2**: Authenticated Upload
     - Policy name: "Authenticated users can upload"
     - Allowed operation: INSERT
     - Target roles: authenticated
     - WITH CHECK: `bucket_id = 'featured-post-images'`
   
   - **Policy 3**: Authenticated Update
     - Policy name: "Authenticated users can update"
     - Allowed operation: UPDATE
     - Target roles: authenticated
     - USING: `bucket_id = 'featured-post-images'`
     - WITH CHECK: `bucket_id = 'featured-post-images'`
   
   - **Policy 4**: Authenticated Delete
     - Policy name: "Authenticated users can delete"
     - Allowed operation: DELETE
     - Target roles: authenticated
     - USING: `bucket_id = 'featured-post-images'`

## Step 4: Verify Setup

1. **Test Upload** (in admin panel):
   - Go to `/admin/posts/new`
   - Try dragging and dropping an image
   - Should upload successfully

2. **Check Storage**:
   - Go to Storage → `featured-post-images`
   - You should see your uploaded image
   - Click on it to see the public URL

## Step 5: Test Image Display

1. **Create a test post**:
   - Upload an image via drag & drop
   - Save the post
   - Check that image URL is populated

2. **View on homepage**:
   - Go to homepage
   - Image should appear in hero slider

## Troubleshooting

### Error: "Bucket not found"

**Solution**:
- Verify bucket name is exactly: `featured-post-images`
- Check bucket exists in Storage dashboard
- Ensure bucket is set to "Public"

### Error: "new row violates row-level security policy"

**Solution**:
- Run the SQL policies from Step 3
- Verify policies are created in Storage → Policies
- Check that you're logged in as authenticated user

### Error: "Upload failed"

**Possible causes**:
1. **File too large**: Max 5MB (check file size)
2. **Wrong file type**: Only images allowed (JPG, PNG, WebP, etc.)
3. **Storage quota exceeded**: Check Supabase usage
4. **Network issue**: Check internet connection

**Solutions**:
- Compress image to under 5MB
- Use supported image formats
- Check Supabase project limits
- Try again with better connection

### Images not showing after upload

**Check**:
1. Image uploaded successfully (check Storage dashboard)
2. Public URL is correct (starts with your Supabase URL)
3. Bucket is set to "Public"
4. Public read policy is active

### "Access denied" error

**Solution**:
- Verify you're logged in as admin
- Check Storage policies are set correctly
- Ensure bucket is public
- Try logging out and back in

## Storage Limits (Free Tier)

- **Storage**: 1GB total
- **Bandwidth**: 2GB/month
- **File size**: 50MB max per file

**For your use case**:
- ✅ Plenty of space for featured post images
- ✅ Each image ~500KB = ~2000 images
- ✅ More than enough for a political party website

## Best Practices

1. **Optimize Images Before Upload**:
   - Resize to 1920x1080px max
   - Compress to under 500KB
   - Use WebP format when possible

2. **Organize Files**:
   - Files are stored in `featured-posts/` folder automatically
   - Each file has unique name (timestamp + random)

3. **Clean Up Old Images**:
   - Periodically delete unused images
   - Go to Storage → `featured-post-images`
   - Delete old files manually

4. **Monitor Usage**:
   - Check Storage usage in Supabase dashboard
   - Stay within free tier limits

## Advanced: Image Optimization

If you want automatic image optimization, you can:

1. **Use Supabase Edge Functions**:
   - Create function to resize/compress on upload
   - Requires additional setup

2. **Client-side Optimization**:
   - Already implemented in ImageUpload component
   - Validates file size and type

3. **Third-party Services**:
   - Cloudinary (has free tier)
   - ImageKit (has free tier)
   - Integrate with Supabase

## Security Notes

✅ **Current Setup**:
- Only authenticated users can upload (admin only)
- Public can read images (needed for website display)
- Files are stored securely in Supabase

✅ **Best Practices**:
- Keep admin credentials secure
- Regularly review uploaded images
- Monitor storage usage
- Set up alerts for unusual activity

## Summary

After completing these steps:
- ✅ Storage bucket created
- ✅ Policies configured
- ✅ Drag & drop upload working
- ✅ Images accessible on website

**You're all set!** 🎉

Now you can:
- Drag & drop images in admin panel
- Images upload automatically
- URLs are saved to database
- Images appear in hero slider

---

**Need Help?**
- Check Supabase documentation: [supabase.com/docs/storage](https://supabase.com/docs/storage)
- Review error messages in browser console
- Check Supabase dashboard → Logs

