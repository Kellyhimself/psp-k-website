'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [needs2FA, setNeeds2FA] = useState(false)
  const [mfaCode, setMfaCode] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createClient()

    try {
      if (!needs2FA) {
        // Step 1: Password Login
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          setError(signInError.message)
          setIsLoading(false)
          return
        }

        // Step 2: Check standard login success
        if (data.user) {
          // Check if MFA is enabled/required
          const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

          if (mfaError) {
            console.error('MFA Check Error:', mfaError)
            // Proceed if error? Safer to block or just let middleware handle
            // For now, let's assume if error, regular login (or maybe user doesn't have mfa)
          }

          if (mfaData && mfaData.nextLevel === 'aal2' && mfaData.nextLevel !== mfaData.currentLevel) {
            // MFA Required
            setNeeds2FA(true)
            setIsLoading(false)
            return
          }

          // No MFA needed, redirect
          router.push('/admin/dashboard')
          router.refresh()
        }
      } else {
        // Step 3: MFA Verification
        // List factors to get the TOTP factor ID
        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()

        if (factorsError) {
          setError('Could not verify 2FA: ' + factorsError.message)
          setIsLoading(false)
          return
        }

        const totpFactor = factors.all.find(f => f.factor_type === 'totp')

        if (!totpFactor) {
          setError('No TOTP factor found.')
          setIsLoading(false)
          return
        }

        const { data, error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
          factorId: totpFactor.id,
          code: mfaCode,
        })

        if (verifyError) {
          setError(verifyError.message)
          setIsLoading(false)
          return
        }

        // Success
        router.push('/admin/dashboard')
        router.refresh()
      }

    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {needs2FA ? 'Two-Factor Authentication' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {needs2FA
              ? 'Enter the 6-digit code from your authenticator app'
              : 'Sign in to manage featured posts and news'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!needs2FA ? (
            // Standard Login Form
            // Standard Login Form
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          ) : (
            // 2FA Code Input
            <div>
              <label htmlFor="mfaCode" className="sr-only">
                Authentication Code
              </label>
              <input
                id="mfaCode"
                name="mfaCode"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-center text-2xl tracking-widest"
                placeholder="000000"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : (needs2FA ? 'Verify Code' : 'Sign in')}
            </button>
          </div>

          <div className="text-center space-y-2">
            {!needs2FA && (
              <Link
                href="/admin/forgot-password"
                className="block text-sm text-purple-600 hover:text-purple-500"
              >
                Forgot your password?
              </Link>
            )}
            {needs2FA && (
              <button
                type="button"
                onClick={() => setNeeds2FA(false)}
                className="block w-full text-sm text-purple-600 hover:text-purple-500"
              >
                Cancel / Use Password
              </button>
            )}
            <Link
              href="/"
              className="block text-sm text-purple-600 hover:text-purple-500"
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

