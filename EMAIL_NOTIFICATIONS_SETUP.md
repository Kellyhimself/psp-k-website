# Email Notifications Setup Guide

## ✅ What's Been Added

Email notifications have been added to all forms:
- ✅ **Contact Form** - Sends email when someone submits contact form
- ✅ **Volunteer Form** - Sends email when someone applies to volunteer
- ✅ **Registration Form** - Sends email when someone registers as a member

## 📧 How It Works

1. **Form Submission:**
   - User submits form → Saved to Supabase database
   - API route sends email notification to your email
   - User sees success message

2. **Email Service:**
   - Uses **Resend** (free tier: 3,000 emails/month)
   - Professional email delivery
   - HTML and plain text emails

3. **What You Receive:**
   - Email with all form submission details
   - Reply-to set to user's email (you can reply directly)
   - Formatted HTML email with party colors

---

## 🚀 Setup Instructions

### Step 1: Sign Up for Resend (Free)

1. **Go to Resend:**
   - Visit: https://resend.com
   - Click "Sign Up" (free account)

2. **Create Account:**
   - Use your email (e.g., info@psp-kenya.com)
   - Verify your email address

3. **Get API Key:**
   - Go to **API Keys** in dashboard
   - Click **"Create API Key"**
   - Name it: "PSP-K Website"
   - Copy the API key (starts with `re_...`)

### Step 2: Choose Email Sender (Important!)

**Option A: Use Resend Test Domain (Quick Start - Recommended for Testing)**

For immediate testing, use Resend's test domain (no verification needed):

```env
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
```

**Pros:**
- ✅ Works immediately
- ✅ No domain verification needed
- ✅ Perfect for testing

**Cons:**
- ❌ Shows "onboarding@resend.dev" as sender
- ❌ Not ideal for production

**Option B: Verify Your Domain (For Production)**

### Step 2b: Verify Your Domain (Optional but Recommended for Production)

**For production use, verify your domain:**

1. **In Resend Dashboard:**
   - Go to **Domains**
   - Click **"Add Domain"**
   - Enter: `psp-kenya.com` (or your domain)

2. **Add DNS Records:**
   - Resend will show DNS records to add
   - Add them to Namecheap (or your domain registrar)
   - Wait for verification (usually 5-30 minutes)

3. **Use Verified Domain:**
   - Once verified, you can send from `noreply@psp-kenya.com`
   - Or `info@psp-kenya.com` (if you set up email forwarding)

**For testing, you can skip domain verification and use Resend's test domain.**

### Step 3: Add Environment Variables

1. **Create/Update `.env.local` file:**
   ```env
   # Existing Supabase variables
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # New Resend variables
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
   CONTACT_EMAIL=info@psp-kenya.com
   ```

   **Important:** For testing, use `onboarding@resend.dev` (works immediately). For production, verify your domain first, then use `noreply@psp-kenya.com`.

2. **Variables Explained:**
   - `RESEND_API_KEY` - Your Resend API key (from Step 1)
   - `RESEND_FROM_EMAIL` - Email address to send from
     - **For testing:** Use `onboarding@resend.dev` (works immediately, no verification needed)
     - **For production:** Use your verified domain (e.g., `noreply@psp-kenya.com`) after domain verification
   - `CONTACT_EMAIL` - Your email address (where notifications are sent)
     - This is where you'll receive form submissions

### Step 4: Install Resend Package (Optional)

The API route uses Resend's REST API directly, so you don't need to install a package. However, if you want to use the SDK later:

```bash
npm install resend
```

**Note:** The current implementation uses the REST API, so no installation needed!

### Step 5: Test It

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Submit a test form:**
   - Go to `/contact`
   - Fill out and submit the form
   - Check your email inbox!

3. **Check for errors:**
   - Open browser console (F12)
   - Look for any error messages
   - Check server logs

---

## 🔧 Configuration Options

### Change Email Recipient

