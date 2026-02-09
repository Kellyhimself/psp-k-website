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

  // Member Check Status - OTP Based
  const [checkEmail, setCheckEmail] = useState('')
  const [checkIdNumber, setCheckIdNumber] = useState('')
  const [checkOtp, setCheckOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [checkResult, setCheckResult] = useState<{ found: boolean; message: string } | null>(null)
  const [checkError, setCheckError] = useState('')

  // Sorted counties list
  const sortedCounties = useMemo(() => {
    return [...kenyaLocations].sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  // Derived state for constituencies based on selected county (sorted alphabetically)
  const availableConstituencies = useMemo(() => {
    const countyData = kenyaLocations.find(c => c.name === formData.county)
    if (!countyData) return []
    return [...countyData.constituencies].sort((a, b) => a.name.localeCompare(b.name))
  }, [formData.county])

  // Sorted wards based on selected constituency
  const availableWards = useMemo(() => {
    if (!formData.constituency) return []
    const constituency = availableConstituencies.find(c => c.name === formData.constituency)
    if (!constituency) return []
    return [...constituency.wards].sort((a, b) => a.localeCompare(b))
  }, [formData.constituency, availableConstituencies])

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    if (!dob) return 0
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const userAge = useMemo(() => calculateAge(formData.dateOfBirth), [formData.dateOfBirth])

  // Validation Logic
  const validateForm = () => {
    // 1. Name validation - no numbers allowed
    const nameRegex = /^[a-zA-Z\s'-]+$/
    if (!nameRegex.test(formData.lastName)) {
      return 'Surname should only contain letters, spaces, hyphens, or apostrophes.'
    }
    if (!nameRegex.test(formData.firstName)) {
      return 'Other Names should only contain letters, spaces, hyphens, or apostrophes.'
    }

    // 2. Declarations
    if (!formData.notMemberOfOtherParty || !formData.consentToDataProcessing) {
      return 'Please agree to all declarations to complete registration.'
    }

    // 3. Disability
    if (formData.isDisabled && !formData.pwdNumber) {
      return 'Please provide your NCPWD Registration Number.'
    }

    // 4. Age (18+)
    if (formData.dateOfBirth) {
      if (userAge < 18) {
        return 'You must be at least 18 years old to register as a member.'
      }
    }

    // 5. ID / Passport Format
    if (formData.identityType === 'National ID') {
      if (!/^\d{7,10}$/.test(formData.idNumber)) {
        return 'National ID Number must be numeric (7-10 digits).'
      }
    } else if (formData.identityType === 'Passport') {
      if (!/^[A-Z0-9]{6,9}$/i.test(formData.idNumber)) {
        return 'Passport Number must be 6-9 alphanumeric characters.'
      }
    }

    // 6. Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.'
    }

    // 7. Phone Validation (Kenyan Format)
    const phoneRegex = /^(?:\+254|254|0)((7|1)\d{8})$/
    if (!phoneRegex.test(formData.phone)) {
      return 'Please enter a valid Kenyan phone number (e.g., 0712345678).'
    }

    // 8. SIG validation - check for invalid selections
    if (formData.sig.includes('WOMEN') && formData.gender === 'Male') {
      return 'Women SIG is only available for female members.'
    }
    if (formData.sig.includes('YOUTH') && userAge > 35) {
      return 'Youth SIG is only available for members aged 35 and below.'
    }

    return null
  }

  // Request OTP for membership check
  const handleRequestOtp = async () => {
    if (!checkEmail || !checkIdNumber) return
    setIsSendingOtp(true)
    setCheckError('')
    setCheckResult(null)

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: checkEmail.trim().toLowerCase(),
          idNumber: checkIdNumber.trim(),
          actionType: 'membership_check'
        })
      })

      const data = await response.json()

      if (data.success) {
        setOtpSent(true)
        setCheckError('')
      } else if (data.found === false) {
        // Email/ID not found or mismatch
        setCheckResult({ found: false, message: data.message || 'No matching record found. You may proceed with registration.' })
      } else {
        setCheckError(data.message || 'Failed to send verification code. Please try again.')
      }
    } catch (err) {
      console.error('OTP request error:', err)
      setCheckError('Error sending verification code. Please try again later.')
    } finally {
      setIsSendingOtp(false)
    }
  }

  // Verify OTP and check membership
  const handleVerifyOtp = async () => {
    if (!checkEmail || !checkOtp) return
    setIsVerifyingOtp(true)
    setCheckError('')

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: checkEmail.trim().toLowerCase(),
          otp: checkOtp.trim(),
          actionType: 'membership_check'
        })
      })

      const data = await response.json()

      if (data.verified) {
        setOtpVerified(true)

        // Check verification status
        if (data.verificationStatus === 'approved') {
          setCheckResult({
            found: true,
            message: `You are a verified PSP-K member!\n\nMembership Number: ${data.membershipNumber || 'N/A'}\nMember since: ${data.registeredAt ? new Date(data.registeredAt).toLocaleDateString() : 'N/A'}`
          })
        } else if (data.verificationStatus === 'pending' || !data.verificationStatus) {
          setCheckResult({
            found: true,
            message: `Your registration is pending verification.\n\nYour application was submitted on ${data.registeredAt ? new Date(data.registeredAt).toLocaleDateString() : 'N/A'} and is currently under review. You will receive an email once your membership is approved.`
          })
        } else if (data.verificationStatus === 'rejected') {
          setCheckResult({
            found: false,
            message: `Your previous application was not approved. Please contact us at info@psp-kenya.com for more information, or you may submit a new registration.`
          })
        }
      } else {
        setCheckError(data.message || 'Invalid or expired verification code. Please try again.')
      }
    } catch (err) {
      console.error('OTP verification error:', err)
      setCheckError('Error verifying code. Please try again later.')
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  // Reset membership check form
  const resetMemberCheck = () => {
    setCheckEmail('')
    setCheckIdNumber('')
    setCheckOtp('')
    setOtpSent(false)
    setOtpVerified(false)
    setCheckResult(null)
    setCheckError('')
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

      // Check for duplicate registration by ID number (use maybeSingle to avoid errors when not found)
      const { data: existingId } = await supabase
        .from('registrations')
        .select('id')
        .eq('id_number', formData.idNumber)
        .maybeSingle()

      if (existingId) {
        setSubmitStatus('error')
        setErrorMessage('This Identity Number is already registered. If you have already registered, please use the membership status check above.')
        setIsSubmitting(false)
        return
      }

      // Check for duplicate registration by email
      const { data: existingEmail } = await supabase
        .from('registrations')
        .select('id')
        .eq('email', formData.email.trim().toLowerCase())
        .maybeSingle()

      if (existingEmail) {
        setSubmitStatus('error')
        setErrorMessage('This email address is already registered. If you have already registered, please use the membership status check above.')
        setIsSubmitting(false)
        return
      }

      // Insert registration
      const { data, error } = await supabase.from('registrations').insert([
        {
          first_name: formData.firstName, // Other Names (required by DB)
          last_name: formData.lastName,   // Surname
          other_names: formData.firstName, // Other Names (first + middle names)
          email: formData.email.trim().toLowerCase(),
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
          verification_status: 'pending',
        },
      ])

      if (error) {
        console.error('Registration error:', error)
        setSubmitStatus('error')

        // Handle specific database constraint errors with user-friendly messages
        const errorMessage = error.message || ''
        if (errorMessage.includes('registrations_id_number_key') || errorMessage.includes('duplicate') && errorMessage.includes('id_number')) {
          setErrorMessage('This Identity Number is already registered. If you have already registered, please use the membership status check above.')
        } else if (errorMessage.includes('registrations_email_key') || errorMessage.includes('duplicate') && errorMessage.includes('email')) {
          setErrorMessage('This email address is already registered. If you have already registered, please use the membership status check above.')
        } else {
          setErrorMessage(error.message || 'There was an error submitting your registration.')
        }
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

      // Auto-remove invalid SIG selections when gender changes
      if (name === 'gender' && value === 'Male') {
        newData.sig = newData.sig.filter(s => s !== 'WOMEN')
      }

      // Auto-remove YOUTH SIG if date of birth indicates age > 35
      if (name === 'dateOfBirth' && value) {
        const birthDate = new Date(value as string)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        if (age > 35) {
          newData.sig = newData.sig.filter(s => s !== 'YOUTH')
        }
      }

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

          {/* QUICK CHECK SECTION - OTP BASED VERIFICATION */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Already a Member? Check Your Status</h3>
            <p className="text-sm text-blue-700 mb-4">
              Enter your registered email and ID number. We will send a verification code to confirm your identity.
            </p>

            {!otpSent && !checkResult ? (
              /* Step 1: Enter Email and ID */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    value={checkEmail}
                    onChange={(e) => setCheckEmail(e.target.value)}
                    placeholder="Your registered email"
                    className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
                  />
                  <input
                    type="text"
                    value={checkIdNumber}
                    onChange={(e) => setCheckIdNumber(e.target.value)}
                    placeholder="Your ID/Passport number"
                    className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
                  />
                </div>
                <button
                  onClick={handleRequestOtp}
                  disabled={isSendingOtp || !checkEmail || !checkIdNumber}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingOtp ? 'Sending...' : 'Send Verification Code'}
                </button>
                {checkError && (
                  <p className="text-sm text-red-600">{checkError}</p>
                )}
              </div>
            ) : otpSent && !otpVerified ? (
              /* Step 2: Enter OTP */
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    A verification code has been sent to <strong>{checkEmail}</strong>. Please check your inbox and enter the code below.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={checkOtp}
                    onChange={(e) => setCheckOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500 text-center text-xl tracking-widest"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || checkOtp.length !== 6}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <button
                    onClick={resetMemberCheck}
                    className="text-blue-600 hover:underline"
                  >
                    Use a different email
                  </button>
                  <button
                    onClick={handleRequestOtp}
                    disabled={isSendingOtp}
                    className="text-blue-600 hover:underline disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </div>
                {checkError && (
                  <p className="text-sm text-red-600">{checkError}</p>
                )}
              </div>
            ) : null}

            {/* Result display */}
            {checkResult && (
              <div className="space-y-4">
                {/* Approved Member - Green */}
                {checkResult.found && checkResult.message.includes('verified PSP-K member') && (
                  <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-green-800 font-bold">Verified Member</h4>
                        <p className="text-green-700 text-sm mt-1 whitespace-pre-line">{checkResult.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pending Status - Amber */}
                {checkResult.found && checkResult.message.includes('pending verification') && (
                  <div role="status" aria-live="polite" className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-amber-800 font-bold">Registration Pending</h4>
                        <p className="text-amber-700 text-sm mt-1 whitespace-pre-line">{checkResult.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rejected - Red/Gray */}
                {!checkResult.found && checkResult.message.includes('not approved') && (
                  <div role="status" aria-live="polite" className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-gray-800 font-bold">Application Status</h4>
                        <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{checkResult.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Not Found - Guide to Register */}
                {!checkResult.found && !checkResult.message.includes('not approved') && (
                  <div role="status" aria-live="polite" className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-blue-800 font-bold">No Membership Record Found</h4>
                        <p className="text-blue-700 text-sm mt-2">
                          We couldn't find a membership record matching those details.
                        </p>
                        <div className="mt-3 space-y-2 text-sm text-blue-700">
                          <p className="flex items-start">
                            <span className="font-semibold mr-2">New to PSP-K?</span>
                            Please scroll down and complete the registration form to become a member.
                          </p>
                          <p className="flex items-start">
                            <span className="font-semibold mr-2">Already registered?</span>
                            Double-check your email address and ID/Passport number are entered correctly.
                          </p>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={resetMemberCheck}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Check another email
                </button>
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
                      {sortedCounties.map(c => (
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

                {/* SIG Checkboxes - with eligibility rules */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Special Interest Groups (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'MARGINALIZED', label: 'Marginalized', disabled: false, reason: '' },
                      { id: 'MINORITY', label: 'Minority', disabled: false, reason: '' },
                      { id: 'WOMEN', label: 'Women', disabled: formData.gender === 'Male', reason: 'Available for female members only' },
                      { id: 'YOUTH', label: 'Youth (18-35)', disabled: userAge > 35, reason: 'Available for members aged 35 and below' },
                    ].map((sig) => (
                      <label
                        key={sig.id}
                        className={`flex items-center space-x-3 ${sig.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        title={sig.disabled ? sig.reason : ''}
                      >
                        <input
                          type="checkbox"
                          checked={formData.sig.includes(sig.id)}
                          onChange={() => !sig.disabled && handleSigChange(sig.id)}
                          disabled={sig.disabled}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                        />
                        <span className={`text-gray-700 ${sig.disabled ? 'line-through' : ''}`}>
                          {sig.label}
                          {sig.disabled && <span className="text-xs text-gray-500 ml-1">({sig.reason})</span>}
                        </span>
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
                  className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 mb-2">Registration Submitted Successfully</h3>
                  <p className="text-amber-700 mb-4">
                    Your membership application is now <strong>pending verification</strong>.
                  </p>
                  <div className="bg-white rounded-lg p-4 text-left text-sm text-gray-700 space-y-2">
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      <span>Our team will review your application within <strong>7-14 working days</strong>.</span>
                    </p>
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span>You will receive an email notification once your membership is approved.</span>
                    </p>
                    <p className="flex items-start">
                      <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd"/>
                      </svg>
                      <span>Upon approval, you will receive your unique <strong>PSP-K Membership Number</strong>.</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Questions? Contact us at <a href="mailto:info@psp-kenya.com" className="text-purple-600 hover:underline">info@psp-kenya.com</a>
                  </p>
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
