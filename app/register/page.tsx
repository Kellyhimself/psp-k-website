'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    county: '',
    constituency: '',
    ward: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // TODO: Integrate with Supabase
    // For now, just simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        idNumber: '',
        county: '',
        constituency: '',
        ward: '',
      })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
            Register with PSP-K
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Become a part of the movement for a fair, just, and inclusive Kenya—register with
            PSP-K today!
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
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
            </div>

            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                County *
              </label>
              <input
                type="text"
                id="county"
                name="county"
                required
                value={formData.county}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="constituency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Constituency
              </label>
              <input
                type="text"
                id="constituency"
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                Ward
              </label>
              <input
                type="text"
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you for registering! We'll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                There was an error with your registration. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Register Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

