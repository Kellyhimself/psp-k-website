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
    const { email, reason } = body

    // Validate input
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Get member details before deletion
    const { data: member, error: memberError } = await supabaseAdmin
      .from('registrations')
      .select('id, first_name, last_name, id_number, email')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (memberError || !member) {
      return NextResponse.json({
        success: false,
        message: 'Member not found'
      })
    }

    // Log the resignation
    await supabaseAdmin
      .from('resignation_log')
      .insert({
        email: member.email,
        id_number: member.id_number,
        full_name: `${member.first_name} ${member.last_name}`,
        reason: reason || 'Self-service resignation'
      })

    // Delete the member record
    const { error: deleteError } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', member.id)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json({
        success: false,
        message: 'Failed to process resignation. Please contact support.'
      })
    }

    // Send confirmation email
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'PSP-K <onboarding@resend.dev>'

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: email.trim().toLowerCase(),
          subject: 'PSP-K Membership Resignation Confirmation',
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

                <!-- Message -->
                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  Dear <strong>${member.first_name}</strong>,
                </p>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  This email confirms that your resignation from the People Salvation Party of Kenya (PSP-K) has been processed successfully.
                </p>

                <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="color: #374151; margin: 0; font-size: 14px;">
                    <strong>Date of Resignation:</strong> ${new Date().toLocaleDateString('en-KE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  Your membership record has been removed from our system. If you wish to rejoin PSP-K in the future, you are welcome to register again through our website.
                </p>

                <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
                  We thank you for the time you spent with us and wish you all the best in your future endeavors.
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

This email confirms that your resignation from the People Salvation Party of Kenya (PSP-K) has been processed successfully.

Date of Resignation: ${new Date().toLocaleDateString('en-KE')}

Your membership record has been removed from our system. If you wish to rejoin PSP-K in the future, you are welcome to register again through our website.

We thank you for the time you spent with us and wish you all the best in your future endeavors.

---
People Salvation Party of Kenya (PSP-K)
Meli ya Ukombozi
          `.trim()
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Resignation processed successfully'
    })

  } catch (error) {
    console.error('Resignation processing error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
