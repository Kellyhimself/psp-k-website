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
    const { email, requestType, reason, details } = body

    // Validate inputs
    if (!email || !requestType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate request type
    if (!['correction', 'deletion'].includes(requestType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request type' },
        { status: 400 }
      )
    }

    // Check if member exists
    const { data: member, error: memberError } = await supabaseAdmin
      .from('registrations')
      .select('id, first_name, last_name, email')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        message: 'Member not found'
      })
    }

    // Create the data request
    const { data: requestRecord, error: insertError } = await supabaseAdmin
      .from('data_requests')
      .insert({
        email: email.trim().toLowerCase(),
        request_type: requestType,
        reason: reason || null,
        details: details || null,
        status: 'pending'
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Data request insert error:', insertError)
      return NextResponse.json({
        success: false,
        message: 'Failed to submit request. Please try again.'
      })
    }

    // Send confirmation email
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'PSP-K <onboarding@resend.dev>'
      const requestTypeLabel = requestType === 'correction' ? 'Data Correction' : 'Data Deletion'

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: email.trim().toLowerCase(),
          subject: `PSP-K ${requestTypeLabel} Request Received`,
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

                <!-- Message -->
                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  Dear <strong>${member.first_name}</strong>,
                </p>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  We have received your <strong>${requestTypeLabel}</strong> request.
                </p>

                <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">
                    <strong>Request ID:</strong> ${requestRecord.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">
                    <strong>Request Type:</strong> ${requestTypeLabel}
                  </p>
                  <p style="color: #374151; margin: 0; font-size: 14px;">
                    <strong>Submitted:</strong> ${new Date().toLocaleDateString('en-KE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  Our Data Protection Officer will review your request and process it within <strong>14 days</strong> as required by the Data Protection Act.
                </p>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  You will receive another email once your request has been processed.
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
Dear ${member.first_name},

We have received your ${requestTypeLabel} request.

Request ID: ${requestRecord.id.slice(0, 8).toUpperCase()}
Request Type: ${requestTypeLabel}
Submitted: ${new Date().toLocaleDateString('en-KE')}

Our Data Protection Officer will review your request and process it within 14 days as required by the Data Protection Act.

You will receive another email once your request has been processed.

---
People Salvation Party of Kenya (PSP-K)
Meli ya Ukombozi
          `.trim()
        }),
      })

      // Also notify admin
      const adminEmail = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL
      if (adminEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: adminEmail,
            subject: `[Action Required] New ${requestTypeLabel} Request`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #9333EA;">New ${requestTypeLabel} Request</h2>

                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Request ID:</strong> ${requestRecord.id}</p>
                  <p><strong>Member:</strong> ${member.first_name} ${member.last_name}</p>
                  <p><strong>Email:</strong> ${member.email}</p>
                  <p><strong>Request Type:</strong> ${requestTypeLabel}</p>
                  ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                  ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
                </div>

                <p style="color: #6b7280;">This request requires processing within 14 days.</p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                  <p>Submitted at: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            `,
          }),
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Request submitted successfully',
      requestId: requestRecord.id
    })

  } catch (error) {
    console.error('Data request error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
