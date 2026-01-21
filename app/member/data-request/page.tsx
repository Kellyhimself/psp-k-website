'use client'

import { useState } from 'react'

export default function DataRequestPage() {
  const [requestType, setRequestType] = useState('correction')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission logic
    // In a real app, this would upload the file to Supabase Storage and create a record in a 'requests' table
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h2>
          <p className="text-gray-600 mb-6">We have received your request. Our Data Protection Officer will review your documents and process your request within 14 days.</p>
          <button onClick={() => window.location.reload()} className="text-purple-600 font-medium hover:underline">Submit another request</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Subject Request</h1>
        <p className="text-gray-600 mb-8">
          Use this form to exercise your rights under the Data Protection Act, including data correction, deletion, or resignation from the party.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I want to...</label>
            <div className="grid md:grid-cols-3 gap-4">
              <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'correction' ? 'ring-2 ring-purple-600 bg-purple-50 border-purple-600' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="type" value="correction" checked={requestType === 'correction'} onChange={(e) => setRequestType(e.target.value)} className="sr-only" />
                <span className="font-semibold block text-gray-900">Correct My Data</span>
                <span className="text-xs text-gray-500">Update errors in your registration</span>
              </label>
              <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'deletion' ? 'ring-2 ring-red-600 bg-red-50 border-red-600' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="type" value="deletion" checked={requestType === 'deletion'} onChange={(e) => setRequestType(e.target.value)} className="sr-only" />
                <span className="font-semibold block text-gray-900">Delete My Data</span>
                <span className="text-xs text-gray-500">Remove your records permanently</span>
              </label>
              <label className={`border rounded-lg p-4 cursor-pointer transition-all ${requestType === 'resignation' ? 'ring-2 ring-gray-600 bg-gray-100 border-gray-600' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="type" value="resignation" checked={requestType === 'resignation'} onChange={(e) => setRequestType(e.target.value)} className="sr-only" />
                <span className="font-semibold block text-gray-900">Resign from Party</span>
                <span className="text-xs text-gray-500">Formal withdrawal of membership</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Request (Optional)</label>
            <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"></textarea>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2">Proof of Request Required</h3>
            <p className="text-sm text-blue-800 mb-4">
              To prevent identity fraud, you must upload a signed letter or a copy of your ID card as proof of this request.
              {requestType === 'resignation' && <strong> For resignation, a signed resignation letter is mandatory.</strong>}
            </p>
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input type="file" required className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200
                    "/>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 ${requestType === 'deletion' || requestType === 'resignation' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {isSubmitting ? 'Submitting...' : `Submit ${requestType === 'resignation' ? 'Resignation' : 'Request'}`}
          </button>
        </form>
      </div>
    </div>
  )
}
