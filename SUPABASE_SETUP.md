# Supabase Setup Guide for PSP-K Website

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: PSP-K Website (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to Kenya (e.g., Europe West)
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to initialize

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
3. Copy both values

## Step 3: Set Up Environment Variables

1. In your project root (`psp-k-website`), create `.env.local` file:
   ```bash
   # Copy from .env.example if it exists, or create new
   ```

2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 4: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - ✅ `registrations`
   - ✅ `volunteers`
   - ✅ `contacts`
   - ✅ `notices`

## Step 6: Test the Forms

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test each form:
   - Go to `/register` - Submit a test registration
   - Go to `/contact` - Submit a test message
   - Go to `/volunteer` - Submit a test volunteer application

3. Check Supabase dashboard:
   - Go to **Table Editor** → Select a table
   - You should see your test submissions

## Step 7: Configure Row Level Security (Already Done)

The SQL script already sets up:
- ✅ RLS enabled on all tables
- ✅ Public can INSERT (submit forms)
- ✅ Public can READ notices
- ✅ Private data (registrations, volunteers, contacts) are insert-only for public

## Troubleshooting

### Error: "Invalid API key"
- Check that `.env.local` has correct values
- Make sure you're using the **anon public** key (not service_role key)
- Restart your dev server after changing `.env.local`

### Error: "relation does not exist"
- Run the `supabase-setup.sql` script in SQL Editor
- Check that tables were created in Table Editor

### Error: "duplicate key value"
- This means someone already registered with that National ID
- This is expected behavior (duplicate prevention)

### Forms not submitting
- Check browser console for errors
- Verify Supabase URL and key in `.env.local`
- Check Supabase dashboard → Logs for errors

## Security Notes

- ✅ Using **anon key** (safe for client-side)
- ✅ RLS policies prevent unauthorized access
- ✅ Unique constraint on National ID prevents duplicates
- ✅ All sensitive data is protected

## Next Steps (Optional)

1. **Email Notifications**: Set up Supabase Edge Functions to send emails on form submission
2. **Admin Dashboard**: Create admin pages to view submissions (requires authentication)
3. **Data Export**: Export registrations for reporting to ORPP
4. **Analytics**: Track form submissions and member growth

## Production Deployment

When deploying to Vercel:
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

Your forms will work in production! 🎉

