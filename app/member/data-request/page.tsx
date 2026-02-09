'use client'

import { useState } from 'react'

type RequestType = 'correction' | 'deletion' | 'resignation'
type Step = 'select' | 'email' | 'otp' | 'details' | 'confirm' | 'success'

export default function DataRequestPage() {
  const [requestType, setRequestType] = useState<RequestType>('correction')
  const [step, setStep] = useState<Step>('select')
  const [email, setEmail] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [reason, setReason] = useState('')
  const [correctionDetails, setCorrectionDetails] = useState('')

  // Loading states
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Error and result states
  const [error, setError] = useState('')
  const [memberData, setMemberData] = useState<{ name: string; registered_at: string } | null>(null)

  // Step 1: Check if email and ID are registered and send OTP
  const handleSendOtp = async () => {
    if (!email || !idNumber) return
    setIsSendingOtp(true)
    setError('')

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          idNumber: idNumber.trim(),
          actionType: requestType
        })
      })

      const data = await response.json()

      if (data.success) {
        setMemberData({
          name: data.memberName,
          registered_at: data.registeredAt
        })
        setStep('otp')
      } else {
        setError(data.message || 'Failed to send verification code.')
      }
    } catch (err) {
      console.error('OTP request error:', err)
      setError('Error sending verification code. Please try again later.')
    } finally {
      setIsSendingOtp(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) return
    setIsVerifyingOtp(true)
    setError('')

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
          actionType: requestType
        })
      })

      const data = await response.json()

      if (data.verified) {
        // For resignation, go directly to confirm
        if (requestType === 'resignation') {
          setStep('confirm')
        } else {
          // For correction/deletion, collect more details
          setStep('details')
        }
      } else {
        setError(data.message || 'Invalid or expired verification code.')
      }
    } catch (err) {
      console.error('OTP verification error:', err)
      setError('Error verifying code. Please try again.')
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  // Step 3: Process the request
  const handleProcessRequest = async () => {
    setIsProcessing(true)
    setError('')

    try {
      if (requestType === 'resignation') {
        // Automated resignation
        const response = await fetch('/api/process-resignation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            reason: reason || null
          })
        })

        const data = await response.json()

        if (data.success) {
          setStep('success')
        } else {
          setError(data.message || 'Failed to process resignation.')
        }
      } else {
        // For correction/deletion, create a request record
        const response = await fetch('/api/data-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            requestType: requestType,
            reason: reason || null,
            details: correctionDetails || null
          })
        })

        const data = await response.json()

        if (data.success) {
          setStep('success')
        } else {
          setError(data.message || 'Failed to submit request.')
        }
      }
    } catch (err) {
      console.error('Process request error:', err)
      setError('Error processing your request. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setStep('select')
    setEmail('')
    setIdNumber('')
    setOtp('')
    setReason('')
    setCorrectionDetails('')
    setError('')
    setMemberData(null)
  }

  // Success screen
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className={`w-16 h-16 ${requestType === 'resignation' ? 'bg-gray-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <svg className={`w-8 h-8 ${requestType === 'resignation' ? 'text-gray-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          {requestType === 'resignation' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Resignation Complete</h2>
              <p className="text-gray-600 mb-6">
                Your membership with PSP-K has been terminated. Your data has been removed from our records.
                Thank you for your time with us, and we wish you well.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h2>
              <p className="text-gray-600 mb-6">
                We have received your {requestType === 'correction' ? 'data correction' : 'data deletion'} request.
                Our Data Protection Officer will process your request within 14 days.
              </p>
            </>
          )}
          <button onClick={resetForm} className="text-purple-600 font-medium hover:underline">
            Return to start
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Subject Request</h1>
        <p className="text-gray-600 mb-8">
          Exercise your rights under the Data Protection Act. Verification required for all requests.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center mb-8">
          {['select', 'email', 'otp', requestType === 'resignation' ? 'confirm' : 'details'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s ? 'bg-purple-600 text-white' :
                ['select', 'email', 'otp', 'details', 'confirm'].indexOf(step) > ['select', 'email', 'otp', 'details', 'confirm'].indexOf(s)
                  ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i + 1}
              </div>
              {i < 3 && <div className={`w-12 h-1 ${['select', 'email', 'otp', 'details', 'confirm'].indexOf(step) > i ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Request Type */}
        {step === 'select' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I want to...</label>
              <div className="grid md:grid-cols-3 gap-4">
                <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'correction' ? 'ring-2 ring-purple-600 bg-purple-50 border-purple-600' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="type" value="correction" checked={requestType === 'correction'} onChange={(e) => setRequestType(e.target.value as RequestType)} className="sr-only" />
                  <span className="font-semibold block text-gray-900">Correct My Data</span>
                  <span className="text-xs text-gray-500">Update errors in your registration</span>
                </label>
                <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'deletion' ? 'ring-2 ring-red-600 bg-red-50 border-red-600' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="type" value="deletion" checked={requestType === 'deletion'} onChange={(e) => setRequestType(e.target.value as RequestType)} className="sr-only" />
                  <span className="font-semibold block text-gray-900">Delete My Data</span>
                  <span className="text-xs text-gray-500">Remove your records permanently</span>
                </label>
                <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'resignation' ? 'ring-2 ring-gray-600 bg-gray-100 border-gray-600' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="type" value="resignation" checked={requestType === 'resignation'} onChange={(e) => setRequestType(e.target.value as RequestType)} className="sr-only" />
                  <span className="font-semibold block text-gray-900">Resign from Party</span>
                  <span className="text-xs text-gray-500">Immediate automated withdrawal</span>
                </label>
              </div>
            </div>

            {requestType === 'resignation' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Resignation is processed automatically and immediately upon verification.
                  Your membership record will be permanently deleted. This action cannot be undone.
                </p>
              </div>
            )}

            <button
              onClick={() => setStep('email')}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Enter Email and ID */}
        {step === 'email' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Registered Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your ID/Passport Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter your ID number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              We will send a verification code to your email to confirm your identity.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => { setStep('select'); setError(''); }}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Back
              </button>
              <button
                onClick={handleSendOtp}
                disabled={isSendingOtp || !email || !idNumber}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isSendingOtp ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Enter OTP */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                A verification code has been sent to <strong>{email}</strong>.
                {memberData && <span> Hello, {memberData.name}!</span>}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-center text-2xl tracking-widest"
              />
            </div>

            <div className="flex justify-between text-sm">
              <button onClick={() => { setStep('email'); setOtp(''); setError(''); }} className="text-purple-600 hover:underline">
                Change email
              </button>
              <button onClick={handleSendOtp} disabled={isSendingOtp} className="text-purple-600 hover:underline disabled:opacity-50">
                Resend code
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp || otp.length !== 6}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isVerifyingOtp ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </div>
        )}

        {/* Step 4a: Details for Correction/Deletion */}
        {step === 'details' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Identity verified. Please provide details for your {requestType === 'correction' ? 'data correction' : 'data deletion'} request.
              </p>
            </div>

            {requestType === 'correction' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What needs to be corrected?</label>
                <textarea
                  value={correctionDetails}
                  onChange={(e) => setCorrectionDetails(e.target.value)}
                  rows={4}
                  placeholder="Please describe what information is incorrect and what it should be changed to..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Request {requestType === 'deletion' ? '' : '(Optional)'}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder={requestType === 'deletion' ? 'Please explain why you want your data deleted...' : 'Any additional information...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleProcessRequest}
              disabled={isProcessing || (requestType === 'correction' && !correctionDetails)}
              className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 ${
                requestType === 'deletion' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isProcessing ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        )}

        {/* Step 4b: Confirmation for Resignation */}
        {step === 'confirm' && requestType === 'resignation' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-2">Confirm Resignation</h3>
              <p className="text-red-700 mb-4">
                You are about to resign from the People Salvation Party of Kenya (PSP-K).
                This action is <strong>immediate and irreversible</strong>.
              </p>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Your membership record will be permanently deleted</li>
                <li>You will no longer be affiliated with PSP-K</li>
                <li>You can re-register in the future if you wish to rejoin</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Resignation (Optional)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Help us improve - why are you leaving?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessRequest}
                disabled={isProcessing}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm Resignation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
