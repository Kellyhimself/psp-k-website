# Fix Vercel 404 Error

## The Problem

Vercel is not detecting your Next.js framework. The build logs show:
- Framework Preset: "Other" (should be "Next.js")
- Build command: `vercel build` (should be `npm run build`)
- Output directory: `public` (should be `.next`)

## Solution

### Option 1: Manual Framework Configuration (Recommended)

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll to **Framework Settings**
5. Change **Framework Preset** from "Other" to **"Next.js"**
6. The following should auto-populate:
   - Build Command: `next build`
   - Output Directory: `.next` (or leave empty)
   - Install Command: `npm install` (or leave empty)
7. Make sure **Root Directory** is set to: `psp-k-website`
8. Click **Save**
9. Go to **Deployments** tab
10. Click **⋯** on latest deployment → **Redeploy**

### Option 2: Use vercel.json (Already Created)

I've created a `vercel.json` file in your project. After committing and pushing:

1. Push the `vercel.json` file to GitHub
2. Vercel will automatically redeploy
3. It should now detect Next.js correctly

### Option 3: Delete and Re-import

If the above doesn't work:

1. **Delete the Vercel project** (Settings → Delete Project)
2. **Re-import from GitHub:**
   - Click "Add New" → "Project"
   - Import your repository
   - **IMPORTANT:** When importing, make sure:
     - Root Directory: `psp-k-website`
     - Framework Preset: **Next.js** (should auto-detect)
   - Click Deploy

## Verify Settings

After fixing, your settings should look like:

```
Framework Preset: Next.js
Root Directory: psp-k-website
Build Command: next build (or npm run build)
Output Directory: .next (or leave empty)
Install Command: npm install (or leave empty)
Node.js Version: 18.x or 20.x (not 24.x - might cause issues)
```

## Why This Happened

Vercel didn't auto-detect Next.js because:
- The Root Directory was set after initial import
- Or the framework detection failed
- Or the project structure wasn't recognized

## After Fixing

Once Framework Preset is set to "Next.js", you should see:
- Build time: ~30-60 seconds (not 9ms)
- Build logs showing Next.js compilation
- Successful deployment with all routes working

## Test

After redeploying, visit:
- https://party-website-nine.vercel.app/ (should show homepage)
- https://party-website-nine.vercel.app/about (should show about page)
- https://party-website-nine.vercel.app/leadership (should show leadership page)

All should work now!

