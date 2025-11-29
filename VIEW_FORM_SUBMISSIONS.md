# Where Contact Form Messages Go

## 📍 Current Setup

**Contact form submissions are stored in your Supabase database**, not sent via email.

### Where They Go:
- **Database**: Supabase PostgreSQL database
- **Table**: `contacts` table
- **Location**: Your Supabase project dashboard

### What Gets Stored:
- Name
- Email
- Phone (optional)
- Subject
- Message
- Timestamp (created_at)

---

## 👀 How to View Form Submissions

### Method 1: Supabase Dashboard (Current Method)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Log in to your account

2. **Navigate to Table Editor:**
   - Select your project
   - Click **"Table Editor"** in the left sidebar
   - Click on **"contacts"** table

3. **View Submissions:**
   - You'll see all contact form submissions
   - Each row is a submission
   - Click on a row to see full details

4. **Export Data (Optional):**
   - Click **"Export"** button to download as CSV
   - Or use SQL Editor to query data

### Method 2: Supabase SQL Editor

1. **Go to SQL Editor:**
   - Click **"SQL Editor"** in left sidebar
   - Create new query

2. **Run Query:**
   ```sql
   SELECT * FROM contacts 
   ORDER BY created_at DESC;
   ```

3. **View Results:**
   - See all submissions
   - Filter, sort, or export

---

## 📧 Option: Add Email Notifications

If you want to **receive emails** when someone submits the contact form, you have these options:

### Option A: Supabase Database Webhooks (Recommended)

1. **Go to Supabase Dashboard:**
   - Project → Database → Webhooks

2. **Create New Webhook:**
   - Trigger: `INSERT` on `contacts` table
   - URL: Use a service like:
     - Zapier
     - Make.com (formerly Integromat)
     - n8n
     - Or your own API endpoint

3. **Configure Email Service:**
   - Connect webhook to email service
   - Send email when new submission arrives

### Option B: Supabase Edge Functions

Create a Supabase Edge Function that:
1. Listens for new `contacts` table inserts
2. Sends email via service like:
   - SendGrid
   - Mailgun
   - AWS SES
   - Resend

### Option C: Use Formspree (Alternative)

If you prefer emails directly, you could switch to Formspree:
- Submissions go directly to your email
- Free tier: 50 submissions/month
- No database needed

---

## 🔔 Quick Setup: Email Notifications via Zapier

**Easiest way to get email notifications:**

1. **Sign up for Zapier** (free tier available)
2. **Create a Zap:**
   - **Trigger**: Supabase → New Row
   - **Action**: Email → Send Email
3. **Configure:**
   - Connect Supabase account
   - Select `contacts` table
   - Set up email template
4. **Test:**
   - Submit test form
   - Receive email notification

---

## 📊 Current Form Submissions Location

**All forms save to Supabase:**

| Form | Table | Location |
|------|-------|----------|
| Contact Form | `contacts` | Supabase Dashboard → Table Editor → contacts |
| Registration Form | `registrations` | Supabase Dashboard → Table Editor → registrations |
| Volunteer Form | `volunteers` | Supabase Dashboard → Table Editor → volunteers |

---

## ✅ Summary

**Current Behavior:**
- ✅ Form submissions saved to Supabase database
- ✅ Viewable in Supabase Dashboard
- ❌ No email notifications (unless you set up webhooks)

**To View Submissions:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Table Editor" → "contacts"
4. View all submissions

**To Get Email Notifications:**
- Set up Supabase webhooks + email service
- Or use Zapier/Make.com integration
- Or switch to Formspree for direct emails

---

## 🆘 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Table Editor Guide**: https://supabase.com/docs/guides/database/tables
- **Webhooks Guide**: https://supabase.com/docs/guides/database/webhooks

