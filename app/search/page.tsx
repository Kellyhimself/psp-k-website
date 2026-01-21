'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
    const [query, setQuery] = useState('')

    // comprehensive index of site content
    const siteIndex = [
        { title: 'Home', excerpt: 'Welcome to PSP-K', url: '/' },
        { title: 'About Us', excerpt: 'Mission, Vision, and Values of PSP-K', url: '/about' },
        { title: 'Register', excerpt: 'Join us and become a member', url: '/register' },
        { title: 'Membership Check', excerpt: 'Verify your membership status', url: '/member/check' },
        { title: 'Data Request', excerpt: 'Resignation, data correction, and deletion', url: '/member/data-request' },
        { title: 'Notices & Publications', excerpt: 'Official notices, financial reports, and downloads', url: '/notices' },
        { title: 'FAQs', excerpt: 'Frequently Asked Questions', url: '/faqs' },
        { title: 'Leadership', excerpt: 'Meet our party leadership', url: '/leadership' },
        { title: 'Private Policy', excerpt: 'Data protection and privacy policy', url: '/privacy' },
        { title: 'Terms of Use', excerpt: 'Terms and conditions', url: '/terms' },
        { title: 'ORPP Compliance', excerpt: 'Compliance with Political Parties Act', url: '/orpp-compliance' },
    ]

    const results = siteIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Search PSP-K</h1>

                    <div className="mb-10">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for pages, notices, or services..."
                            className="w-full px-6 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-4">
                        {query.length === 0 ? (
                            <p className="text-center text-gray-500 mt-8">Start typing to search...</p>
                        ) : results.length > 0 ? (
                            results.map((result, idx) => (
                                <Link key={idx} href={result.url} className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 group">
                                    <h3 className="text-xl font-semibold text-purple-800 group-hover:underline mb-1">{result.title}</h3>
                                    <p className="text-gray-600">{result.excerpt}</p>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No results found for "{query}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
