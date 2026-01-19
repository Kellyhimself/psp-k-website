'use client'

import { useState } from 'react'

export default function DataRequestPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    idNumber: '',
    requestType: 'access',
    details: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const subject = `Data Rights Request (${formData.requestType.toUpperCase()})`
      const messageLines = [
        `A new data protection request has been submitted via the PSP-K website.`,
        '',
        `Full Name: ${formData.fullName}`,
        `Email: ${formData.email}`,
        `National ID Number: ${formData.idNumber}`,
        `Request Type: ${formData.requestType}`,
        '',
        'Details / Instructions from the member:',
        formData.details,
      ]

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: '',
          subject,
          message: messageLines.join('\n'),
          formType: 'data_request',
        }),
      })

      if (!emailResponse.ok) {
        setSubmitStatus('error')
        setErrorMessage('There was an error submitting your request. Please try again.')
        setIsSubmitting(false)
        return
      }

      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        idNumber: '',
        requestType: 'access',
        details: '',
      })
    } catch {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">
            Data Rights Request
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Use this form to request access to your data, correct your details, or ask for
            deletion of your party membership information, in line with the Data Protection Act,
            2019.
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name (as registered) *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address (used during registration) *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                National ID Number *
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                required
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                This helps us locate your membership record securely.
              </p>
            </div>

            <div>
              <label
                htmlFor="requestType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Type of Request *
              </label>
              <select
                id="requestType"
                name="requestType"
                required
                value={formData.requestType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="access">Access my data</option>
                <option value="correction">Correct my details</option>
                <option value="deletion">Delete my membership record</option>
                <option value="other">Other data protection request</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Details of your request *
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={5}
                value={formData.details}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                For corrections, specify what should be updated. For deletion, you may tell us why
                you wish to be removed from the register.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you. Your request has been submitted. Our team will review it and contact you
                via email.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage ||
                  'There was an error submitting your request. Please try again.'}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
