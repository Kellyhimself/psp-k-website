# Admin Users View - Troubleshooting Guide

## Issue: "No registered users yet" but you know there are users

### Understanding the Difference

There are **two different types of users** in your system:

1. **Admin Users (Supabase Auth)**
   - These are users who can log into the admin dashboard
   - Stored in Supabase's `auth.users` table
   - Created when you sign up for admin access

2. **Registered Members (Party Registrations)**
   - These are party members who register through the `/register` form
   - Stored in the `registrations` table
   - Created when someone fills out the member registration form

**The "Users" tab in the admin dashboard shows Registered Members, NOT admin users.**

---

## Common Issues & Solutions

### Issue 1: RLS Policies Not Applied

**Symptom:** Error message saying "permission denied" or "new row violates row-level security policy"

**Solution:**
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-admin-policies.sql`
4. Click "Run" to execute the SQL
5. Refresh the admin dashboard

**The SQL you need to run:**
```sql
-- Allow authenticated users (admins) to read registrations
CREATE POLICY "Allow authenticated users to read registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);
```

---

### Issue 2: No Users in Registrations Table

**Symptom:** Shows "No registered users yet" and no error message

**This is normal if:**
- No one has filled out the member registration form yet
- Users registered but the form submission failed
- Users are in a different table (like `auth.users` for admin users)

**To check:**
1. Go to Supabase Dashboard → Table Editor
2. Click on the `registrations` table
3. See if there are any rows

**If the table is empty:**
- Test the registration form at `/register`
- Fill it out and submit
- Check if the data appears in the `registrations` table

---

### Issue 3: Users Registered But Not Showing

**Possible causes:**
1. **RLS policies blocking access** - See Issue 1
2. **Data in wrong table** - Check if users are in `auth.users` instead of `registrations`
3. **Error during registration** - Check browser console for errors

**To debug:**
1. Open browser console (F12)
2. Click on the "Registered Users" tab
3. Look for error messages in the console
4. Check the error message shown in the UI

---

## Step-by-Step Fix

### Step 1: Check Browser Console

1. Open the admin dashboard
2. Press F12 to open developer tools
3. Go to the Console tab
4. Click on "Registered Users" tab
5. Look for any error messages
6. Copy the error message

### Step 2: Apply RLS Policies

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the policies:**
   - Copy the contents of `supabase-admin-policies.sql`
   - Paste into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)

4. **Verify policies:**
   - Go to Authentication → Policies
   - You should see the new policies for `registrations` table

### Step 3: Test Registration

1. **Test the registration form:**
   - Go to `/register` on your website
   - Fill out the form with test data
   - Submit the form

2. **Check if data was saved:**
   - Go to Supabase Dashboard → Table Editor
   - Click on `registrations` table
   - You should see the new registration

3. **Check admin dashboard:**
   - Go back to admin dashboard
   - Click "Registered Users" tab
   - You should now see the user

---

## Understanding the Data Flow

```
User fills registration form (/register)
    ↓
Form submits to Supabase
    ↓
Data saved to `registrations` table
    ↓
Admin logs in to dashboard
    ↓
Admin clicks "Registered Users" tab
    ↓
Dashboard queries `registrations` table
    ↓
Users displayed in table
```

**Important:** The admin user (you) is NOT in the `registrations` table. You're in `auth.users`. The `registrations` table only contains party members who registered through the public registration form.

---

## Quick Checklist

- [ ] RLS policies applied in Supabase
- [ ] At least one user has registered through `/register` form
- [ ] Data exists in `registrations` table (check Supabase Table Editor)
- [ ] No errors in browser console
- [ ] Admin is logged in (check top right of dashboard)

---

## Still Having Issues?

1. **Check the error message** shown in the UI (red box)
2. **Check browser console** for detailed error logs
3. **Verify in Supabase:**
   - Table Editor → `registrations` table has data
   - Authentication → Policies → policies exist for `registrations`
4. **Test registration form** to ensure it's working

---

## Need Help?

Share:
1. The error message from the UI (if any)
2. Browser console errors (F12 → Console)
3. Whether you've run the SQL policies
4. Whether data exists in the `registrations` table

