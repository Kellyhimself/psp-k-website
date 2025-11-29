-- Example Featured Posts for PSP-K Website
-- Run this in Supabase SQL Editor after setting up the featured_posts table
-- You can also use these as templates in the admin panel

-- Post 1: Party Launch Announcement
INSERT INTO featured_posts (
  title,
  excerpt,
  content,
  image_url,
  link_url,
  is_featured,
  is_published,
  display_order,
  published_at
) VALUES (
  'PSP-K Officially Launched: A New Dawn for Kenya',
  'People Salvation Party of Kenya officially launched in November 2024, marking a new beginning for democratic participation and social liberation in Kenya.',
  'People Salvation Party of Kenya (PSP-K) is proud to announce its official launch in November 2024. Founded by Party Leader Simon Wakwabubi Wanyonyi, PSP-K is a national grassroots social liberal party that aims to achieve good governance for economic prosperity and social justice.

Our party is guided by the philosophy "Meli ya Ukombozi" (Ship of Liberation), symbolizing our commitment to liberating Kenyans through new leadership. PSP-K is dedicated to building a government that listens, includes, and empowers every Kenyan.

As a center-left party with social liberal ideology, we believe in the sovereignty of the people of Kenya as anchored in the Constitution. We will faithfully implement programs that nurture and support individual and social development, restore sanity in the management of the economy and public affairs, and maintain fidelity to our constitution.

Our headquarters are located at Ukombozi House, Ndemi Road, Nairobi, and we are committed to working with all Kenyans to develop a National Identity that includes the collective aspirations and values of our people, considering our diversity.',
  '/images/party-launch.jpg', -- Replace with your actual image path
  '/about',
  true,
  true,
  0,
  NOW()
);

-- Post 2: Party Constitution and Ideology
INSERT INTO featured_posts (
  title,
  excerpt,
  content,
  image_url,
  link_url,
  is_featured,
  is_published,
  display_order,
  published_at
) VALUES (
  'PSP-K Constitution and Ideology: Building a Better Kenya',
  'Learn about PSP-K''s foundational principles, values, and commitment to social liberation, equality, and prosperity for all Kenyans.',
  'People Salvation Party of Kenya (PSP-K) is founded on the principles of social liberation, equality, and prosperity for all Kenyans. Our party colors—Purple, Green, and White—symbolize our values:

• Purple represents a mix of different ideologies and progressive liberal movements, combining the best ideas to move our country forward.
• Green symbolizes our abundance of nature, good health and vitality, harmony and prosperity.
• White illuminates new beginnings of political purity and peace.

Our guiding principles include:
• Supremacy of Party members
• Social and economic justice
• Respect for constitutionalism and the rule of law
• Respect for individual and people''s rights and freedoms
• Freedom with responsibility
• Empowerment of marginalized groups
• Sustainable use of the environment
• Positive and mutually beneficial international relations
• Equal opportunity irrespective of gender, race, tribe, religion, or physical abilities

PSP-K is committed to three strategic pillars:
1. Nation Building: Enhanced national unity and inclusive governance
2. Society Transformation: Improved civic engagement and accountability culture
3. Transforming Lives: Better access to basic services and empowerment of youth, women, and vulnerable populations

Our policy preferences focus on Land and Natural Resource Management, Foreign Policy, Decentralization and Devolution, and Technology and Innovation.',
  '/images/constitution.jpg', -- Replace with your actual image path
  '/downloads',
  true,
  true,
  1,
  NOW()
);

-- Note: After running these inserts, you can:
-- 1. Update the image_url fields with your actual image paths
-- 2. Adjust the display_order if needed
-- 3. Modify content to match your exact messaging
-- 4. Update published_at dates if needed

