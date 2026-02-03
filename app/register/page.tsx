'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { kenyaLocations, religions, ethnicities } from '@/lib/data/kenya-locations'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '', // Will be used for "Other Names"
    lastName: '',  // Will be used for "Surname"
    // otherNames removed as requested
    email: '',
    phone: '',
    identityType: 'National ID',
    idNumber: '',
    dateOfBirth: '',
    gender: '', // Label will be "Sex"
    county: '',
    constituency: '',
    ward: '',
    isDisabled: false,
    pwdNumber: '',
    sig: [] as string[], // Special Interest Groups
    religion: '',
    ethnicity: '',
    notMemberOfOtherParty: false,
    consentToDataProcessing: false,
    consentToImageUse: false,
  })

  // Registration Form Status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Member Check Status
  const [checkId, setCheckId] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<{ found: boolean; message: string } | null>(null)

  // Derived state for constituencies based on selected county
  const availableConstituencies = useMemo(() => {
    const countyData = kenyaLocations.find(c => c.name === formData.county)
    return countyData ? countyData.constituencies : []
  }, [formData.county])

  const availableWards = useMemo(() => {
    if (!formData.constituency) return []
    // availableConstituencies is an array of objects now
    const constituency = availableConstituencies.find(c => c.name === formData.constituency)
    return constituency ? constituency.wards : []
  }, [formData.constituency, availableConstituencies])

  // Validation Logic
  const validateForm = () => {
    // 1. Declarations
    if (!formData.notMemberOfOtherParty || !formData.consentToDataProcessing) {
      return 'Please agree to all declarations to complete registration.'
    }

    // 2. Disability
    if (formData.isDisabled && !formData.pwdNumber) {
      return 'Please provide your NCPWD Registration Number.'
    }

    // 3. Age (18+)
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 18) {
        return 'You must be at least 18 years old to register as a member.'
      }
    }

    // 4. ID / Passport Format
    if (formData.identityType === 'National ID') {
      if (!/^\d{7,10}$/.test(formData.idNumber)) { // Kenyan IDs usually 7 or 8 digits, allowing range
        return 'National ID Number must be numeric (7-10 digits).'
      }
    } else if (formData.identityType === 'Passport') {
      if (formData.idNumber.length < 6) {
        return 'Passport Number seems too short.'
      }
    }

    // 5. Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.'
    }

    // 6. Phone Validation (Kenyan Format)
    // Accepts: +2547..., 2547..., 07..., 01...
    const phoneRegex = /^(?:\+254|254|0)((7|1)\d{8})$/
    if (!phoneRegex.test(formData.phone)) {
      return 'Please enter a valid Kenyan phone number (e.g., 0712345678).'
    }

    return null
  }

  const handleMemberCheck = async () => {
    if (!checkId) return
    setIsChecking(true)
    setCheckResult(null)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.rpc('check_membership_status', { check_id: checkId })
      if (error) throw error

      if (data && data.exists) {
        setCheckResult({ found: true, message: `Member Found: ${data.message}` })
      } else {
        setCheckResult({ found: false, message: 'Member Not Found. You may proceed with registration.' })
      }
    } catch (err) {
      console.error(err)
      setCheckResult({ found: false, message: 'Error checking status. Please try again.' })
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const validationError = validateForm()
    if (validationError) {
      setSubmitStatus('error')
      setErrorMessage(validationError)
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
        setErrorMessage('This Identity Number is already registered.')
        setIsSubmitting(false)
        return
      }

      // Insert registration
      const { data, error } = await supabase.from('registrations').insert([
        {
          first_name: formData.firstName, // Other Names (required by DB)
          last_name: formData.lastName,   // Surname
          other_names: formData.firstName, // Other Names (first + middle names)
          email: formData.email,
          phone: formData.phone,
          identity_type: formData.identityType,
          id_number: formData.idNumber,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          county: formData.county,
          constituency: formData.constituency,
          ward: formData.ward,
          disability_status: formData.isDisabled,
          pwd_number: formData.pwdNumber || null,
          special_interest_groups: formData.sig.length > 0 ? formData.sig : null, // New Field
          religion: formData.religion || null,
          ethnicity: formData.ethnicity || null,
          not_member_of_other_party: formData.notMemberOfOtherParty,
          consent_to_data_processing: formData.consentToDataProcessing,
          consent_to_image_use: formData.consentToImageUse,
        },
      ])

      if (error) {
        console.error('Registration error:', error)
        setSubmitStatus('error')
        setErrorMessage(error.message || 'There was an error submitting your registration.')
      } else {
        // Send email notification (Existing logic)
        try {
          fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              subject: 'New Member Registration',
              message: `New Member: ${formData.firstName} ${formData.lastName}\nID: ${formData.idNumber}\nType: ${formData.identityType}`,
            }),
          })
        } catch (e) { }

        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          identityType: 'National ID', idNumber: '', dateOfBirth: '',
          gender: '', county: '', constituency: '', ward: '',
          isDisabled: false, pwdNumber: '', sig: [], religion: '', ethnicity: '',
          notMemberOfOtherParty: false, consentToDataProcessing: false,
          consentToImageUse: false,
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred.')
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

    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      if (name === 'county') newData.constituency = ''
      return newData
    })
  }

  const handleSigChange = (category: string) => {
    setFormData(prev => {
      const currentSigs = prev.sig || []
      if (currentSigs.includes(category)) {
        return { ...prev, sig: currentSigs.filter(c => c !== category) }
      } else {
        return { ...prev, sig: [...currentSigs, category] }
      }
    })
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-900">
              Join PSP-K
            </h1>
            <p className="text-xl text-gray-600">
              Join the movement for a fair and just Kenya.
            </p>
          </div>

          {/* WARNING BANNER */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-10 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important: Single Party Membership Only</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    By law, you cannot belong to more than one political party at a time.
                    <strong> Please ensure you have resigned from any previous political party before proceeding.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK CHECK SECTION - NEW FEATURE */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Already a Member? Check Status</h3>
            <p className="text-sm text-blue-700 mb-4">
              Enter your National ID or Passport Number below to quickly check if you are already registered in our database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={checkId}
                onChange={(e) => setCheckId(e.target.value)}
                placeholder="Enter ID/Passport Number"
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
              />
              <button
                onClick={handleMemberCheck}
                disabled={isChecking || !checkId}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {isChecking ? 'Checking...' : 'Check Status'}
              </button>
            </div>
            {checkResult && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-4 p-3 rounded-lg ${checkResult.found ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                <strong>{checkResult.message}</strong>
              </div>
            )}
          </div>

          {/* Guide Section */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10 mb-12 border-l-4 border-purple-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Resign from Your Current Political Party</h2>
            {/* Keeps existing USSD/ORPP Content */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-purple-800 mb-3">Option A: Using USSD *509#</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
                  <li>Dial <strong>*509#</strong>.</li>
                  <li><strong>First Time?</strong> Enter ID & First Name to receive PIN.</li>
                  <li>Enter PIN and select <strong>“Membership”</strong>.</li>
                  <li>Select <strong>“Resign”</strong> to leave current party.</li>
                </ol>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-blue-800 mb-3">Option B: Online via ORPP Portal</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
                  <li>Visit <a href="https://ippms.orpp.or.ke" target="_blank" className="text-blue-600 hover:underline">ippms.orpp.or.ke</a>.</li>
                  <li>Navigate to <strong>“Membership Resignation”</strong>.</li>
                </ol>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-t pt-6">Step 2: Register as a Member (3 Options)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="font-bold text-lg text-purple-900 mb-3">Option A: Using USSD *509#</h3>
                <ol className="list-decimal pl-5 space-y-2 text-purple-900 text-sm">
                  <li>Dial <strong>*509#</strong> and Enter PIN.</li>
                  <li>Select <strong>“Membership”</strong> {'>'} <strong>“Join a party”</strong>.</li>
                  <li>Follow prompts to select your <strong>County</strong>, <strong>Constituency</strong>, and <strong>Ward</strong>.</li>
                  <li>Enter Party Code: <strong>000</strong>.</li>
                  <li>Confirm joining <strong>People Salvation Party of Kenya (PSP)</strong>.</li>
                </ol>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-lg text-blue-900 mb-3">Option B: Online via ORPP Portal</h3>
                <ol className="list-decimal pl-5 space-y-2 text-blue-900 text-sm">
                  <li>Log in to <a href="https://ippms.orpp.or.ke" target="_blank" className="underline">ippms.orpp.or.ke</a>.</li>
                  <li>Select <strong>“People Salvation Party of Kenya (PSP-K)”</strong>.</li>
                </ol>
              </div>
            </div>
          </div>


          {/* Option C: Direct Form */}
          <div id="online-form" className="bg-white rounded-xl shadow-lg p-8 md:p-10 space-y-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center border-b pb-4">Option C: Direct Website Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Section 1: Personal Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Surname *</label>
                    <input
                      type="text" id="lastName" name="lastName" required
                      value={formData.lastName} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900 bg-white placeholder:text-gray-500"
                      placeholder="e.g. Kamau"
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Other Names *</label>
                    <input
                      type="text" id="firstName" name="firstName" required
                      value={formData.firstName} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-gray-900 bg-white placeholder:text-gray-500"
                      placeholder="e.g. John Mwangi"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="identityType" className="block text-sm font-medium text-gray-700 mb-2">Identification Type *</label>
                    <select
                      id="identityType" name="identityType"
                      value={formData.identityType} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="National ID">National ID</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.identityType === 'Passport' ? 'Passport Number' : 'National ID Number'} *
                    </label>
                    <input
                      type="text" id="idNumber" name="idNumber" required
                      value={formData.idNumber} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date" id="dateOfBirth" name="dateOfBirth" required
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      value={formData.dateOfBirth} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
                    <select
                      id="gender" name="gender" required
                      value={formData.gender} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                    <select
                      id="religion" name="religion"
                      value={formData.religion} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select Religion</option>
                      {religions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
                    <select
                      id="ethnicity" name="ethnicity"
                      value={formData.ethnicity} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select Ethnicity</option>
                      {ethnicities.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Location */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact & Location</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel" id="phone" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">County *</label>
                    <select
                      id="county" name="county" required
                      value={formData.county} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="">Select County</option>
                      {kenyaLocations.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">Constituency *</label>
                    <select
                      id="constituency" name="constituency" required
                      value={formData.constituency} onChange={handleChange}
                      disabled={!formData.county}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white"
                    >
                      <option value="">Select {formData.county ? 'Constituency' : 'County First'}</option>
                      {availableConstituencies.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
                    {availableWards.length > 0 ? (
                      <select
                        id="ward" name="ward" required
                        value={formData.ward} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Select Ward</option>
                        {availableWards.map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text" id="ward" name="ward" required
                        value={formData.ward} onChange={handleChange}
                        placeholder={formData.constituency ? "Enter Ward Name" : "Select Constituency First"}
                        disabled={!formData.constituency}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 text-gray-900 bg-white placeholder:text-gray-500"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Additional Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Inclusive Support</h3>

                {/* SIG Checkboxes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Special Interest Groups (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['MARGINALIZED', 'MINORITY', 'WOMEN', 'YOUTH'].map((sig) => (
                      <label key={sig} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sig.includes(sig)}
                          onChange={() => handleSigChange(sig)}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-700 capitalize">{sig.toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      name="isDisabled"
                      checked={formData.isDisabled}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-800 font-medium">I am a Person with Disability (PWD)</span>
                  </label>

                  {formData.isDisabled && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 ml-8">
                      <label htmlFor="pwdNumber" className="block text-sm font-medium text-gray-700 mb-2">NCPWD Registration Number *</label>
                      <input
                        type="text" id="pwdNumber" name="pwdNumber" required={formData.isDisabled}
                        value={formData.pwdNumber} onChange={handleChange}
                        placeholder="e.g. NCPWD/123456"
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-900 bg-white placeholder:text-gray-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 4: Declarations */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Declarations</h3>

                <label className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox" name="notMemberOfOtherParty" required
                    checked={formData.notMemberOfOtherParty} onChange={handleChange}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm text-gray-700">
                    I confirm that I am not a member of any other political party and I have read the <Link href="/terms" className="text-purple-600 hover:underline font-medium" target="_blank">Terms of Service</Link>.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox" name="consentToDataProcessing" required
                    checked={formData.consentToDataProcessing} onChange={handleChange}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm text-gray-700">
                    <span>I explicitly consent to the collection and processing of my personal data for party membership purposes as described in the </span>
                    <Link href="/privacy" className="text-purple-600 hover:underline font-medium" target="_blank">Privacy Policy</Link>.
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox" name="consentToImageUse"
                    checked={formData.consentToImageUse} onChange={handleChange}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm text-gray-700">
                    <span>I consent to the use of my photograph/image by the party for official membership records, party communications, and promotional materials.</span>
                    <span className="text-gray-500 ml-1">(Optional)</span>
                  </div>
                </label>
              </div>

              {submitStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <div>
                    <strong className="font-bold block">Application Successful!</strong>
                    <span>Welcome to PSP-K. Your details have been submitted for verification.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-900 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
