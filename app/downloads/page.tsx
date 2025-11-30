'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DownloadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setIsAuthenticated(!!user)
    } catch (error) {
      console.error('Error checking authentication:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, file: string) => {
    if (!isAuthenticated) {
      e.preventDefault()
      // Optionally redirect to login or show a message
      const shouldLogin = confirm(
        'You need to be logged in to download documents. Would you like to go to the login page?'
      )
      if (shouldLogin) {
        router.push('/admin/login')
      }
      return false
    }
    // Allow download if authenticated
    return true
  }
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

  if (isLoading) {
    return (
      <div className="py-16 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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

          {!isAuthenticated && (
            <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-yellow-700">
                    <strong>Authentication Required:</strong> You must be logged in to download
                    documents. Please{' '}
                    <Link
                      href="/admin/login"
                      className="font-semibold underline hover:text-yellow-800"
                    >
                      log in
                    </Link>{' '}
                    to access downloads.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                          href={isAuthenticated ? doc.file : '#'}
                          download={isAuthenticated ? doc.fileName : undefined}
                          onClick={(e) => handleDownloadClick(e, doc.file)}
                          className={`ml-4 px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
                            isAuthenticated
                              ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                          }`}
                          aria-disabled={!isAuthenticated}
                          title={
                            isAuthenticated
                              ? 'Download document'
                              : 'Please log in to download'
                          }
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
                          <span>{isAuthenticated ? 'Download' : 'Login Required'}</span>
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
                          href={isAuthenticated ? doc.file : '#'}
                          download={isAuthenticated ? doc.fileName : undefined}
                          onClick={(e) => handleDownloadClick(e, doc.file)}
                          className={`ml-4 px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
                            isAuthenticated
                              ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                          }`}
                          aria-disabled={!isAuthenticated}
                          title={
                            isAuthenticated
                              ? 'Download document'
                              : 'Please log in to download'
                          }
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
                          <span>{isAuthenticated ? 'Download' : 'Login Required'}</span>
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

