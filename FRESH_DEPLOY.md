# Fresh Deployment Guide

## Step 1: Remove Current Git Repository

Run these commands in the `psp-k-website` directory:

```bash
# Remove the .git folder
Remove-Item -Recurse -Force .git

# Or if that doesn't work:
rm -r -force .git
```

## Step 2: Initialize Fresh Git Repository

```bash
# Initialize new git repo
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - PSP-K website"
```

## Step 3: Create New GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `psp-k-website` (or any name you prefer)
3. Description: "People Salvation Party of Kenya Website"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

## Step 4: Connect and Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
# Add your new GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/psp-k-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 5: Deploy to Vercel (Fresh)

1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select your new repository: `psp-k-website`
4. **IMPORTANT Settings:**
   - **Framework Preset**: Should auto-detect as "Next.js" ✅
   - **Root Directory**: Leave **EMPTY** (since repo root IS the Next.js app)
   - **Build Command**: Should auto-fill as `next build`
   - **Output Directory**: Should auto-fill as `.next`
   - **Install Command**: Should auto-fill as `npm install`
5. Click **Deploy**

## Step 6: Verify Deployment

After deployment completes:
- Visit your site URL (e.g., `https://psp-k-website.vercel.app`)
- Test all pages:
  - `/` - Homepage
  - `/about` - About page
  - `/leadership` - Leadership page
  - `/contact` - Contact page

## Important Notes

### If Your Repo Root IS `psp-k-website`:
- **Root Directory**: Leave **EMPTY** in Vercel
- Vercel will find `package.json` at the root ✅

### If Your Repo Has `psp-k-website` as Subfolder:
- **Root Directory**: Set to `psp-k-website`
- But for fresh start, make `psp-k-website` the repo root (recommended)

## Clean Up Old Deployment (Optional)

1. Go to old Vercel project
2. Settings → Delete Project
3. This won't affect your new deployment

## Files to Keep

Make sure these are committed:
- ✅ `package.json` (with Next.js dependency)
- ✅ `next.config.ts`
- ✅ `app/` directory
- ✅ `components/` directory
- ✅ `public/` directory (with images and PDFs)
- ✅ `vercel.json` (optional, but helpful)

## Files to Ignore (in .gitignore)

These should NOT be committed:
- `node_modules/`
- `.next/`
- `.env.local`
- `.vercel/`

Your `.gitignore` should already have these.

