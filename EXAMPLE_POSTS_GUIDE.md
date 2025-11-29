# Example Featured Posts for PSP-K Website

This guide provides two example posts you can use in your admin panel, based on your party's ideology and launch.

## Post 1: Party Launch Announcement

### Details:
- **Title**: PSP-K Officially Launched: A New Dawn for Kenya
- **Excerpt**: Party launch announcement
- **Image**: `/images/party-launch.jpg` (you'll upload this)
- **Link**: `/about`
- **Display Order**: 0 (appears first)

### Content Summary:
Announces the official launch of PSP-K in November 2024, introduces Party Leader Simon Wakwabubi Wanyonyi, explains the "Meli ya Ukombozi" philosophy, and outlines the party's commitment to social liberation and good governance.

---

## Post 2: Party Constitution and Ideology

### Details:
- **Title**: PSP-K Constitution and Ideology: Building a Better Kenya
- **Excerpt**: Learn about PSP-K's foundational principles
- **Image**: `/images/constitution.jpg` (you'll upload this)
- **Link**: `/downloads`
- **Display Order**: 1 (appears second)

### Content Summary:
Explains PSP-K's party colors and their meanings, guiding principles, strategic pillars (Nation Building, Society Transformation, Transforming Lives), and policy preferences.

---

## How to Use These Posts

### Option 1: Use SQL (Quick Setup)

1. **Go to Supabase Dashboard** → SQL Editor
2. **Copy and paste** the content from `example-posts.sql`
3. **Update image paths**:
   - Change `/images/party-launch.jpg` to your actual image path
   - Change `/images/constitution.jpg` to your actual image path
4. **Run the SQL** (Ctrl+Enter)
5. **Posts will appear** in your admin dashboard

### Option 2: Use Admin Panel (Recommended)

1. **Go to** `/admin/dashboard`
2. **Click "New Post"**
3. **Fill in the form** using the details below:

#### Post 1: Party Launch

**Title:**
```
PSP-K Officially Launched: A New Dawn for Kenya
```

**Excerpt:**
```
People Salvation Party of Kenya officially launched in November 2024, marking a new beginning for democratic participation and social liberation in Kenya.
```

**Content:**
```
People Salvation Party of Kenya (PSP-K) is proud to announce its official launch in November 2024. Founded by Party Leader Simon Wakwabubi Wanyonyi, PSP-K is a national grassroots social liberal party that aims to achieve good governance for economic prosperity and social justice.

Our party is guided by the philosophy "Meli ya Ukombozi" (Ship of Liberation), symbolizing our commitment to liberating Kenyans through new leadership. PSP-K is dedicated to building a government that listens, includes, and empowers every Kenyan.

As a center-left party with social liberal ideology, we believe in the sovereignty of the people of Kenya as anchored in the Constitution. We will faithfully implement programs that nurture and support individual and social development, restore sanity in the management of the economy and public affairs, and maintain fidelity to our constitution.

Our headquarters are located at Ukombozi House, Ndemi Road, Nairobi, and we are committed to working with all Kenyans to develop a National Identity that includes the collective aspirations and values of our people, considering our diversity.
```

**Image URL:**
- Upload your party launch photo via drag & drop
- Or use: `/images/party-launch.jpg` (if you add it to public/images/)

**Link URL:**
```
/about
```

**Settings:**
- ✅ Featured in Hero: Checked
- ✅ Publish Now: Checked
- Display Order: `0`

---

#### Post 2: Constitution and Ideology

**Title:**
```
PSP-K Constitution and Ideology: Building a Better Kenya
```

**Excerpt:**
```
Learn about PSP-K's foundational principles, values, and commitment to social liberation, equality, and prosperity for all Kenyans.
```

**Content:**
```
People Salvation Party of Kenya (PSP-K) is founded on the principles of social liberation, equality, and prosperity for all Kenyans. Our party colors—Purple, Green, and White—symbolize our values:

• Purple represents a mix of different ideologies and progressive liberal movements, combining the best ideas to move our country forward.
• Green symbolizes our abundance of nature, good health and vitality, harmony and prosperity.
• White illuminates new beginnings of political purity and peace.

Our guiding principles include:
• Supremacy of Party members
• Social and economic justice
• Respect for constitutionalism and the rule of law
• Respect for individual and people's rights and freedoms
• Freedom with responsibility
• Empowerment of marginalized groups
• Sustainable use of the environment
• Positive and mutually beneficial international relations
• Equal opportunity irrespective of gender, race, tribe, religion, or physical abilities

PSP-K is committed to three strategic pillars:
1. Nation Building: Enhanced national unity and inclusive governance
2. Society Transformation: Improved civic engagement and accountability culture
3. Transforming Lives: Better access to basic services and empowerment of youth, women, and vulnerable populations

Our policy preferences focus on Land and Natural Resource Management, Foreign Policy, Decentralization and Devolution, and Technology and Innovation.
```

**Image URL:**
- Upload your constitution/ideology photo via drag & drop
- Or use: `/images/constitution.jpg` (if you add it to public/images/)

**Link URL:**
```
/downloads
```

**Settings:**
- ✅ Featured in Hero: Checked
- ✅ Publish Now: Checked
- Display Order: `1`

---

## Image Recommendations

### For Post 1 (Party Launch):
- **Suggested images**:
  - Party launch event photo
  - Group photo of party members
  - Leader addressing the crowd
  - Party flag/logo at launch venue
- **Size**: 1920x1080px (wide format)
- **Content**: Should show celebration, unity, or party leadership

### For Post 2 (Constitution/Ideology):
- **Suggested images**:
  - Constitution document
  - Party symbol (stadium in circle)
  - Party colors (purple, green, white)
  - Leadership meeting
  - Abstract representation of values
- **Size**: 1920x1080px (wide format)
- **Content**: Should represent principles, values, or party identity

---

## Customization Tips

1. **Adjust Content**: Modify the text to match your exact messaging
2. **Update Dates**: Change references to specific dates if needed
3. **Add Details**: Include specific launch venue, attendees, or achievements
4. **Link URLs**: Change link URLs to point to relevant pages
5. **Display Order**: Adjust order (0 = first, 1 = second, etc.)

---

## After Creating Posts

1. **Check Homepage**: Go to `/` to see posts in hero slider
2. **Test Navigation**: Click arrows/dots to navigate between posts
3. **Verify Links**: Click "Learn More" to ensure links work
4. **Mobile Test**: Check how posts look on mobile devices

---

## Next Steps

1. **Upload Images**: Add your party launch and constitution images
2. **Create Posts**: Use admin panel or SQL to create posts
3. **Review**: Check posts appear correctly on homepage
4. **Customize**: Adjust content, images, or links as needed

---

**Need Help?**
- Check `ADMIN_SETUP.md` for admin panel guide
- Check `ADMIN_IMAGE_GUIDE.md` for image upload help
- Review `SUPABASE_STORAGE_SETUP.md` for storage setup

