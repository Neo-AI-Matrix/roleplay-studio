import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Send email via Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Roleplay Studio <noreply@roleplaystudio.ai>',
          to: ['askus@roleplaystudio.ai'],
          reply_to: data.email,
          subject: `Contact Form: ${data.name}${data.company ? ` from ${data.company}` : ''}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            <hr />
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, '<br />')}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              Submitted at ${new Date().toISOString()}
            </p>
          `,
          text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}

---
Submitted at ${new Date().toISOString()}
          `.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Resend API error:', error);
        // Fall through to log the submission
      } else {
        console.log('[Contact Form] Email sent successfully via Resend');
        return NextResponse.json({ success: true, method: 'email' });
      }
    }
    
    // If no email service configured or it failed, log the submission
    console.log('[Contact Form] New submission:', {
      name: data.name,
      email: data.email,
      company: data.company || 'N/A',
      message: data.message,
      timestamp: new Date().toISOString(),
    });
    
    // Return success - the form data is logged
    return NextResponse.json({ 
      success: true, 
      method: 'logged',
      note: 'Email service not configured - submission logged'
    });
    
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
