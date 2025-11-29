# Fixing Vercel Production Error: MIDDLEWARE_INVOCATION_FAILED

## Problem

You're seeing this error in production:
```
500: INTERNAL_SERVER_ERROR
Code: MIDDLEWARE_INVOCATION_FAILED
```

This happens when your Supabase environment variables are not set in Vercel.

## Solution: Add Environment Variables to Vercel

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (`psp-k-website`)
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase Project URL (from Step 1)
   - **Environment**: Select all (Production, Preview, Development)

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key (from Step 1)
   - **Environment**: Select all (Production, Preview, Development)

5. Click **Save** for each variable

### Step 3: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

### Step 4: Verify

1. Wait for deployment to complete
2. Visit your site: `https://psp-k-website.vercel.app/`
3. The error should be gone!

---

## Alternative: If You Don't Want to Use Supabase

If you're not using Supabase features yet, the middleware has been updated to gracefully handle missing environment variables. However, you'll still need to set them if you want to use:

- Form submissions (registration, contact, volunteer)
- Admin authentication
- Featured posts/hero slider
- Image uploads

---

## Quick Checklist

- [ ] Supabase project created
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] Environment variables set for all environments (Production, Preview, Development)
- [ ] Deployment redeployed
- [ ] Site tested and working

---

## Troubleshooting

### Still Getting the Error?

1. **Check variable names**: Make sure they're exactly:
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

2. **Check values**: Make sure there are no extra spaces or quotes

3. **Redeploy**: Environment variables only take effect after a new deployment

4. **Check Vercel logs**: Go to your deployment → **Logs** tab to see detailed error messages

5. **Verify Supabase project**: Make sure your Supabase project is active and not paused

---

## Local Development

Make sure you also have these in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Note**: Never commit `.env.local` to git! It's already in `.gitignore`.

---

## Need Help?

If you're still having issues:
1. Check Vercel deployment logs
2. Verify your Supabase project is active
3. Make sure environment variable names match exactly
4. Try redeploying after adding variables

