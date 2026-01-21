'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import QRCode from 'qrcode'
import Image from 'next/image'

export default function SecuritySettings() {
    const [factors, setFactors] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEnrolling, setIsEnrolling] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [factorId, setFactorId] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    useEffect(() => {
        fetchFactors()
    }, [])

    async function fetchFactors() {
        const supabase = createClient()
        const { data, error } = await supabase.auth.mfa.listFactors()
        if (error) {
            console.error('Error listing factors:', error)
        } else {
            setFactors(data.all || [])
        }
        setIsLoading(false)
    }

    async function startEnrollment() {
        setIsEnrolling(true)
        setError('')
        setSuccessMsg('')
        const supabase = createClient()
        const { data, error } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
        })

        if (error) {
            setError(error.message)
            setIsEnrolling(false)
            return
        }

        setFactorId(data.id)

        // Generate QR Code
        try {
            const url = await QRCode.toDataURL(data.totp.uri)
            setQrCodeUrl(url)
        } catch (err) {
            console.error('Error generating QR code', err)
            setError('Failed to generate QR code')
        }
    }

    async function verifyEnrollment() {
        setError('')
        const supabase = createClient()
        const { data, error } = await supabase.auth.mfa.challengeAndVerify({
            factorId,
            code: verifyCode,
        })

        if (error) {
            setError(error.message)
            return
        }

        setSuccessMsg('Two-factor authentication enabled successfully!')
        setIsEnrolling(false)
        setQrCodeUrl('')
        setVerifyCode('')
        fetchFactors() // Refresh list
    }

    async function unenroll(id: string) {
        if (!confirm('Are you sure you want to disable 2FA? This will lower your account security.')) return

        const supabase = createClient()
        const { error } = await supabase.auth.mfa.unenroll({ factorId: id })

        if (error) {
            setError(error.message)
        } else {
            setSuccessMsg('Two-factor authentication disabled.')
            fetchFactors()
        }
    }

    if (isLoading) return <div className="text-gray-500">Loading security settings...</div>

    const hasVerifiedFactor = factors.some(f => f.status === 'verified')

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    {successMsg}
                </div>
            )}

            <div className="border-t border-gray-100 py-4">
                <h3 className="font-semibold text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>

                {hasVerifiedFactor ? (
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="flex items-center">
                            <span className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                            <div>
                                <p className="font-medium text-green-900">2FA is Enabled</p>
                                <p className="text-sm text-green-700">Your account is secured with TOTP.</p>
                            </div>
                        </div>
                        {factors.map(f => (
                            f.status === 'verified' && (
                                <button
                                    key={f.id}
                                    onClick={() => unenroll(f.id)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                                >
                                    Disable
                                </button>
                            )
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600 mb-4">
                            Protect your admin account by requiring a code from an authenticator app (like Google Authenticator) in addition to your password.
                        </p>

                        {!isEnrolling ? (
                            <button
                                onClick={startEnrollment}
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                            >
                                Enable 2FA
                            </button>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4">Setup Authenticator App</h4>

                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="text-center">
                                        {qrCodeUrl && (
                                            <div className="bg-white p-2 inline-block rounded shadow-sm">
                                                <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} />
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-500 mt-2">Scan with your authenticator app</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Enter Code from App
                                            </label>
                                            <input
                                                type="text"
                                                value={verifyCode}
                                                onChange={(e) => setVerifyCode(e.target.value)}
                                                placeholder="123456"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg tracking-widest"
                                            />
                                        </div>

                                        <button
                                            onClick={verifyEnrollment}
                                            className="w-full bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition"
                                        >
                                            Verify & Activate
                                        </button>

                                        <button
                                            onClick={() => setIsEnrolling(false)}
                                            className="w-full text-gray-600 hover:text-gray-900 text-sm mt-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
