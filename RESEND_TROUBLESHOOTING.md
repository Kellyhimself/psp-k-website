# Resend Troubleshooting Guide

## 🚨 Issue: Resend Email Failed After Removing MX Record

If Resend is failing after you removed the MX record, let's diagnose the issue.

---

## ✅ Good News First

- ✅ **Email forwarding is working** - You set up: info@psp-kenya.com → wkellykitui@gmail.com
- ✅ **Domain is verified** in Resend (DKIM, SPF records are verified)
- ✅ **MX record removal is fine** - Resend works without MX record

---

## 🔍 Step 1: Check What Error You're Seeing

**Where are you seeing the failure?**

### Option A: Browser Console Error
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for red error messages
4. Copy the exact error

### Option B: Network Error
1. Open browser developer tools (F12)
2. Go to Network tab
3. Submit the contact form
4. Look for `/api/send-email` request
5. Click on it → check Response tab
6. Copy the error message

### Option C: Server Logs (If Testing Locally)
If running `npm run dev`, check the terminal where the server is running for error messages.

---

## 🔧 Common Issues & Fixes

### Issue 1: Domain Still Verified After MX Removal

**Problem:** Removing MX record shouldn't affect Resend, but let's verify.

**Check:**
1. Go to https://resend.com/domains
2. Click on `psp-kenya.com`
3. Check status:
   - ✅ DKIM: Should show green checkmark
   - ✅ SPF: Should show green checkmark
   - ⚠️ MX: Might show red X (this is OK!)

**Solution:** As long as DKIM and SPF are verified, Resend will work!

---

### Issue 2: Environment Variables Not Set

**Problem:** `RESEND_API_KEY` or `RESEND_FROM_EMAIL` missing.

**Check `.env.local` file:**
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
CONTACT_EMAIL=info@psp-kenya.com
```

**Or if domain not verified yet:**
```env
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
```

**Fix:**
1. Make sure `.env.local` exists in `psp-k-website/` folder
2. Add all required variables
3. **Restart your dev server** (Ctrl+C, then `npm run dev`)
4. If on Vercel, add variables in Vercel dashboard → Settings → Environment Variables

---

### Issue 3: Using Wrong "From" Email

**Problem:** Trying to send from `noreply@psp-kenya.com` but domain verification might have issues.

**Check:**
- Go to Resend dashboard → Domains
- Is `psp-kenya.com` showing as verified?

**Temporary Fix (Testing):**
Use Resend test domain:
```env
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
```

**Production Fix:**
Once domain is verified, use:
```env
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
```

---

### Issue 4: API Key Invalid or Missing

**Problem:** `RESEND_API_KEY` is wrong or expired.

**Check:**
1. Go to https://resend.com/api-keys
2. Verify your API key is active
3. Copy the key (starts with `re_`)

**Fix:**
1. Update `.env.local`:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
2. Restart server

---

### Issue 5: Contact Email Not Set

**Problem:** `CONTACT_EMAIL` environment variable not set.

**Check `.env.local`:**
```env
CONTACT_EMAIL=info@psp-kenya.com
# OR your personal email:
CONTACT_EMAIL=wkellykitui@gmail.com
```

**Fix:** Add `CONTACT_EMAIL` to `.env.local`

---

## 🧪 Step 2: Test Your Setup

### Test 1: Check Environment Variables

**Create a test file** `test-env.js` in your project root:

```javascript
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET ✅' : 'MISSING ❌')
console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'NOT SET ❌')
console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'NOT SET ❌')
```

**Run it:**
```bash
node test-env.js
```

**If variables show as MISSING:**
- Check `.env.local` file exists
- Check spelling (case-sensitive!)
- Restart your dev server

---

### Test 2: Check Resend Domain Status

1. **Go to:** https://resend.com/domains
2. **Click on:** `psp-kenya.com`
3. **Check these records:**
   - ✅ **DKIM** - Should be verified
   - ✅ **SPF** - Should be verified
   - ⚠️ **MX** - Can be unverified (optional!)

**If DKIM or SPF shows red X:**
- Go to Namecheap → Advanced DNS
- Verify the TXT records are still there:
  - `resend._domainkey` (DKIM)
  - `send` with SPF value (SPF)

---

### Test 3: Test Resend API Directly

**Create `test-resend.js`:**

```javascript
const fetch = require('node-fetch')

