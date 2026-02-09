import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create admin Supabase client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, idNumber, actionType } = body

    // Validate inputs
    if (!email || !idNumber || !actionType) {
      return NextResponse.json(
        { success: false, message: 'Email and ID number are required' },
        { status: 400 }
      )
    }

    // Validate action type
    const validActions = ['membership_check', 'correction', 'deletion', 'resignation']
    if (!validActions.includes(actionType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action type' },
        { status: 400 }
      )
    }

    // Check if email AND ID number match in registrations
    const { data: member, error: memberError } = await supabaseAdmin
      .from('registrations')
      .select('id, first_name, last_name, email, id_number, created_at')
      .eq('email', email.trim().toLowerCase())
      .eq('id_number', idNumber.trim())
      .single()

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        found: false,
        message: 'No membership record found with these details. If you haven\'t registered yet, please complete the registration form below. If you believe you are already registered, please double-check your email and ID number.'
      })
    }

    // Delete any existing unused OTPs for this email/action
    await supabaseAdmin
      .from('otp_codes')
      .delete()
      .eq('email', email.trim().toLowerCase())
      .eq('action_type', actionType)
      .eq('used', false)

    // Generate new OTP
    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

    // Store OTP in database
    const { error: insertError } = await supabaseAdmin
      .from('otp_codes')
      .insert({
        email: email.trim().toLowerCase(),
        code: otpCode,
        action_type: actionType,
        expires_at: expiresAt,
        used: false
      })

    if (insertError) {
      console.error('OTP insert error:', insertError)
      return NextResponse.json(
        { success: false, message: 'Failed to generate verification code' },
        { status: 500 }
      )
    }

    // Send OTP email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      )
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'PSP-K <onboarding@resend.dev>'

    // Determine email subject based on action
    const actionLabels: Record<string, string> = {
      membership_check: 'Membership Status Verification',
      correction: 'Data Correction Request',
      deletion: 'Data Deletion Request',
      resignation: 'Resignation Request'
    }

    const emailSubject = `Your PSP-K Verification Code - ${actionLabels[actionType]}`

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email.trim().toLowerCase(),
        subject: emailSubject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #7c3aed; margin: 0; font-size: 24px;">PSP-K</h1>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">People Salvation Party of Kenya</p>
              </div>

              <!-- Greeting -->
              <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                Hello <strong>${member.first_name}</strong>,
              </p>

              <!-- Message -->
              <p style="color: #374151; font-size: 16px; margin-bottom: 30px;">
                You requested a verification code for: <strong>${actionLabels[actionType]}</strong>
              </p>

              <!-- OTP Code -->
              <div style="background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px;">Your Verification Code</p>
                <p style="color: white; font-size: 42px; font-weight: bold; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">
                  ${otpCode}
                </p>
              </div>

              <!-- Expiry warning -->
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  <strong>Important:</strong> This code expires in <strong>10 minutes</strong>. Do not share this code with anyone.
                </p>
              </div>

              <!-- Security note -->
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you did not request this code, please ignore this email. Your account remains secure.
              </p>

              <!-- Footer -->
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  People Salvation Party of Kenya (PSP-K)<br>
                  Meli ya Ukombozi
                </p>
                <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                  This is an automated message. Please do not reply to this email.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
PSP-K - People Salvation Party of Kenya

Hello ${member.first_name},

You requested a verification code for: ${actionLabels[actionType]}

Your Verification Code: ${otpCode}

This code expires in 10 minutes. Do not share this code with anyone.

If you did not request this code, please ignore this email.

---
People Salvation Party of Kenya (PSP-K)
Meli ya Ukombozi
        `.trim()
      }),
    })

    const emailData = await emailResponse.json()

    if (!emailResponse.ok) {
      console.error('Resend API error:', emailData)
      // Still return success if OTP was stored, even if email failed
      // In production, you might want to handle this differently
      return NextResponse.json({
        success: true,
        message: 'Code generated but email delivery may be delayed',
        memberName: `${member.first_name} ${member.last_name}`,
        registeredAt: member.created_at
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent',
      memberName: `${member.first_name} ${member.last_name}`,
      registeredAt: member.created_at
    })

  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
