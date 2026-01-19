'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAdminLoggedIn(!!user)
      } catch {
        setIsAdminLoggedIn(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpg"
              alt="PSP-K Logo"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
            <span className="text-xl font-bold text-gray-800">People Salvation Party</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition">
              About
            </Link>
            <Link href="/leadership" className="text-gray-700 hover:text-purple-600 transition">
              Leadership
            </Link>
            <Link href="/notices" className="text-gray-700 hover:text-purple-600 transition">
              Notices
            </Link>
            <Link href="/downloads" className="text-gray-700 hover:text-purple-600 transition">
              Downloads
            </Link>
            <Link href="/media" className="text-gray-700 hover:text-purple-600 transition">
              Media
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition">
              Contact
            </Link>
            {isAdminLoggedIn && (
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Admin Dashboard
              </Link>
            )}
            {isAdminLoggedIn === false && (
              <Link
                href="/admin/login"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Login
              </Link>
            )}
            <Link
              href="/register"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/leadership"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Leadership
            </Link>
            <Link
              href="/notices"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Notices
            </Link>
            <Link
              href="/downloads"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Downloads
            </Link>
            <Link
              href="/media"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Media
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAdminLoggedIn && (
              <Link
                href="/admin/dashboard"
                className="block py-2 text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {isAdminLoggedIn === false && (
              <Link
                href="/admin/login"
                className="block py-2 text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link
              href="/register"
              className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

