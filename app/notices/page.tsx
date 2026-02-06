'use client'

import { useState } from 'react'

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState<'notices' | 'publications'>('notices')

  const notices = [
    {
      id: 1,
      title: 'A New Dawn – PSP-K Unveiled',
      date: 'November 2024',
      type: 'Press Release',
      excerpt:
        'People Salvation Party of Kenya officially launched, marking a new beginning for democratic participation in Kenya.',
      link: '#',
    },
    {
      id: 2,
      title: 'Membership Recruitment Drive',
      date: 'January 2025',
      type: 'Official Notice',
      excerpt:
        'We are rolling out mass registration across all 47 counties. Join us today via our portal or *509#.',
      link: '/register',
    },
  ]

  const publications = [
    {
      id: 1,
      title: 'Party Manifesto 2025',
      date: 'September 2025',
      type: 'Party Document',
      format: 'PDF',
      size: '679 KB',
      link: '/documents/manifesto.pdf',
      description: 'Our vision, policies, and plans for Kenya',
    },
    {
      id: 2,
      title: 'Party Ideology',
      date: 'September 2024',
      type: 'Party Document',
      format: 'PDF',
      size: '462 KB',
      link: '/documents/ideology.pdf',
      description: 'Our foundational principles and beliefs',
    },
  ]

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-purple-900">
            Publications & Notices
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay informed with our official communications, financial reports, and party documents.
          </p>

          <div className="flex justify-center mb-10">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex" role="tablist" aria-label="Notices Categories">
              <button
                role="tab"
                aria-selected={activeTab === 'notices'}
                aria-controls="notices-panel"
                id="notices-tab"
                onClick={() => setActiveTab('notices')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'notices'
                  ? 'bg-purple-100 text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Official Notices
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'publications'}
                aria-controls="publications-panel"
                id="publications-tab"
                onClick={() => setActiveTab('publications')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'publications'
                  ? 'bg-purple-100 text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Publications & Reports
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'notices' && (
              <div
                role="tabpanel"
                id="notices-panel"
                aria-labelledby="notices-tab"
                className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6"
              >
                {notices.map((notice) => (
                  <article
                    key={notice.id}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition card-hover"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium w-fit">
                        {notice.type}
                      </span>
                      <span className="text-gray-400 text-xs font-mono uppercase tracking-wide">{notice.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{notice.excerpt}</p>
                    <a
                      href={notice.link}
                      className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center text-sm"
                    >
                      Read full notice <span className="ml-1">&rarr;</span>
                    </a>
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'publications' && (
              <div
                role="tabpanel"
                id="publications-panel"
                aria-labelledby="publications-tab"
                className="animate-in fade-in slide-in-from-bottom-2 duration-300 grid grid-cols-1 gap-4"
              >
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-200 transition group flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-medium">
                          {pub.type}
                        </span>
                        <span className="text-gray-400 text-xs">{pub.date}</span>
                        <span className="text-gray-400 text-xs">{pub.size}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {pub.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{pub.description}</p>
                    </div>
                    <a
                      href={pub.link}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shrink-0 ml-4"
                      title={`Download ${pub.title}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      <span className="text-sm font-medium">Download</span>
                    </a>
                  </div>
                ))}
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-blue-800 font-medium">Looking for More Documents?</p>
                  <p className="text-sm text-blue-600 mt-1">The Party Constitution and Election Rules are available in the <a href="/downloads" className="underline font-semibold hover:text-blue-800">Members Downloads</a> section.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
