# Vercel Deployment Troubleshooting

## Issue: 404 NOT_FOUND Error

If you're getting a 404 error on Vercel, follow these steps:

### Step 1: Check Vercel Project Settings

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **General**
4. Verify:
   - **Framework Preset**: Should be "Next.js" (auto-detected)
   - **Root Directory**: Should be `psp-k-website` (if your repo root is `party/`)
   - **Build Command**: Should be `npm run build` (or leave empty for auto-detect)
   - **Output Directory**: Should be `.next` (or leave empty for auto-detect)
   - **Install Command**: Should be `npm install` (or leave empty for auto-detect)

### Step 2: Check Root Directory

**If your repository structure is:**
```
party/
├── psp-k-website/    ← Your Next.js app is here
├── assets/
└── ...
```

**Then in Vercel:**
- Set **Root Directory** to: `psp-k-website`

**If your repository root IS `psp-k-website`:**
- Leave **Root Directory** empty (default)

### Step 3: Verify Build Settings

In Vercel Settings → General:
- **Node.js Version**: 18.x or 20.x (recommended)
- **Build Command**: `npm run build` (or auto)
- **Output Directory**: `.next` (or auto)
- **Install Command**: `npm install` (or auto)

### Step 4: Check Deployment Logs

1. Go to your project in Vercel
2. Click on the latest deployment
3. Check the **Build Logs** tab
4. Look for any errors or warnings

Common issues to look for:
- Missing dependencies
- Build errors
- TypeScript errors
- Missing environment variables

### Step 5: Redeploy

After fixing settings:
1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Select **Redeploy**

Or push a new commit to trigger a new deployment.

### Step 6: Alternative - Manual Configuration

If auto-detection isn't working, create a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

**Note:** Usually not needed as Vercel auto-detects Next.js.

## Common Issues

### Issue: "Cannot find module"
**Solution:** Make sure `node_modules` is not in `.gitignore` incorrectly, or that dependencies are installing properly.

### Issue: "Build failed"
**Solution:** Check build logs for specific errors. Common causes:
- Missing TypeScript types
- Import errors
- Missing files

### Issue: "404 on all routes"
**Solution:** 
- Verify Root Directory is correct
- Check that `app/` directory exists
- Verify `package.json` has correct build script

### Issue: "Images not loading"
**Solution:** 
- Check that images are in `public/` folder
- Verify image paths are correct
- Check Next.js Image component configuration

## Quick Fix Checklist

- [ ] Root Directory is set correctly in Vercel
- [ ] Framework is detected as "Next.js"
- [ ] Build command is `npm run build`
- [ ] All files are committed and pushed
- [ ] No build errors in deployment logs
- [ ] Node.js version is 18+ or 20+
- [ ] Dependencies are installing correctly

## Still Not Working?

1. **Delete and recreate the Vercel project:**
   - Delete the project in Vercel
   - Import it again from GitHub
   - Make sure Root Directory is set correctly

2. **Check the deployment URL:**
   - Make sure you're visiting the correct URL
   - Check if there's a custom domain configured

3. **Contact Vercel Support:**
   - Share your deployment logs
   - Share your project settings (screenshot)

