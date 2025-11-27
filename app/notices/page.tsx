export const metadata = {
  title: 'Notices | People Salvation Party of Kenya',
  description: 'Latest news and notices from PSP-K.',
}

export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: 'A New Dawn – PSP-K Unveiled',
      date: 'November 2024',
      excerpt:
        'People Salvation Party of Kenya officially launched, marking a new beginning for democratic participation in Kenya.',
      link: '#',
    },
    {
      id: 2,
      title: 'How To Become A PSP-K Member',
      date: 'November 2024',
      excerpt:
        'Learn how to register and become a member of People Salvation Party of Kenya. Join us in building a better Kenya.',
      link: '/register',
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
            Latest News & Press
          </h1>

          <div className="space-y-8">
            {notices.map((notice) => (
              <article
                key={notice.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{notice.title}</h2>
                  <span className="text-gray-500 text-sm">{notice.date}</span>
                </div>
                <p className="text-gray-600 mb-4">{notice.excerpt}</p>
                <a
                  href={notice.link}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Read More →
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Check back regularly for the latest updates and announcements from PSP-K.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

