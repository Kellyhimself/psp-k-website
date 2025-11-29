import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, formType } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL

    if (!recipientEmail) {
      console.error('CONTACT_EMAIL environment variable not set')
      return NextResponse.json(
        { error: 'Email configuration missing' },
        { status: 500 }
      )
    }

    // Use Resend API to send email
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Determine form type for email subject
    const emailSubject = formType === 'contact' 
      ? `New Contact Form Submission: ${subject}`
      : formType === 'volunteer'
      ? 'New Volunteer Application'
      : formType === 'registration'
      ? 'New Member Registration'
      : `New ${formType || 'Form'} Submission: ${subject}`

    // Format email body
    const emailBody = `
New ${formType === 'contact' ? 'Contact Form' : formType === 'volunteer' ? 'Volunteer Application' : formType === 'registration' ? 'Member Registration' : 'Form'} Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${formType === 'contact' ? `Subject: ${subject}` : ''}

Message:
${message}

---
This email was sent from the PSP-K website contact form.
Submitted at: ${new Date().toLocaleString()}
    `.trim()

    // Determine "from" email - use test domain if custom domain not verified
    let fromEmail = process.env.RESEND_FROM_EMAIL || 'PSP-K Website <onboarding@resend.dev>'
    
    // If using custom domain, check if it's verified (will fail gracefully if not)
    // For testing, use Resend's test domain: onboarding@resend.dev
    // For production, verify your domain in Resend dashboard first
    
    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailBody,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333EA;">New ${formType === 'contact' ? 'Contact Form' : formType === 'volunteer' ? 'Volunteer Application' : formType === 'registration' ? 'Member Registration' : 'Form'} Submission</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${formType === 'contact' ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #9333EA; margin: 20px 0;">
              <h3 style="color: #9333EA; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <p>This email was sent from the PSP-K website contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', data)
      return NextResponse.json(
        { error: 'Failed to send email', details: data },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { success: true, messageId: data.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

