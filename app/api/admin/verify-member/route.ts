import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create admin Supabase client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Generate membership number (PSP-K-YYYY-XXXXX format)
async function generateMembershipNumber(): Promise<string> {
  const year = new Date().getFullYear().toString()

  // Get the highest sequence number for this year
  const { data } = await supabaseAdmin
    .from('registrations')
    .select('membership_number')
    .like('membership_number', `PSP-K-${year}-%`)
    .order('membership_number', { ascending: false })
    .limit(1)

  let sequence = 1
  if (data && data.length > 0 && data[0].membership_number) {
    const match = data[0].membership_number.match(/PSP-K-\d{4}-(\d+)/)
    if (match) {
      sequence = parseInt(match[1], 10) + 1
    }
  }

  return `PSP-K-${year}-${sequence.toString().padStart(5, '0')}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberId, action, reason } = body

    // Validate inputs
    if (!memberId || !action) {
      return NextResponse.json(
        { success: false, message: 'Member ID and action are required' },
        { status: 400 }
      )
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      )
    }

    // Get member details
    const { data: member, error: memberError } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', memberId)
      .single()

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        message: 'Member not found'
      })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'PSP-K <onboarding@resend.dev>'

    if (action === 'approve') {
      // Generate membership number
      const membershipNumber = await generateMembershipNumber()

      // Update member record
      const { error: updateError } = await supabaseAdmin
        .from('registrations')
        .update({
          verification_status: 'approved',
          membership_number: membershipNumber,
          verified_at: new Date().toISOString()
        })
        .eq('id', memberId)

      if (updateError) {
        console.error('Update error:', updateError)
        return NextResponse.json({
          success: false,
          message: 'Failed to update member record'
        })
      }

      // Send approval email
      if (resendApiKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: member.email,
            subject: 'Welcome to PSP-K - Membership Approved!',
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
                    <h1 style="color: #7c3aed; margin: 0; font-size: 28px;">Congratulations!</h1>
                    <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Your PSP-K membership has been approved</p>
                  </div>

                  <!-- Greeting -->
                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    Dear <strong>${member.first_name} ${member.last_name}</strong>,
                  </p>

                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    We are delighted to inform you that your membership application to the People Salvation Party of Kenya (PSP-K) has been <strong style="color: #059669;">approved</strong>.
                  </p>

                  <!-- Membership Card -->
                  <div style="background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%); border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0; color: white;">
                    <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">Your Membership Number</p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px; font-family: 'Courier New', monospace;">
                      ${membershipNumber}
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.9;">
                      ${member.first_name} ${member.last_name}
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
                      Member since ${new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    Please keep this membership number safe. You will need it for party activities and communications.
                  </p>

                  <!-- What's Next -->
                  <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">What's Next?</h3>
                    <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 20px;">
                      <li style="margin-bottom: 8px;">Stay updated with party news and events</li>
                      <li style="margin-bottom: 8px;">Participate in grassroots activities in your area</li>
                      <li style="margin-bottom: 8px;">Connect with fellow members in ${member.county}</li>
                      <li>Visit our website for upcoming events and announcements</li>
                    </ul>
                  </div>

                  <p style="color: #374151; font-size: 16px;">
                    Welcome aboard! Together, we build a better Kenya.
                  </p>

                  <p style="color: #374151; font-size: 16px; margin-top: 30px;">
                    <strong>Meli ya Ukombozi!</strong>
                  </p>

                  <!-- Footer -->
                  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      People Salvation Party of Kenya (PSP-K)<br>
                      <a href="https://psp-kenya.com" style="color: #7c3aed;">www.psp-kenya.com</a>
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
            text: `
Congratulations, ${member.first_name}!

Your PSP-K membership has been approved.

YOUR MEMBERSHIP NUMBER: ${membershipNumber}

Member: ${member.first_name} ${member.last_name}
Member since: ${new Date().toLocaleDateString('en-KE')}

Please keep this membership number safe. You will need it for party activities and communications.

What's Next?
- Stay updated with party news and events
- Participate in grassroots activities in your area
- Connect with fellow members in ${member.county}
- Visit our website for upcoming events

Welcome aboard! Together, we build a better Kenya.

Meli ya Ukombozi!

---
People Salvation Party of Kenya (PSP-K)
www.psp-kenya.com
            `.trim()
          }),
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Member approved successfully',
        membershipNumber
      })

    } else if (action === 'reject') {
      if (!reason) {
        return NextResponse.json({
          success: false,
          message: 'Rejection reason is required'
        })
      }

      // Update member record
      const { error: updateError } = await supabaseAdmin
        .from('registrations')
        .update({
          verification_status: 'rejected',
          rejection_reason: reason,
          verified_at: new Date().toISOString()
        })
        .eq('id', memberId)

      if (updateError) {
        console.error('Update error:', updateError)
        return NextResponse.json({
          success: false,
          message: 'Failed to update member record'
        })
      }

      // Send rejection email
      if (resendApiKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: member.email,
            subject: 'PSP-K Membership Application Update',
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
                    <h1 style="color: #6b7280; margin: 0; font-size: 24px;">PSP-K</h1>
                    <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">People Salvation Party of Kenya</p>
                  </div>

                  <!-- Greeting -->
                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    Dear <strong>${member.first_name} ${member.last_name}</strong>,
                  </p>

                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    Thank you for your interest in joining the People Salvation Party of Kenya (PSP-K).
                  </p>

                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    After reviewing your application, we regret to inform you that we are unable to approve your membership at this time.
                  </p>

                  <!-- Reason Box -->
                  <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                    <p style="color: #991b1b; margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">Reason:</p>
                    <p style="color: #7f1d1d; margin: 0; font-size: 14px;">${reason}</p>
                  </div>

                  <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                    If you believe this decision was made in error, or if you have additional information that may support your application, please contact us at <a href="mailto:info@psp-kenya.com" style="color: #7c3aed;">info@psp-kenya.com</a>.
                  </p>

                  <p style="color: #374151; font-size: 16px;">
                    You may also reapply in the future once the issues mentioned above have been addressed.
                  </p>

                  <!-- Footer -->
                  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      People Salvation Party of Kenya (PSP-K)<br>
                      Meli ya Ukombozi
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
            text: `
Dear ${member.first_name} ${member.last_name},

Thank you for your interest in joining the People Salvation Party of Kenya (PSP-K).

After reviewing your application, we regret to inform you that we are unable to approve your membership at this time.

REASON: ${reason}

If you believe this decision was made in error, or if you have additional information that may support your application, please contact us at info@psp-kenya.com.

You may also reapply in the future once the issues mentioned above have been addressed.

---
People Salvation Party of Kenya (PSP-K)
Meli ya Ukombozi
            `.trim()
          }),
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Application rejected'
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    })

  } catch (error) {
    console.error('Verify member error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
