# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd psp-k-website
npm install
```

## Step 2: Choose Your Backend Solution

### Option A: Supabase (Full Featured)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon public key
5. Create `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Option B: Formspree (Easiest - Forms Only)

1. Go to [formspree.io](https://formspree.io) and sign up
2. Create 3 forms: Contact, Registration, Volunteer
3. Copy form IDs
4. Update form components to use Formspree endpoints (see README.md)

### Option C: No Backend (Email Only)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Configure email service
3. Update forms to send emails directly

## Step 3: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 4: Customize Content

- Update party information in `app/about/page.tsx`
- Add leadership members in `app/leadership/page.tsx`
- Update contact information in `components/Footer.tsx`
- Add news/notices in `app/notices/page.tsx`

## Step 5: Deploy

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

The site will be live at `your-project.vercel.app`

## Next Steps

- Integrate form submissions with your chosen backend
- Add images to `public/` folder
- Customize colors in Tailwind config if needed
- Add more content and pages as needed

