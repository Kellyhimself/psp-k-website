# Adding Resend DNS Records in Namecheap - Step by Step

## 🎯 Your Records to Add

Based on Resend's requirements, you need to add:

1. **DKIM** - TXT record
2. **SPF** - TXT record  
3. **MX** - MX record (for feedback)
4. **DMARC** - TXT record (optional)

---

## 📍 Step-by-Step: Adding Records in Namecheap

### Step 1: Navigate to DNS Settings

1. **Go to Namecheap:**
   - Visit: https://ap.www.namecheap.com/domains/list/
   - Log in to your account

2. **Open Domain Management:**
   - Find your domain: `psp-kenya.com`
   - Click **"Manage"** button

3. **Go to Advanced DNS:**
   - Click **"Advanced DNS"** tab
   - Scroll to **"Host Records"** section

---

## ✅ Adding Each Record

### Record 1: DKIM (TXT Record)

1. **Click "Add New Record"** button
2. **Type**: Select `TXT Record` from dropdown
3. **Host**: Enter `resend._domainkey`
4. **Value**: Paste this entire string:
   ```
   p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0SJldqxcBNhtGBfNbuHRiYZ0fu8/jTo0PgsmMbJ0/e/o4YnV6964RMrbe4WEzBr+UbjUYKdRAbRsi8H9oHNph6YhpBdp/+CaI9y2Yu2+guemXaocmf+C2PXoGbE1HLarimpcAaHCe5PYj6wdyrv3uWGvZdIaG10CxT35/oid05QIDAQAB
   ```
5. **TTL**: Select `Automatic`
6. **Click the green checkmark** (Save)

---

### Record 2: SPF (TXT Record)

1. **Click "Add New Record"** button
2. **Type**: Select `TXT Record`
3. **Host**: Enter `send`
4. **Value**: Enter `v=spf1 include:amazonses.com ~all`
5. **TTL**: Select `Automatic`
6. **Click the green checkmark** (Save)

---

### Record 3: MX Record (For Feedback)

**⚠️ IMPORTANT: Finding MX Record Type**

If you don't see "MX Record" in the Type dropdown:

**Method 1: Check the Dropdown Carefully**
- Click the Type dropdown
- Look for:
  - `MX Record`
  - `Mail Exchange (MX)`
  - `MX`
- Scroll through all options if needed

**Method 2: Check Mail Settings Section**
- Scroll down below "Host Records"
- Look for **"Mail Settings"** section
- MX records might be added there instead

**Method 3: If MX is Available in Host Records**
1. **Click "Add New Record"** button
2. **Type**: Select `MX Record` (or `Mail Exchange (MX)`)
3. **Host**: Enter `send`
4. **Value**: Enter `feedback-smtp.eu-west-1.amazonses.com`
5. **Priority**: Enter `10`
6. **TTL**: Select `Automatic`
7. **Click the green checkmark** (Save)

**Method 4: If MX is NOT Available (Alternative)**
- The MX record is for **email feedback/bounce handling**
- **You can skip it** - SPF and DKIM are more important for sending
- Resend will still work without it (you just won't get bounce feedback)
- Contact Namecheap support if you really need it

---

### Record 4: DMARC (TXT Record - Optional)

1. **Click "Add New Record"** button
2. **Type**: Select `TXT Record`
3. **Host**: Enter `_dmarc`
4. **Value**: Enter `v=DMARC1; p=none;`
5. **TTL**: Select `Automatic`
6. **Click the green checkmark** (Save)

---

## 🔍 Finding MX Records in Namecheap

### Where MX Records Might Be:

**Option 1: In Host Records Dropdown**
- Look carefully in the Type dropdown
- It might be listed as "MX" or "Mail Exchange (MX)"
- Scroll through all options

**Option 2: In Mail Settings Section**
- Scroll down below "Host Records"
- Look for a section called "Mail Settings" or "Email Settings"
- MX records might be configured there

**Option 3: Contact Namecheap Support**
- If you can't find MX records anywhere
- Use live chat: https://www.namecheap.com/support/
- Ask: "How do I add an MX record for domain psp-kenya.com?"
- They'll guide you to the right place

---

## ✅ Minimum Required Records

**For Resend to work, you MUST add:**
- ✅ **DKIM** (TXT record) - Required
- ✅ **SPF** (TXT record) - Required

**Nice to have:**
- ⚠️ **MX** (MX record) - For feedback (can skip if not available)
- ⚠️ **DMARC** (TXT record) - Optional but recommended

**If you can't add MX record:**
- Resend will still work!
- You just won't receive bounce/feedback emails
- SPF and DKIM are the critical ones

---

## 🧪 After Adding Records

1. **Wait 5-30 minutes** for DNS propagation
2. **Go back to Resend Dashboard:**
   - Visit: https://resend.com/domains
   - Click on your domain
   - Check verification status

3. **Verify Records:**
   - Resend will automatically check DNS records
   - Green checkmarks = verified ✅
   - Red X = not found yet (wait longer)

---

## 🆘 Troubleshooting

### "MX Record Type Not Found"

**Solution 1: Skip MX Record**
- Add DKIM and SPF only
- Resend will work without MX
- MX is only for feedback emails

**Solution 2: Contact Namecheap**
- Use live chat
- Ask them to add MX record manually
- Provide: Host: `send`, Value: `feedback-smtp.eu-west-1.amazonses.com`, Priority: `10`

**Solution 3: Check Mail Settings**
- Look for separate "Mail Settings" section
- MX might be configured there

### "Records Not Verifying"

1. **Wait longer** - DNS can take up to 24 hours
2. **Check for typos** - Copy/paste values exactly
3. **Verify in Resend** - Check which record is failing
4. **Use DNS checker** - https://mxtoolbox.com to verify records

---

## 📋 Quick Checklist

- [ ] Added DKIM TXT record (`resend._domainkey`)
- [ ] Added SPF TXT record (`send`)
- [ ] Added MX record (`send`) - if available, or skip
- [ ] Added DMARC TXT record (`_dmarc`) - optional
- [ ] Waited 5-30 minutes
- [ ] Checked Resend dashboard for verification
- [ ] All records showing green checkmarks ✅

---

## 💡 Pro Tip

**If MX record is causing issues:**
- **Skip it for now** - Add DKIM and SPF first
- Test if Resend works (it should!)
- Add MX later if needed
- MX is only for receiving bounce/feedback emails

**Most important records:**
1. DKIM ✅
2. SPF ✅
3. MX (optional)
4. DMARC (optional)

---

**Need Help?**
- Namecheap Support: https://www.namecheap.com/support/
- Resend Support: support@resend.com
- Check `RESEND_DOMAIN_SETUP.md` for more details

