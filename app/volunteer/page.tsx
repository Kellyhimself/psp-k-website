'use client'

import { useState } from 'react'

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // TODO: Integrate with Supabase
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: '',
      })
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
            Join as Volunteer
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Lend your skills and passion to make a difference—volunteer with PSP-K and help shape
            Kenya's future!
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
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
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                Skills & Interests
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Event planning, Social media, Community organizing"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="">Select availability</option>
                <option value="weekends">Weekends only</option>
                <option value="weekdays">Weekdays only</option>
                <option value="flexible">Flexible</option>
                <option value="full-time">Full-time</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to volunteer? *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you for your interest! We'll contact you soon about volunteer opportunities.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                There was an error submitting your application. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

