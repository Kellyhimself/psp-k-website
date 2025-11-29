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

1. **In Namecheap Dashboard:**
   - Go to Domain List → Click "Manage" next to your domain
   - Click "Advanced DNS" tab
   - Scroll to "Email Forwarding" section
   - Click "Add Email Forwarding"

2. **Set Up Forwarding:**
   - **Forward To**: Your personal email (Gmail, Outlook, etc.)
   - **Forward From**: 
     - `info@psp-k.co.ke` → your-email@gmail.com
     - `contact@psp-k.co.ke` → your-email@gmail.com
     - `hello@psp-k.co.ke` → your-email@gmail.com
     - (Add as many as needed - all FREE!)

3. **How It Works:**
   - Someone emails: info@psp-k.co.ke
   - Namecheap forwards it to: your-email@gmail.com
   - You reply from your Gmail (or set up "Send as" to reply from info@psp-k.co.ke)

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