Update `CONTACT_EMAIL` in `.env.local`:
```env
CONTACT_EMAIL=your-email@gmail.com
```

### Change "From" Email Address

Update `RESEND_FROM_EMAIL` in `.env.local`:
```env
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
```

### Customize Email Template

Edit `app/api/send-email/route.ts` to customize:
- Email subject
- Email body format
- HTML styling
- Additional fields

---

## 📧 Email Format

### Contact Form Email:
```
Subject: New Contact Form Submission: [User's Subject]

Name: [User's Name]
Email: [User's Email]
Phone: [User's Phone]
Subject: [User's Subject]

Message:
[User's Message]
```

### Volunteer Form Email:
```
Subject: New Volunteer Application

Name: [User's Name]
Email: [User's Email]
Phone: [User's Phone]

Skills: [User's Skills]
Availability: [User's Availability]

Message:
[User's Message]
```

### Registration Form Email:
```
Subject: New Member Registration

Name: [First Name] [Last Name]
Email: [User's Email]
Phone: [User's Phone]

ID Number: [ID Number]
Date of Birth: [Date]
Gender: [Gender]
County: [County]
Constituency: [Constituency]
Ward: [Ward]
Physical Address: [Address]
Disability Status: [Status]
```

---

## 🆘 Troubleshooting

### Emails Not Sending?

1. **Check Environment Variables:**
   - Make sure `RESEND_API_KEY` is set
   - Make sure `CONTACT_EMAIL` is set
   - Restart dev server after adding variables

2. **Check Resend Dashboard:**
   - Go to Resend → Logs
   - See if emails are being sent
   - Check for error messages

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for API errors
   - Check Network tab for `/api/send-email` requests

4. **Check Server Logs:**
   - Look at terminal where `npm run dev` is running
   - Check for error messages

### Common Issues:

**"Email service not configured"**
- `RESEND_API_KEY` is missing or incorrect
- Check `.env.local` file

**"Email configuration missing"**
- `CONTACT_EMAIL` is missing
- Add it to `.env.local`

**"Failed to send email"**
- Check Resend API key is valid
- Check domain is verified (if using custom domain)
- Check Resend dashboard for error details

**Emails going to spam:**
- Verify your domain in Resend
- Use a verified "from" email address
- Add SPF/DKIM records (Resend provides these)

---

## 💰 Resend Pricing

**Free Tier:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ API access
- ✅ Email logs

**Paid Plans:**
- Starter: $20/month - 50,000 emails
- Pro: $80/month - 200,000 emails
- Business: Custom pricing

**For PSP-K website:**
- Free tier should be plenty (3,000 emails/month = ~100/day)
- Upgrade only if you get more than 100 form submissions per day

---

## ✅ Production Deployment

### For Vercel:

1. **Add Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `RESEND_API_KEY`
     - `RESEND_FROM_EMAIL`
     - `CONTACT_EMAIL`

2. **Redeploy:**
   - Push changes to GitHub
   - Vercel will auto-deploy
   - Or manually trigger redeploy

3. **Test:**
   - Submit a form on production site
   - Check your email

---

## 📊 Summary

**What You Get:**
- ✅ Email notifications for all form submissions
- ✅ Professional HTML emails
- ✅ Reply-to set to user's email
- ✅ Free tier: 3,000 emails/month
- ✅ All forms still save to Supabase database

**Setup Time:**
- ~10 minutes to set up Resend
- ~5 minutes to add environment variables
- ~5 minutes to test

**Cost:**
- **FREE** (up to 3,000 emails/month)
- No credit card required for free tier

---

## 🎯 Next Steps

1. ✅ Sign up for Resend
2. ✅ Get API key
3. ✅ Add environment variables
4. ✅ Test form submission
5. ✅ Verify emails are received
6. ✅ Deploy to production

**Need Help?**
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
- Check `app/api/send-email/route.ts` for code details

