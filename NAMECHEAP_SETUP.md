# Using Namecheap for PSP-K Domain

## ✅ Yes, You Can Use Namecheap!

Namecheap is an excellent choice for domain registration. Here's how to set it up:

## 🎯 Domain Options on Namecheap

### Recommended Domains:
1. **psp-k.co.ke** - ~$12-15/year (~KSh 1,500-1,900/year)
2. **psp-k.com** - ~$10-13/year (~KSh 1,200-1,600/year)
3. **pspkenya.co.ke** - ~$12-15/year
4. **meliyaukombozi.co.ke** - ~$12-15/year

## 📋 Step-by-Step: Register Domain on Namecheap

### Step 1: Create Account
1. Go to [namecheap.com](https://www.namecheap.com)
2. Click "Sign Up" (top right)
3. Enter email, create password
4. Verify email address

### Step 2: Search for Domain
1. In search bar, type: `psp-k.co.ke`
2. Click "Search"
3. Check availability
4. If available, click "Add to Cart"

### Step 3: Configure Domain
1. **WHOIS Privacy**: ✅ Enable (usually FREE with Namecheap)
2. **Auto-Renew**: ✅ Enable (recommended)
3. **DNS**: Choose "Namecheap BasicDNS" (you'll change this later)

### Step 4: Checkout
1. Review cart
2. Enter payment (Credit Card or PayPal)
3. Complete purchase
4. Domain will be active in 1-24 hours

## 🔗 Connect Namecheap Domain to Vercel

### Option 1: Use Namecheap DNS (Easiest)

1. **In Namecheap Dashboard:**
   - Go to Domain List → Manage → Advanced DNS
   - Add these records:
     ```
     Type: A Record
     Host: @
     Value: 76.76.21.21
     TTL: Automatic
     
     Type: CNAME Record
     Host: www
     Value: cname.vercel-dns.com
     TTL: Automatic
     ```

2. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add domain: `psp-k.co.ke`
   - Vercel will verify automatically
   - Wait 1-24 hours for DNS propagation

### Option 2: Use Vercel DNS (Recommended)

1. **In Vercel Dashboard:**
   - Go to project → Settings → Domains
   - Add domain: `psp-k.co.ke`
   - Vercel will show you DNS records to add

2. **In Namecheap:**
   - Go to Domain List → Manage → Advanced DNS
   - Delete existing records
   - Add the records Vercel provides:
     ```
     Type: A Record
     Host: @
     Value: [Vercel IP]
     
     Type: CNAME Record
     Host: www
     Value: [Vercel CNAME]
     ```

3. Wait for DNS propagation (1-24 hours)

## 💰 Cost Breakdown

### First Year:
- Domain: ~$12-15 (~KSh 1,500-1,900)
- WHOIS Privacy: FREE (included)
- SSL Certificate: FREE (from Vercel)
- Hosting: FREE (Vercel)
- **Total: ~KSh 1,500-1,900/year**

### Renewal:
- Domain renewal: ~$12-15/year
- Same low cost every year

## ✅ Advantages of Namecheap

1. **Cheaper**: Often KSh 600-1,000 cheaper than local registrars
2. **Free WHOIS Privacy**: Protects your personal info (usually costs extra)
3. **Better UI**: Easy to use dashboard
4. **24/7 Support**: Live chat support
5. **Easy DNS Management**: Simple to update DNS records
6. **Works Great with Vercel**: Seamless integration

## ⚠️ Considerations

1. **Payment**: Need credit card or PayPal (no M-Pesa)
2. **Support**: International support (not Kenya-specific, but still good)
3. **Time Zone**: Support is 24/7 but may be US-based

## 🔒 Security Features

- ✅ Free WHOIS privacy protection
- ✅ Two-factor authentication available
- ✅ Domain lock enabled by default
- ✅ Easy to enable/disable auto-renew

## 📧 Email Forwarding Setup (FREE) ⭐ RECOMMENDED

**Yes, you can use Namecheap + Vercel + Email Forwarding!** This is a perfect, cost-effective setup.

### Email Forwarding on Namecheap (FREE):

#### Step 1: Navigate to Domain Management

1. **Log in to Namecheap:**
   - Go to [namecheap.com](https://www.namecheap.com)
   - Click "Sign In" (top right)
   - Enter your credentials

2. **Go to Domain List:**
   - Click your **username** (top right)
   - Select **"Domain List"** from the dropdown menu
   - OR go directly to: https://ap.www.namecheap.com/domains/list/

3. **Find Your Domain:**
   - You'll see a list of all your domains
   - Find `psp-k.co.ke` (or your domain name)
   - Click the **"Manage"** button next to it

#### Step 2: Access Email Forwarding

**Method 1: Direct Email Forwarding (Easiest)**

1. **In the Domain Management page:**
   - Look for tabs: **"Domain"**, **"Advanced DNS"**, **"Email Forwarding"**, etc.
   - Click the **"Email Forwarding"** tab
   - If you don't see this tab, try Method 2 below

2. **Add Email Forwarding:**
   - You'll see a section titled "Email Forwarding" or "Mail Settings"
   - Click **"Add Email Forwarding"** or **"Create Email Forwarding"** button
   - Enter:
     - **Mailbox**: `info` (this creates info@psp-k.co.ke)
     - **Forward To**: `your-email@gmail.com` (your personal email)
   - Click **"Save"** or **"Add"**

**Method 2: Via Advanced DNS (If Email Forwarding Tab Not Visible)**

1. **Go to Advanced DNS:**
   - Click the **"Advanced DNS"** tab
   - Scroll down to find **"Mail Settings"** or **"Email Forwarding"** section

2. **Enable Email Forwarding:**
   - Look for **"Email Forwarding"** toggle or section
   - If there's a toggle, turn it **ON**
   - Then you should see options to add forwarding addresses

**Method 3: Using MX Records (Advanced - If above don't work)**

1. **In Advanced DNS tab:**
   - Scroll to **"Mail Settings"** section
   - Look for **"Email Forwarding"** option
   - Click **"Add Record"** or **"Enable Email Forwarding"**

2. **If you see MX Records:**
   - You may need to add an MX record for email forwarding
   - Contact Namecheap support for assistance

#### Step 3: Add Multiple Email Addresses

After setting up your first forwarding:

1. **Add More Forwarding Addresses:**
   - Click **"Add Email Forwarding"** again
   - Create:
     - `contact@psp-k.co.ke` → your-email@gmail.com
     - `hello@psp-k.co.ke` → your-email@gmail.com
     - `info@psp-k.co.ke` → your-email@gmail.com
     - `admin@psp-k.co.ke` → your-email@gmail.com
     - (Add as many as needed - all FREE!)

2. **Each Forwarding:**
   - **Mailbox**: The part before @ (e.g., `info`, `contact`)
   - **Forward To**: Your personal email address
   - Click **"Save"** after each one

#### Step 4: Verify It Works

1. **Test the Forwarding:**
   - Send an email from another account to: `info@psp-k.co.ke`
   - Check your personal email (Gmail, Outlook, etc.)
   - You should receive the forwarded email within a few minutes

2. **If Not Working:**
   - Wait 15-30 minutes (DNS propagation)
   - Check spam folder
   - Verify the forwarding address is correct
   - Contact Namecheap support if still not working

#### How It Works:

- Someone emails: `info@psp-k.co.ke`
- Namecheap automatically forwards it to: `your-email@gmail.com`
- You receive it in your Gmail inbox
- You can reply from Gmail (see next section to reply as info@psp-k.co.ke)

### Reply from Your Domain Email (Optional):

To reply as info@psp-k.co.ke from Gmail:

1. **Gmail Settings:**
   - Settings → Accounts and Import
   - "Send mail as" → Add another email address
   - Enter: info@psp-k.co.ke
   - Choose "Treat as an alias"
   - Gmail will send verification email
   - Verify and done!

2. **Now you can:**
   - Receive emails at info@psp-k.co.ke (forwarded to Gmail)
   - Reply as info@psp-k.co.ke (from Gmail)

### Cost Comparison:

**Email Forwarding (FREE):**
- ✅ Cost: FREE
- ✅ Unlimited forwarding addresses
- ✅ Works immediately
- ✅ No monthly fees

**Google Workspace:**
- Cost: ~KSh 720/month per user
- More features (calendar, drive, etc.)

**Namecheap Private Email:**
- Cost: ~KSh 225/month
- Basic email hosting

**Recommendation**: Start with FREE email forwarding! Upgrade later if needed.

## 🆘 Troubleshooting

### Domain Not Connecting to Vercel?
1. Check DNS records are correct
2. Wait 24 hours for propagation
3. Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS status
4. Contact Namecheap support if needed

### Payment Issues?
- Namecheap accepts: Credit Card, PayPal, Bitcoin
- No M-Pesa (use local registrar if needed)

### Need Help?
- Namecheap Live Chat: Available 24/7
- Vercel Support: vercel.com/support

## 🎯 Quick Start Checklist

- [ ] Create Namecheap account
- [ ] Search and register `psp-k.co.ke`
- [ ] Enable WHOIS privacy (free)
- [ ] Enable auto-renew
- [ ] Add domain to Vercel
- [ ] Update DNS records
- [ ] Wait for DNS propagation
- [ ] Test website at psp-k.co.ke

## 💡 Pro Tips

1. **Register Multiple Domains**: Consider registering:
   - psp-k.co.ke (primary)
   - psp-k.com (backup/international)
   - Both can point to same Vercel site

2. **Enable Auto-Renew**: Prevents accidental expiration

3. **Use WHOIS Privacy**: Protects your personal information

4. **Keep Records**: Save your Namecheap login details securely

---

**Bottom Line**: Namecheap is a great choice! It's often cheaper, easier to use, and works perfectly with Vercel. Just need a credit card or PayPal for payment.

