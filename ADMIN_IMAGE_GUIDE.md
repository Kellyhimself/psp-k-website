# Admin Guide: Adding Photos to Featured Posts

This guide explains how to add images to featured posts in the admin panel.

## 🎉 New Feature: Drag & Drop Upload!

You can now **drag and drop images directly** in the admin panel! This is the easiest method.

### Quick Start:
1. Go to `/admin/posts/new` or edit an existing post
2. **Drag an image** into the upload area, or **click to browse**
3. Image uploads automatically to Supabase Storage
4. URL is filled in automatically
5. Save your post!

**Note**: You need to set up Supabase Storage first (see `SUPABASE_STORAGE_SETUP.md`)

---

## Method 1: Drag & Drop Upload (Recommended) ⭐ NEW!

This is the **easiest and most convenient** method.

### Step 1: Set Up Supabase Storage (One-time)

Follow the guide in `SUPABASE_STORAGE_SETUP.md`:
1. Create storage bucket: `featured-post-images`
2. Set bucket to "Public"
3. Configure storage policies
4. Done!

### Step 2: Upload Images in Admin Panel

1. **Go to Admin Dashboard**: `/admin/dashboard`
2. **Click "New Post"** or edit existing post
3. **In the "Featured Image" section**:
   - **Drag & Drop**: Drag image file into the upload area
   - **Or Click**: Click the upload area to browse files
   - **Or Paste URL**: Still works! Enter URL manually below

4. **Wait for Upload**:
   - Progress bar shows upload status
   - Preview appears when complete
   - URL is automatically filled in

5. **Save Post**: Click "Create Post" or "Update Post"

### ✅ Advantages:
- ✅ No need to manually add files to folders
- ✅ No need to know file paths
- ✅ Automatic URL generation
- ✅ Preview before saving
- ✅ Works from anywhere (no file system access needed)
- ✅ Images stored in cloud (Supabase Storage)

### 📝 Supported Formats:
- JPG, JPEG
- PNG
- WebP
- GIF

### 📏 File Limits:
- **Max Size**: 5MB per file
- **Recommended**: Under 500KB for best performance

---

## Method 2: Using Images from Public Folder

The admin form also supports adding images via **Image URL**. Here are the best ways to do this:

## Method 1: Using Images from Public Folder (Recommended) ⭐

This is the **easiest and most reliable** method for your use case.

### Step 1: Add Images to Public Folder

1. **Locate your images folder**:
   ```
   psp-k-website/public/images/
   ```

2. **Add your images**:
   - Copy your image files (JPG, PNG, WebP) to this folder
   - Example: `psp-k-website/public/images/event-2024.jpg`
   - Example: `psp-k-website/public/images/rally-photo.png`

3. **Recommended image names**:
   - Use descriptive names: `party-rally-2024.jpg`
   - Use lowercase and hyphens: `leadership-meeting.jpg`
   - Avoid spaces: use `-` instead

### Step 2: Use in Admin Panel

1. **Go to Admin Dashboard**: `/admin/dashboard`
2. **Click "New Post"** or edit an existing post
3. **In the "Image URL" field**, enter:
   ```
   /images/your-image-name.jpg
   ```
   
   **Examples**:
   - `/images/event-2024.jpg`
   - `/images/rally-photo.png`
   - `/images/groupPhoto.jpg` (already exists)

4. **Save the post**

### ✅ Advantages:
- ✅ Images are stored with your code
- ✅ Fast loading (served from same domain)
- ✅ No external dependencies
- ✅ Works offline
- ✅ Free (no storage costs)

### 📝 Example Workflow:

1. Take photos at an event
2. Resize/optimize images (recommended: 1920x1080px, under 500KB)
3. Copy to `public/images/` folder
4. Commit to git (or deploy to Vercel)
5. In admin panel, use `/images/event-photo.jpg`

---

## Method 2: Using External Image URLs

If you want to use images hosted elsewhere (e.g., Imgur, Google Photos, etc.)

### Step 1: Upload Image to External Service