const RESEND_API_KEY = 're_your_api_key_here' // Replace with your key
const fromEmail = 'PSP-K Website <noreply@psp-kenya.com>' // Or onboarding@resend.dev for testing

fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${RESEND_API_KEY}`,
  },
  body: JSON.stringify({
    from: fromEmail,
    to: 'wkellykitui@gmail.com', // Your email
    subject: 'Test Email from Resend',
    text: 'This is a test email. If you receive this, Resend is working!',
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log('Response:', data)
    if (data.id) {
      console.log('✅ Email sent successfully!')
    } else {
      console.log('❌ Error:', data)
    }
  })
  .catch(error => {
    console.error('❌ Error:', error)
  })
```

**Run it:**
```bash
npm install node-fetch
node test-resend.js
```

**If this fails:**
- Check API key is correct
- Check "from" email is verified in Resend

---

## 🔍 Step 3: Check Server Logs

### If Testing Locally:

**Watch your terminal where `npm run dev` is running:**

When you submit the form, you should see:
```
POST /api/send-email 200 in XXXms
```

If you see errors:
```
Resend API error: { ... }
```

**Copy that error message** - it will tell us what's wrong.

---

### If Testing on Vercel:

1. **Go to Vercel Dashboard**
2. **Your Project** → **Deployments**
3. **Click on latest deployment**
4. **Click "Functions" tab**
5. **Look for `/api/send-email`**
6. **Check logs** for errors

---

## 📋 Step 4: Quick Checklist

Before testing again, verify:

- [ ] `.env.local` file exists in `psp-k-website/` folder
- [ ] `RESEND_API_KEY` is set (starts with `re_`)
- [ ] `RESEND_FROM_EMAIL` is set
- [ ] `CONTACT_EMAIL` is set
- [ ] Dev server restarted after changing `.env.local`
- [ ] Domain verified in Resend (DKIM + SPF green ✅)
- [ ] Using correct "from" email:
  - `noreply@psp-kenya.com` if domain verified
  - `onboarding@resend.dev` for testing

---

## 🎯 Most Likely Issues (Based on Your Setup)

### Issue A: Environment Variables Not Loaded

**Symptom:** Error saying "RESEND_API_KEY not set" or similar.

**Fix:**
1. Check `.env.local` exists
2. Restart dev server: `Ctrl+C`, then `npm run dev`
3. If on Vercel, add variables in dashboard

---

### Issue B: Domain Verification Issue

**Symptom:** Error about domain not verified or forbidden (403).

**Fix:**
1. Use test domain temporarily:
   ```env
   RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
   ```
2. Test again
3. If it works, domain verification needs checking

---

### Issue C: Email Address Format

**Symptom:** Invalid email address error.

**Fix:**
Ensure format is correct:
```env
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
# NOT: RESEND_FROM_EMAIL=noreply@psp-kenya.com
```

---

## 🆘 What Error Are You Seeing?

**Please share:**

1. **Exact error message** (from browser console or server logs)
2. **What you see in Resend dashboard** (domain status)
3. **Your `.env.local` setup** (mask the API key)
4. **Where you're testing** (localhost or Vercel)

This will help diagnose the exact issue!

---

## 📞 Quick Test

**Try this quick test:**

1. **Update `.env.local`:**
   ```env
   RESEND_API_KEY=your_api_key_here
   RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
   CONTACT_EMAIL=wkellykitui@gmail.com
   ```

2. **Restart server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Submit contact form**

4. **Check your email** (wkellykitui@gmail.com)

**If this works:**
- ✅ Resend is working!
- Next: Switch back to your domain email once verified

**If this fails:**
- ❌ Share the exact error message you see

---

## ✅ After Fixing

Once Resend is working:

1. **Verify domain** in Resend (if not already)
2. **Update `.env.local`:**
   ```env
   RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
   ```
3. **Add same variables to Vercel** (for production)

---

**Need More Help?**

Share the exact error message and I can help diagnose further!

