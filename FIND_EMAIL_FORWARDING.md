# Finding Email Forwarding in Namecheap - Quick Guide

## 🔍 The Problem

You can see the SPF record in "Advanced DNS" → "Mail Settings", but you can't find where to set up the actual forwarding rule (`info@psp-kenya.com → your-email@gmail.com`).

## ✅ Solution: Look in a Different Tab

The email forwarding rule is **NOT** in Advanced DNS. It's in a **separate tab** called **"Email Forwarding"** or **"Domain"**.

---

## 📍 Step-by-Step: Find Email Forwarding

### Step 1: Go Back to Domain Management

You're currently in: **Domain List → Manage → Advanced DNS**

### Step 2: Look at the Tabs at the Top

At the top of the page, you should see tabs like:
- **Domain** ← Check this one!
- **Advanced DNS** ← You're here now
- **Email Forwarding** ← Or this one!
- **Sharing & Transfer**
- **Domain Products**

### Step 3: Try These Tabs

**Option A: "Email Forwarding" Tab**
1. Click the **"Email Forwarding"** tab (if you see it)
2. You should see a section to add forwarding addresses
3. Click **"Add Email Forwarding"** or **"Create Email Forwarding"**

**Option B: "Domain" Tab**
1. Click the **"Domain"** tab
2. Scroll down to find **"Email Forwarding"** section
3. Look for **"Add Email Forwarding"** button

**Option C: Look for "Mail Settings" Link**
1. In the "Domain" tab, look for a link that says **"Mail Settings"** or **"Email Settings"**
2. Click it to access email forwarding

---

## 🆘 If You Still Can't Find It

### Method 1: Use Namecheap Search

1. In the Namecheap dashboard, use the **search bar** (top of page)
2. Type: **"email forwarding"**
3. It should show you a direct link to email forwarding settings

### Method 2: Direct URL

Try going directly to:
```
https://ap.www.namecheap.com/domains/list/domaincontrolpanel/psp-kenya.com/emailforwarding
```

(Replace `psp-kenya.com` with your actual domain if different)

### Method 3: Contact Namecheap Support (Recommended)

1. **Click "Support"** in Namecheap (usually top right)
2. **Click "Live Chat"** (available 24/7)
3. **Tell them:**
   - "I want to set up email forwarding for psp-kenya.com"
   - "I can see the SPF record in Advanced DNS, but I can't find where to add the forwarding rule"
   - "Can you guide me to the email forwarding section?"
4. They'll give you the exact steps or enable it for you

---

## 💡 Alternative: Use Namecheap Private Email (If Forwarding Not Available)

If email forwarding isn't available for your domain type, you can use:

1. **Namecheap Private Email** (paid, ~$1.50/month)
   - Go to Domain Products → Private Email
   - Set up email accounts directly

2. **Or use a different email service:**
   - Google Workspace
   - Microsoft 365
   - Zoho Mail (free option available)

---

## 🎯 What You Should See (When You Find It)

When you find the email forwarding section, you should see:

**Email Forwarding:**
```
┌─────────────────────────────────────────┐
│ Add Email Forwarding                    │
├─────────────────────────────────────────┤
│ Mailbox: [info        ]                 │
│ Forward To: [your-email@gmail.com]     │
│                                         │
│ [Save] [Cancel]                        │
└─────────────────────────────────────────┘
```

Or a list of existing forwardings:
```
info@psp-kenya.com → your-email@gmail.com
contact@psp-kenya.com → your-email@gmail.com
```

---

## ✅ Quick Checklist

- [ ] Checked "Email Forwarding" tab
- [ ] Checked "Domain" tab
- [ ] Used search bar to find "email forwarding"
- [ ] Tried direct URL
- [ ] Contacted Namecheap support (if still can't find)

---

## 📞 Namecheap Support Contact

**Live Chat:** Available 24/7 on namecheap.com
- Click "Support" → "Live Chat"
- Fastest way to get help

**Email:** support@namecheap.com

**When contacting, mention:**
- Domain: psp-kenya.com
- You can see SPF record in Advanced DNS
- Need help finding email forwarding setup
- Want to forward info@psp-kenya.com to your Gmail

---

## 🔄 Next Steps After Finding It

Once you find the email forwarding section:

1. **Add forwarding:**
   - Mailbox: `info`
   - Forward To: `your-email@gmail.com`
   - Click "Save"

2. **Add more (optional):**
   - `contact@psp-kenya.com`
   - `hello@psp-kenya.com`
   - `admin@psp-kenya.com`

3. **Wait 15-30 minutes** for DNS propagation

4. **Test:** Send email to `info@psp-kenya.com` and check your Gmail

---

**Most likely solution:** Look for the **"Email Forwarding"** tab at the top of the Domain Management page, or check the **"Domain"** tab for email settings.

If you still can't find it after checking all tabs, **contact Namecheap support** - they'll guide you directly to it!

