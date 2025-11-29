'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    county: '',
    constituency: '',
    ward: '',
    physicalAddress: '',
    disabilityStatus: '',
    isKenyanCitizen: false,
    notMemberOfOtherParty: false,
    agreeToConstitution: false,
    consentToDataProcessing: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Client-side validation
    if (!formData.isKenyanCitizen || !formData.notMemberOfOtherParty || 
        !formData.agreeToConstitution || !formData.consentToDataProcessing) {
      setSubmitStatus('error')
      setErrorMessage('Please agree to all declarations to complete registration.')
      setIsSubmitting(false)
      return
    }

    // Validate age (must be 18+)
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 18) {
        setSubmitStatus('error')
        setErrorMessage('You must be at least 18 years old to register as a member.')
        setIsSubmitting(false)
        return
      }
    }

    // Validate National ID format (8-12 digits)
    if (!/^\d{8,12}$/.test(formData.idNumber)) {
      setSubmitStatus('error')
      setErrorMessage('National ID Number must be 8-12 digits.')
      setIsSubmitting(false)
      return
    }

    try {
      const supabase = createClient()

      // Check for duplicate registration by ID number
      const { data: existing } = await supabase
        .from('registrations')
        .select('id')
        .eq('id_number', formData.idNumber)
        .single()

      if (existing) {
        setSubmitStatus('error')
        setErrorMessage('This National ID number is already registered. Please contact us if you believe this is an error.')
        setIsSubmitting(false)
        return
      }

      // Insert registration
      const { data, error } = await supabase.from('registrations').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          id_number: formData.idNumber,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          county: formData.county,
          constituency: formData.constituency,
          ward: formData.ward,
          physical_address: formData.physicalAddress || null,
          disability_status: formData.disabilityStatus || null,
          is_kenyan_citizen: formData.isKenyanCitizen,
          not_member_of_other_party: formData.notMemberOfOtherParty,
          agree_to_constitution: formData.agreeToConstitution,
          consent_to_data_processing: formData.consentToDataProcessing,
        },
      ])

      if (error) {
        console.error('Registration error:', error)
        setSubmitStatus('error')
        setErrorMessage(
          error.code === '23505'
            ? 'This National ID number is already registered.'
            : 'There was an error submitting your registration. Please try again.'
        )
      } else {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          idNumber: '',
          dateOfBirth: '',
          gender: '',
          county: '',
          constituency: '',
          ward: '',
          physicalAddress: '',
          disabilityStatus: '',
          isKenyanCitizen: false,
          notMemberOfOtherParty: false,
          agreeToConstitution: false,
          consentToDataProcessing: false,
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    const name = target.name

    setFormData({
      ...formData,
      [name]: value,
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
                pattern="[0-9]{8,12}"
                maxLength={12}
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="Enter your National ID number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for membership verification with IEBC
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth * (Must be 18+)
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                    .toISOString()
                    .split('T')[0]}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Required for gender balance reporting</p>
              </div>
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
                Constituency *
              </label>
              <input
                type="text"
                id="constituency"
                name="constituency"
                required
                value={formData.constituency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                Ward *
              </label>
              <input
                type="text"
                id="ward"
                name="ward"
                required
                value={formData.ward}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="physicalAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Physical Address
              </label>
              <textarea
                id="physicalAddress"
                name="physicalAddress"
                rows={3}
                value={formData.physicalAddress}
                onChange={handleChange}
                placeholder="Enter your physical address (optional but recommended)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="disabilityStatus"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Disability Status (Optional)
              </label>
              <select
                id="disabilityStatus"
                name="disabilityStatus"
                value={formData.disabilityStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="">Select if applicable</option>
                <option value="none">None</option>
                <option value="physical">Physical Disability</option>
                <option value="visual">Visual Impairment</option>
                <option value="hearing">Hearing Impairment</option>
                <option value="intellectual">Intellectual Disability</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Helps us ensure inclusivity for marginalized groups
              </p>
            </div>

            {/* Membership Declarations */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Membership Declarations *
              </h3>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="isKenyanCitizen"
                  required
                  checked={formData.isKenyanCitizen}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I confirm that I am a Kenyan citizen *
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="notMemberOfOtherParty"
                  required
                  checked={formData.notMemberOfOtherParty}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I confirm that I am not a member of any other political party *
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToConstitution"
                  required
                  checked={formData.agreeToConstitution}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to abide by the PSP-K constitution and code of conduct *
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="consentToDataProcessing"
                  required
                  checked={formData.consentToDataProcessing}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I consent to the processing of my personal data for party membership purposes. I
                  have read and agree to the{' '}
                  <a href="/privacy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  *
                </span>
              </label>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you for registering! We'll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage || 'There was an error with your registration. Please try again.'}
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

