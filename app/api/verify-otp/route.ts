import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create admin Supabase client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp, actionType } = body

    // Validate inputs
    if (!email || !otp || !actionType) {
      return NextResponse.json(
        { verified: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find valid OTP
    const { data: otpRecord, error: otpError } = await supabaseAdmin
      .from('otp_codes')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .eq('code', otp.trim())
      .eq('action_type', actionType)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (otpError || !otpRecord) {
      return NextResponse.json({
        verified: false,
        message: 'Invalid or expired verification code. Please request a new one.'
      })
    }

    // Mark OTP as used
    await supabaseAdmin
      .from('otp_codes')
      .update({ used: true })
      .eq('id', otpRecord.id)

    // Get member details for membership check
    if (actionType === 'membership_check') {
      const { data: member } = await supabaseAdmin
        .from('registrations')
        .select('created_at, verification_status, membership_number, first_name, last_name')
        .eq('email', email.trim().toLowerCase())
        .single()

      return NextResponse.json({
        verified: true,
        message: 'Verified successfully',
        registeredAt: member?.created_at,
        verificationStatus: member?.verification_status || 'pending',
        membershipNumber: member?.membership_number,
        memberName: member ? `${member.first_name} ${member.last_name}` : null
      })
    }

    return NextResponse.json({
      verified: true,
      message: 'Verified successfully'
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { verified: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