**Option A: Imgur (Free)**
1. Go to [imgur.com](https://imgur.com)
2. Upload your image
3. Right-click image → "Copy image address"
4. Use the direct link (ends in `.jpg`, `.png`, etc.)

**Option B: Google Photos**
1. Upload to Google Photos
2. Right-click → "Copy image address"
3. Use the URL

**Option C: Other Services**
- Any image hosting service
- CDN services
- Cloud storage with public links

### Step 2: Use in Admin Panel

1. **In "Image URL" field**, paste the full URL:
   ```
   https://i.imgur.com/abc123.jpg
   https://example.com/photos/image.jpg
   ```

### ⚠️ Considerations:
- ⚠️ External services may change URLs
- ⚠️ Images may be slower to load
- ⚠️ Some services block hotlinking
- ⚠️ Less control over images

---

## Method 3: Supabase Storage (Advanced - Optional)

For direct image uploads from the admin panel, you can use Supabase Storage.

### Setup Steps:

1. **Enable Storage in Supabase**:
   - Go to Supabase Dashboard → Storage
   - Create a new bucket: `featured-post-images`
   - Set to **Public** (for public access)

2. **Update Admin Form** (requires code changes):
   - Add file upload input
   - Upload to Supabase Storage
   - Get public URL
   - Save to database

### When to Use:
- ✅ Need direct uploads from admin panel
- ✅ Many images (hundreds+)
- ✅ Want to avoid git commits for images
- ✅ Need image management features

### When NOT to Use:
- ❌ Simple website with few images
- ❌ Want images in codebase
- ❌ Prefer simpler setup

---

## Image Guidelines

### Recommended Specifications:

**Size:**
- **Width**: 1920px (Full HD)
- **Height**: 1080px (16:9 ratio) or 810px (21:9 for hero)
- **File Size**: Under 500KB (optimize before uploading)

**Format:**
- **JPG**: Best for photos
- **WebP**: Best quality/size ratio (modern browsers)
- **PNG**: Only if you need transparency

### Image Optimization Tools:

1. **Online Tools**:
   - [TinyPNG](https://tinypng.com) - Compress images
   - [Squoosh](https://squoosh.app) - Advanced compression
   - [ImageOptim](https://imageoptim.com) - Mac app

2. **Command Line** (if you have ImageMagick):
   ```bash
   # Resize and compress
   convert input.jpg -resize 1920x1080 -quality 85 output.jpg
   ```

3. **Photoshop/GIMP**:
   - Export for Web
   - Quality: 80-85%
   - Progressive JPG

---

## Step-by-Step: Adding Your First Image Post

### Example: Adding a Party Rally Photo

1. **Prepare the Image**:
   ```
   - Original: rally-photo-original.jpg (5MB, 4000x3000px)
   - Optimize to: rally-photo.jpg (400KB, 1920x1080px)
   ```

2. **Add to Project**:
   ```
   Copy rally-photo.jpg to: psp-k-website/public/images/
   ```

3. **Create Post in Admin**:
   - Title: "PSP-K Rally 2024"
   - Excerpt: "Join us for our annual rally in Nairobi"
   - Image URL: `/images/rally-photo.jpg`
   - Link URL: `/notices` (or leave empty)
   - Display Order: 0
   - ✅ Featured in Hero
   - ✅ Publish Now

4. **Save and View**:
   - Click "Create Post"
   - Go to homepage
   - See your image in the hero slider!

---

## Troubleshooting

### Image Not Showing?

1. **Check the path**:
   - ✅ Correct: `/images/photo.jpg`
   - ❌ Wrong: `images/photo.jpg` (missing leading slash)
   - ❌ Wrong: `/public/images/photo.jpg` (don't include public)

2. **Check file exists**:
   - Verify file is in `public/images/` folder
   - Check file name matches exactly (case-sensitive)

3. **Check file format**:
   - Supported: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - Not supported: `.svg` (for hero background)

4. **After adding new images**:
   - Restart dev server: `npm run dev`
   - Or rebuild: `npm run build`

### Image Too Large/Slow?

1. **Optimize the image**:
   - Use TinyPNG or similar
   - Resize to 1920px width max
   - Compress to under 500KB

2. **Check file format**:
   - Use WebP for best compression
   - Use JPG for photos
   - Avoid PNG for photos (larger files)

### External URL Not Working?

1. **Check URL is direct link**:
   - Must end in image extension (`.jpg`, `.png`)
   - Not a page URL (e.g., `imgur.com/gallery/abc`)

2. **Check CORS**:
   - Some services block hotlinking
   - Try a different image host

3. **Test URL**:
   - Open URL in browser
   - Should show image directly

---

## Best Practices

1. **Organize Images**:
   ```
   public/images/
   ├── events/
   │   ├── rally-2024.jpg
   │   └── meeting-2024.jpg
   ├── leadership/
   │   └── team-photo.jpg
   └── logo.jpg
   ```
   Then use: `/images/events/rally-2024.jpg`

2. **Naming Convention**:
   - Use descriptive names
   - Include date: `rally-2024-11.jpg`
   - Use lowercase and hyphens

3. **Image Sizes**:
   - Hero slider: 1920x1080px (wide)
   - Regular posts: 1200x800px
   - Thumbnails: 400x300px (if needed)

4. **Version Control**:
   - Commit images to git
   - Or use `.gitignore` for large images
   - Consider Git LFS for very large files

---

## Quick Reference

### Current Setup (Image URL):
```
Image URL Field: /images/your-image.jpg
```

### File Location:
```
psp-k-website/public/images/your-image.jpg
```

### After Adding Image:
1. Add file to `public/images/`
2. Use `/images/filename.jpg` in admin
3. Save post
4. Image appears in hero slider!

---

## Future Enhancement: Direct Upload

If you want to add direct image upload functionality, we can:
1. Set up Supabase Storage
2. Add file upload to admin form
3. Handle image uploads automatically
4. Generate optimized thumbnails

**Let me know if you'd like this feature!** It requires some additional setup but provides a better user experience.

---

## Summary

**Easiest Method**: 
1. Add images to `public/images/` folder
2. Use `/images/filename.jpg` in admin panel
3. Done! ✅

**For Now**: Use Method 1 (Public Folder) - it's simple, reliable, and free!

**Later**: We can add direct uploads if needed.

