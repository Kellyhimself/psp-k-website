# Namecheap Email Forwarding - Detailed Step-by-Step Guide

## 🎯 Quick Overview

Email forwarding lets you receive emails at `info@psp-k.co.ke` and have them automatically forwarded to your personal Gmail/Outlook account. **It's completely FREE!**

---

## 📍 Step-by-Step Instructions

### Step 1: Log In to Namecheap

1. Go to [namecheap.com](https://www.namecheap.com)
2. Click **"Sign In"** (top right corner)
3. Enter your email and password
4. Click **"Sign In"**

---

### Step 2: Navigate to Your Domain

**Option A: Via Dashboard**
1. After logging in, you'll see your dashboard
2. Look for **"Domain List"** in the left sidebar
3. Click **"Domain List"**

**Option B: Direct Link**
- Go directly to: https://ap.www.namecheap.com/domains/list/

**Option C: Via Username Menu**
1. Click your **username** (top right)
2. Select **"Domain List"** from dropdown

---

### Step 3: Open Domain Management

1. In the Domain List, find your domain: `psp-k.co.ke`
2. Look for the **"Manage"** button (usually on the right side of the domain row)
3. Click **"Manage"**

---

### Step 4: Find Email Forwarding Section

You'll see several tabs at the top. Look for one of these:

**Tab Options:**
- **"Email Forwarding"** ← This is what you want!
- **"Advanced DNS"** ← May contain email settings
- **"Domain"** ← Basic domain settings

**If you see "Email Forwarding" tab:**
- Click it and skip to Step 5

**If you DON'T see "Email Forwarding" tab:**
- Click **"Advanced DNS"** tab
- Scroll down to find **"Mail Settings"** or **"Email Forwarding"** section
- Continue to Step 5

---

### Step 5: Add Email Forwarding

**Scenario A: You see "Email Forwarding" tab**

1. Click the **"Email Forwarding"** tab
2. You'll see a section with:
   - List of existing forwardings (if any)
   - **"Add Email Forwarding"** or **"Create Email Forwarding"** button
3. Click **"Add Email Forwarding"** or **"Create Email Forwarding"**
4. Fill in the form:
   - **Mailbox**: `info` (this creates info@psp-k.co.ke)
   - **Forward To**: `your-email@gmail.com` (your personal email)
5. Click **"Save"** or **"Add"**

**Scenario B: You're in "Advanced DNS" tab**

1. Scroll down to **"Mail Settings"** section
2. Look for:
   - **"Email Forwarding"** toggle (turn it ON if it's off)
   - **"Add Email Forwarding"** button
   - Or a section that says "Email Forwarding"
3. Click **"Add Email Forwarding"** or similar button
4. Fill in:
   - **Mailbox**: `info`
   - **Forward To**: `your-email@gmail.com`
5. Click **"Save"**

**Scenario C: You can't find it anywhere**

1. Look for **"Mail Settings"** anywhere on the page
2. Check if there's a **"Enable Email Forwarding"** option
3. If still not found, try:
   - Contact Namecheap support (live chat)
   - Or use the search function in Namecheap dashboard
   - Search for "email forwarding"

---

### Step 6: Add Multiple Email Addresses

After creating your first forwarding (`info@psp-k.co.ke`):

1. Click **"Add Email Forwarding"** again
2. Create more addresses:
   - **Mailbox**: `contact` → **Forward To**: `your-email@gmail.com`
   - **Mailbox**: `hello` → **Forward To**: `your-email@gmail.com`
   - **Mailbox**: `admin` → **Forward To**: `your-email@gmail.com`
   - **Mailbox**: `support` → **Forward To**: `your-email@gmail.com`

3. **Recommended addresses for PSP-K:**
   - `info@psp-k.co.ke` - General inquiries
   - `contact@psp-k.co.ke` - Contact form submissions
   - `hello@psp-k.co.ke` - General hello
   - `admin@psp-k.co.ke` - Admin inquiries
   - `media@psp-k.co.ke` - Media inquiries
   - `volunteer@psp-k.co.ke` - Volunteer applications

---

### Step 7: Verify It Works

1. **Wait 15-30 minutes** (for DNS propagation)
2. **Send a test email:**
   - From another email account, send to: `info@psp-k.co.ke`
   - Subject: "Test Email"
   - Body: "Testing email forwarding"
3. **Check your personal email** (Gmail, Outlook, etc.)
4. **You should receive the forwarded email!**

**If you don't receive it:**
- Check spam/junk folder
- Wait another 30 minutes
- Verify the forwarding address is correct
- Try sending from a different email account

---

## 🆘 Troubleshooting

### Problem: Can't Find "Email Forwarding" Tab

**Solutions:**
1. **Check if your domain is active:**
   - Domain must be fully registered and active
   - Wait 24 hours after registration if just purchased

2. **Try different navigation:**
   - Go to Domain List → Manage → Look for all tabs
   - Check "Advanced DNS" tab for email settings
   - Look for "Mail Settings" section

3. **Contact Namecheap Support:**
   - Use live chat (available 24/7)
   - Ask: "How do I set up email forwarding for my domain?"
   - They'll guide you step-by-step

### Problem: Email Forwarding Not Working

**Check:**
1. ✅ Forwarding address is correct (no typos)
2. ✅ Personal email can receive emails
3. ✅ Waited 30+ minutes for DNS propagation
4. ✅ Checked spam folder
5. ✅ Domain is active and not expired

**Still not working?**
- Contact Namecheap support
- They can check your DNS records
- May need to verify email forwarding is enabled on their end

### Problem: Can't Add Multiple Forwardings

**Solution:**
- Some domains may have limits
- Contact Namecheap support to increase limits
- Usually unlimited on most plans

---

## 📧 Setting Up "Send As" in Gmail (Optional)

To reply as `info@psp-k.co.ke` from Gmail:

### Step 1: Gmail Settings

1. Open Gmail
2. Click **Settings** (gear icon) → **"See all settings"**
3. Go to **"Accounts and Import"** tab
4. Find **"Send mail as"** section
5. Click **"Add another email address"**

### Step 2: Add Your Domain Email

1. **Name**: `PSP-K Info` (or any name)
2. **Email address**: `info@psp-k.co.ke`
3. Check **"Treat as an alias"**
4. Click **"Next Step"**

### Step 3: Configure SMTP

1. **SMTP Server**: `smtp.gmail.com`
2. **Port**: `587`
3. **Username**: Your Gmail address
4. **Password**: Your Gmail app password (not regular password)
   - To get app password: Google Account → Security → 2-Step Verification → App passwords
5. **Secured connection**: TLS
6. Click **"Add Account"**

### Step 4: Verify

1. Gmail will send verification email to `info@psp-k.co.ke`
2. Check your forwarded email (it will come to your Gmail)
3. Click the verification link
4. Done!

### Step 5: Use It

Now when replying:
1. Click **"Reply"** to an email
2. Click the **"From"** dropdown
3. Select `info@psp-k.co.ke`
4. Your reply will appear as coming from `info@psp-k.co.ke`!

---

## ✅ Quick Checklist

- [ ] Logged into Namecheap
- [ ] Navigated to Domain List
- [ ] Clicked "Manage" on your domain
- [ ] Found "Email Forwarding" tab or section
- [ ] Added `info@psp-k.co.ke` forwarding
- [ ] Added other email addresses (contact, hello, etc.)
- [ ] Tested by sending email to info@psp-k.co.ke
- [ ] Received forwarded email in personal inbox
- [ ] (Optional) Set up "Send As" in Gmail

---

## 💡 Pro Tips

1. **Add all addresses at once** - Set up all forwardings in one session
2. **Use descriptive names** - `info`, `contact`, `admin` are clear
3. **Test immediately** - Send test emails to verify
4. **Keep records** - Note which addresses forward to which email
5. **Update contact forms** - Update your website contact forms to use these emails

---

## 🆘 Still Need Help?

1. **Namecheap Live Chat**: Available 24/7 on namecheap.com
2. **Namecheap Support**: support.namecheap.com
3. **Email**: support@namecheap.com

**When contacting support, mention:**
- You want to set up email forwarding
- Your domain name: `psp-k.co.ke`
- You can't find the email forwarding option

---

**Remember**: Email forwarding is FREE and unlimited on Namecheap! You can create as many forwarding addresses as you need.

