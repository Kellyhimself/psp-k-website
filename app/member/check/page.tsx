'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function MemberCheckPage() {
    const [idNumber, setIdNumber] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'not-found' | 'error'>('idle')
    const [resultMessage, setResultMessage] = useState('')

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!idNumber) return

        setStatus('loading')
        setResultMessage('')

        try {
            const supabase = createClient()

            // Call the secure RPC function
            const { data, error } = await supabase.rpc('check_membership_status', {
                check_id: idNumber
            })

            if (error) {
                throw error
            }

            if (data && data.exists) {
                setStatus('success')
                setResultMessage(data.message)
            } else {
                setStatus('not-found')
            }

        } catch (error) {
            console.error('Check error:', error)
            setStatus('error')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Member Verification</h1>
                    <p className="mt-2 text-gray-600">Check your PSP-K membership status</p>
                </div>

                <form onSubmit={handleCheck} className="space-y-6">
                    <div>
                        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            National ID Number
                        </label>
                        <input
                            type="text"
                            id="idNumber"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                            placeholder="Enter ID Number"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition disabled:opacity-70"
                    >
                        {status === 'loading' ? 'Verifying...' : 'Check Status'}
                    </button>
                </form>

                {status === 'success' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-bold text-green-900">Membership Valid</h3>
                                <p className="text-green-800">{resultMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'not-found' && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-yellow-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="font-bold text-yellow-900">Member Not Found</h3>
                                <p className="text-yellow-800 mb-2">We couldn't find a registration with this ID number.</p>
                                <Link href="/register" className="text-purple-700 font-semibold hover:underline">
                                    Register as a new member &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                        An error occurred while checking. Please try again later.
                    </div>
                )}

                <div className="mt-8 pt-6 border-t text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">Return to Home</Link>
                </div>
            </div>
        </div>
    )
}
