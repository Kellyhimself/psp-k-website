# Resend Domain Setup - Quick Fix

## 🚨 Current Error

You're seeing this error:
```
The psp-kenya.com domain is not verified. Please, add and verify your domain
```

This happens because you're trying to send from `psp-kenya.com`, but the domain isn't verified in Resend yet.

---

## ✅ Quick Fix: Use Resend Test Domain (For Testing)

**Update your `.env.local` file:**

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
CONTACT_EMAIL=info@psp-kenya.com
```

**Change:** Use `onboarding@resend.dev` instead of `noreply@psp-kenya.com`

This is Resend's test domain - **it works immediately** without domain verification!

**Note:** Emails from `onboarding@resend.dev` will work, but they'll show "onboarding@resend.dev" as the sender. This is fine for testing.

---

## 🔧 Production Setup: Verify Your Domain

When you're ready for production, verify your domain:

### Step 1: Add Domain in Resend

1. **Go to Resend Dashboard:**
   - Visit: https://resend.com/domains
   - Click **"Add Domain"**

2. **Enter Your Domain:**
   - Domain: `psp-kenya.com`
   - Click **"Add"**

### Step 2: Add DNS Records in Namecheap

**In Namecheap:**
1. Go to **Domain List** → Click **"Manage"** next to your domain
2. Click **"Advanced DNS"** tab
3. Scroll to **"Host Records"** section

**Add these records one by one:**

#### Record 1: DKIM (TXT Record)
1. Click **"Add New Record"** button
2. Select **Type**: `TXT Record`
3. **Host**: `resend._domainkey`
4. **Value**: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0SJldqxcBNhtGBfNbuHRiYZ0fu8/jTo0PgsmMbJ0/e/o4YnV6964RMrbe4WEzBr+UbjUYKdRAbRsi8H9oHNph6YhpBdp/+CaI9y2Yu2+guemXaocmf+C2PXoGbE1HLarimpcAaHCe5PYj6wdyrv3uWGvZdIaG10CxT35/oid05QIDAQAB`
5. **TTL**: `Automatic`
6. Click **"Save"** (green checkmark)

#### Record 2: SPF (TXT Record)
1. Click **"Add New Record"** button
2. Select **Type**: `TXT Record`
3. **Host**: `send`
4. **Value**: `v=spf1 include:amazonses.com ~all`
5. **TTL**: `Automatic`
6. Click **"Save"**

#### Record 3: MX Record (For Feedback)
1. Click **"Add New Record"** button
2. **IMPORTANT**: If you don't see "MX Record" in the Type dropdown:
   - Look for **"Mail Exchange (MX)"** or just **"MX"**
   - If still not visible, try scrolling in the dropdown
   - **Alternative**: MX records might be in a separate "Mail Settings" section
3. Select **Type**: `MX Record` (or `Mail Exchange (MX)`)
4. **Host**: `send`
5. **Value**: `feedback-smtp.eu-west-1.amazonses.com`
6. **Priority**: `10`
7. **TTL**: `Automatic`
8. Click **"Save"**

**If MX Record Type is Not Available:**
- **Option A**: Check if there's a separate "Mail Settings" section below Host Records
- **Option B**: Some domains may need MX records added differently - contact Namecheap support
- **Option C**: The MX record is for feedback only - you can skip it if not critical (SPF and DKIM are more important)

#### Record 4: DMARC (TXT Record - Optional)
1. Click **"Add New Record"** button
2. Select **Type**: `TXT Record`
3. **Host**: `_dmarc`
4. **Value**: `v=DMARC1; p=none;`
5. **TTL**: `Automatic`
6. Click **"Save"`

**Note**: The MX record is for email feedback/bounce handling. If you can't add it, SPF and DKIM records are the most important for sending emails.

### Step 3: Wait for Verification

- DNS propagation: 5-30 minutes (sometimes up to 24 hours)
- Resend will verify automatically
- Check Resend dashboard for status

### Step 4: Update Environment Variable

Once verified, update `.env.local`:

```env
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
```

Or use any email on your domain:
```env
RESEND_FROM_EMAIL=PSP-K Website <info@psp-kenya.com>
```

---

## 🎯 Two Options

### Option 1: Test Now (Recommended for Development)

**Use Resend test domain:**
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

### Option 2: Verify Domain (For Production)

**Verify `psp-kenya.com` in Resend:**
- Add DNS records to Namecheap
- Wait for verification
- Use your domain email

**Pros:**
- ✅ Professional sender address
- ✅ Better deliverability
- ✅ Production-ready

**Cons:**
- ⏱️ Takes 5-30 minutes to verify
- 🔧 Requires DNS configuration

---

## 📝 Current Setup Recommendation

**For now (testing):**
```env
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
```

**Later (production):**
1. Verify domain in Resend
2. Update to:
```env
RESEND_FROM_EMAIL=PSP-K Website <noreply@psp-kenya.com>
```

---

## 🆘 Still Having Issues?

1. **Check Resend Dashboard:**
   - Go to https://resend.com/domains
   - See domain verification status

2. **Check DNS Records:**
   - Use https://mxtoolbox.com to check DNS
   - Verify records are propagated

3. **Test with Resend Test Domain:**
   - Use `onboarding@resend.dev` for now
   - This always works without verification

---

## ✅ Quick Action

**Right now, update `.env.local`:**

```env
RESEND_FROM_EMAIL=PSP-K Website <onboarding@resend.dev>
```

**Then restart your dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Test the form again - it should work!**

