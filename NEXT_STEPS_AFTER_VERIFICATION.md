# Next Steps After Resend Domain Verification

## ✅ What You've Completed

- ✅ Domain verified in Resend (psp-kenya.com)
- ✅ DNS records added (DKIM, SPF)
- ✅ MX record removed (to enable email forwarding)
- ✅ Email forwarding set up (info@psp-kenya.com → wkellykitui@gmail.com)

---

## 🎯 What to Do Next

### Step 1: Verify Environment Variables

**Check your `.env.local` file** in `psp-k-website/` folder:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
CONTACT_EMAIL=info@psp-kenya.com

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

**Important Notes:**

1. **RESEND_FROM_EMAIL:**
   - ✅ **Production:** `PSP-K Website <noreply@psp-kenya.com>` (since domain is verified)
   - ❌ **Don't use:** `onboarding@resend.dev` (test domain - not needed now)

2. **CONTACT_EMAIL:**
   - You can use: `info@psp-kenya.com` (will forward to wkellykitui@gmail.com)
   - OR: `wkellykitui@gmail.com` (direct email)

---

### Step 2: Restart Your Development Server

After updating `.env.local`, restart your server:

```bash
# Stop server (Ctrl+C in terminal)
# Then restart:
cd psp-k-website
npm run dev
```

**Why?** Environment variables are only loaded when the server starts.

---

### Step 3: Test Email Sending

**Test the contact form:**

1. Go to: http://localhost:3000/contact
2. Fill out the form:
   - Name: Test
   - Email: your-email@gmail.com
   - Subject: Testing Email
   - Message: This is a test
3. Submit
4. Check your email: **wkellykitui@gmail.com**
   - Should receive notification email
   - From: "PSP-K Website <noreply@psp-kenya.com>"

**Expected Result:**
- ✅ Form submits successfully
- ✅ Success message shows on website
- ✅ Email arrives in your inbox

**If it fails:**
- Check browser console (F12) for errors
- Check server terminal for error messages
- See `RESEND_TROUBLESHOOTING.md` for help

---

### Step 4: Test Email Forwarding

**Test receiving emails:**

1. **Send a test email** from another email account (not wkellykitui@gmail.com)
2. **To:** info@psp-kenya.com
3. **Subject:** Test Email
4. **Message:** Testing email forwarding
5. **Check:** wkellykitui@gmail.com should receive it

**Expected Result:**
- ✅ Email sent to info@psp-kenya.com
- ✅ Forwarded to wkellykitui@gmail.com within a few minutes

**If it doesn't work:**
- Wait 5-30 minutes (DNS propagation)
- Check Namecheap → Email Forwarding is enabled
- Verify forwarding rule: info@psp-kenya.com → wkellykitui@gmail.com

---

### Step 5: Update Vercel Environment Variables

**For production deployment:**

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Your project → Settings → Environment Variables

2. **Add these variables:**

   ```
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
   CONTACT_EMAIL=info@psp-kenya.com
   ```

3. **Select environments:** Production, Preview, Development (all three)

4. **Save and redeploy:**
   - Go to Deployments
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## 📋 Complete Configuration Checklist

### Local Development (.env.local)

- [ ] `RESEND_API_KEY` is set (starts with `re_`)
- [ ] `RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>`
- [ ] `CONTACT_EMAIL=info@psp-kenya.com` (or your email)
- [ ] Dev server restarted after changes

### Production (Vercel)

- [ ] All environment variables added to Vercel
- [ ] Variables set for all environments
- [ ] Latest deployment redeployed

### Email Services

- [ ] Resend domain verified (psp-kenya.com)
- [ ] Email forwarding enabled (info@psp-kenya.com)
- [ ] Test email sending works
- [ ] Test email forwarding works

---

## 🧪 Testing Guide

### Test 1: Contact Form (Sending Emails)

1. Go to: https://your-site.vercel.app/contact
2. Submit the form
3. Check: You should receive email at CONTACT_EMAIL

**Success indicators:**
- ✅ Form shows success message
- ✅ Email received in inbox
- ✅ Email from: "PSP-K Website <noreply@psp-kenya.com>"

---

### Test 2: Email Forwarding (Receiving Emails)

1. Send email to: info@psp-kenya.com
2. Check: wkellykitui@gmail.com should receive it

**Success indicators:**
- ✅ Email arrives within 5-30 minutes
- ✅ Forwarded correctly

---

### Test 3: Registration Form

1. Go to: /register
2. Fill out and submit
3. Check: Email notification received

---

### Test 4: Volunteer Form

1. Go to: /volunteer
2. Fill out and submit
3. Check: Email notification received

---

## 🔧 If Resend Is Still Failing

**Check these:**

1. **Error Message:**
   - Open browser console (F12)
   - Look for error when submitting form
   - Copy the exact error

2. **Environment Variables:**
   - Verify `.env.local` exists
   - Check all variables are set correctly
   - Restart server

3. **Resend Dashboard:**
   - Go to: https://resend.com/domains
   - Check domain status
   - Verify DKIM and SPF are green ✅

4. **Use Test Domain Temporarily:**
   ```env
   RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
   ```
   - This always works
   - If this works, domain verification is the issue

---

## 📊 Current Setup Summary

| Service | Purpose | Status | Email Address |
|---------|---------|--------|---------------|
| **Resend** | Send emails FROM website | ✅ Verified | noreply@psp-kenya.com |
| **Email Forwarding** | Receive emails TO domain | ✅ Enabled | info@psp-kenya.com → wkellykitui@gmail.com |

---

## 🎉 You're All Set!

Once everything is tested and working:

1. ✅ Contact form sends notifications
2. ✅ Registration form sends notifications  
3. ✅ Volunteer form sends notifications
4. ✅ You can receive emails at info@psp-kenya.com
5. ✅ All emails forwarded to your personal email

---

## 📚 Related Documentation

- `RESEND_TROUBLESHOOTING.md` - Detailed troubleshooting guide
- `EMAIL_SETUP_EXPLAINED.md` - Understanding Resend vs Email Forwarding
- `RESEND_DOMAIN_SETUP.md` - Domain verification guide

---

**Need Help?**

If Resend is still failing, share:
1. Exact error message
2. Browser console errors (if any)
3. Server terminal errors (if testing locally)

Then we can diagnose the specific issue!

