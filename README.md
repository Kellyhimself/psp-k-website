# People Salvation Party of Kenya (PSP-K) Website

A modern, responsive website for the People Salvation Party of Kenya built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Homepage** - Hero section, mission, vision, and call-to-action
- 📖 **About Page** - Party information, ideology, values, and colors
- 👥 **Leadership Page** - Meet the party leadership
- 📢 **Notices Page** - Latest news and press releases
- 📝 **Contact Page** - Contact form and information
- ✍️ **Registration Page** - Member registration form
- 🤝 **Volunteer Page** - Volunteer application form
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern UI** - Clean, professional design with party colors (Purple, Green, White)

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service (optional, can be replaced)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd psp-k-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your backend service (see Backend Options below)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Options

The website is set up to use Supabase, but you can easily switch to other services. Here are some alternatives:

### Option 1: Supabase (Recommended for Full Features)

**Pros:**
- Free tier available
- Real-time database
- Authentication built-in
- File storage
- Edge functions

**Setup:**
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

**Database Schema:**
You'll need to create tables for:
- `registrations` - Member registrations
- `volunteers` - Volunteer applications
- `contacts` - Contact form submissions
- `notices` - News/notices (optional)

### Option 2: Formspree (Simplest for Forms Only)

**Pros:**
- Zero backend setup
- Free tier (50 submissions/month)
- Email notifications
- Spam protection

**Setup:**
1. Sign up at [formspree.io](https://formspree.io)
2. Create forms for contact, registration, and volunteer
3. Get form IDs and update form components to use Formspree endpoints
4. No database needed - submissions go to email

**Implementation:**
Replace form submissions with Formspree endpoints:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Option 3: Vercel + Serverless Functions

**Pros:**
- Free hosting included
- Serverless functions
- Easy deployment
- Can use any database

**Setup:**
1. Deploy to Vercel
2. Use Vercel serverless functions for form handling
3. Connect to your preferred database (PostgreSQL, MongoDB, etc.)

### Option 4: Firebase (Google Alternative)

**Pros:**
- Free tier available
- Real-time database
- Authentication
- Hosting included

**Setup:**
1. Create project at [firebase.google.com](https://firebase.google.com)
2. Install Firebase SDK: `npm install firebase`
3. Configure Firebase in your app
4. Use Firestore for data storage

### Option 5: No Backend (Static Forms)

**Pros:**
- Simplest setup
- No server costs
- Use email services like EmailJS

**Setup:**
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Configure email templates
3. Update forms to send emails directly

## Project Structure

```
psp-k-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── leadership/        # Leadership page
│   ├── notices/           # Notices/news page
│   ├── register/          # Registration page
│   ├── volunteer/         # Volunteer page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # React components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility libraries
│   └── supabase/          # Supabase client setup
├── public/                # Static assets
└── .env.example           # Environment variables template
```

## Customization

### Colors

The website uses PSP-K party colors:
- **Purple** (`#9333EA` / `purple-600`) - Progressive ideologies
- **Green** (`#16A34A` / `green-600`) - Nature, health, prosperity
- **White** - Purity and peace

Update colors in `tailwind.config.ts` or use CSS variables.

### Content

Update content in:
- `app/page.tsx` - Homepage content
- `app/about/page.tsx` - About page content
- `app/leadership/page.tsx` - Leadership information
- `app/notices/page.tsx` - News and notices

### Images

Add images to `public/` directory and reference them:
```tsx
<Image src="/logo.png" alt="PSP-K Logo" width={200} height={200} />
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

- **Netlify** - Similar to Vercel
- **AWS Amplify** - AWS hosting
- **Railway** - Full-stack hosting
- **DigitalOcean App Platform** - Simple deployment

## Form Integration

Currently, forms are set up with placeholder submission handlers. To integrate:

1. **With Supabase:**
   - Create tables in Supabase dashboard
   - Update form handlers to use Supabase client
   - Example: `await supabase.from('registrations').insert(formData)`

2. **With Formspree:**
   - Replace fetch URLs with Formspree endpoints
   - No backend code needed

3. **With Email Service:**
   - Use EmailJS or similar
   - Send form data directly to email

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

This project is for the People Salvation Party of Kenya (PSP-K).

## Support

For questions or issues, contact: info@psp-k.co.ke

---

**Meli ya Ukombozi** - Ship of Liberation
