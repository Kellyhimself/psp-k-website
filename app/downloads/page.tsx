import Link from 'next/link'

export const metadata = {
  title: 'Downloads | People Salvation Party of Kenya',
  description: 'Download PSP-K official documents including manifesto, ideology, and party resources.',
}

export default function DownloadsPage() {
  const documents = [
    {
      title: 'Party Constitution',
      description: 'PSP-K Party Constitution - Complete constitution document',
      file: '/documents/constitution_front_page.pdf',
      fileName: 'PSP-K-Constitution.pdf',
      date: 'November 2024',
      category: 'Party Documents',
      icon: '📜',
    },
    {
      title: 'Party Ideology',
      description: 'PSP-K Ideology Document - Our foundational principles and beliefs',
      file: '/documents/ideology.pdf',
      fileName: 'PSP-K-Ideology.pdf',
      date: 'September 15, 2024',
      category: 'Party Documents',
      icon: '📋',
    },
    {
      title: 'Party Manifesto 2025',
      description: 'PSP-K Manifesto - Our vision, policies, and plans for Kenya',
      file: '/documents/manifesto.pdf',
      fileName: 'PSP-K-Manifesto-2025.pdf',
      date: 'September 15, 2025',
      category: 'Party Documents',
      icon: '📘',
    },
    {
      title: 'Election and Nomination Rules',
      description: 'Complete rules governing party elections and candidate nominations',
      file: '/documents/election_nomination_rules.pdf',
      fileName: 'PSP-K-Election-Nomination-Rules.pdf',
      date: 'November 2024',
      category: 'Election Documents',
      icon: '🗳️',
    },
    {
      title: 'Nomination Rules',
      description: 'PSP-K Nomination and Elections Rules - Guidelines for party nominations',
      file: '/documents/nomination_rules.pdf',
      fileName: 'PSP-K-Nomination-Rules.pdf',
      date: 'November 2024',
      category: 'Election Documents',
      icon: '📝',
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
            Downloads
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Access official PSP-K documents, policies, and resources
          </p>

          <div className="space-y-8">
            {/* Party Documents Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Party Documents</h2>
              <div className="space-y-4">
                {documents
                  .filter((doc) => doc.category === 'Party Documents')
                  .map((doc, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-3xl">{doc.icon}</span>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800">{doc.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{doc.description}</p>
                          <p className="text-sm text-gray-500">Published: {doc.date}</p>
                        </div>
                        <a
                          href={doc.file}
                          download={doc.fileName}
                          className="ml-4 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center space-x-2 whitespace-nowrap"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Election Documents Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-green-600">Election & Nomination Documents</h2>
              <div className="space-y-4">
                {documents
                  .filter((doc) => doc.category === 'Election Documents')
                  .map((doc, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-3xl">{doc.icon}</span>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800">{doc.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{doc.description}</p>
                          <p className="text-sm text-gray-500">Published: {doc.date}</p>
                        </div>
                        <a
                          href={doc.file}
                          download={doc.fileName}
                          className="ml-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center space-x-2 whitespace-nowrap"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">About Our Documents</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PSP-K is committed to transparency and accountability. All our official documents are
              made available to the public to ensure that every Kenyan can understand our
              principles, policies, and vision for the country.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These documents are provided in accordance with the Political Parties Act and
              demonstrate our commitment to democratic principles and good governance.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              ← Back to About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

