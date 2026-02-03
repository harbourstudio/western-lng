import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { audienceId, formData } = await request.json();

    // Validate environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !serverPrefix) {
      console.error('Mailchimp configuration missing');
      return NextResponse.json(
        { error: 'Mailchimp is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    if (!audienceId) {
      return NextResponse.json(
        { error: 'Audience ID is required' },
        { status: 400 }
      );
    }

    // Extract email field (required for Mailchimp)
    const email = formData.email || formData.emailAddress || formData['email-address'];

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Build merge fields from form data (excluding email)
    const mergeFields: Record<string, string | string[] | boolean> = {};

    Object.entries(formData).forEach(([key, value]) => {
      // Skip email field as it's handled separately
      if (key !== 'email' && key !== 'emailAddress' && key !== 'email-address') {
        // Convert field names to uppercase for Mailchimp merge fields
        const fieldKey = key.toUpperCase().replace(/-/g, '_');
        mergeFields[fieldKey] = value as string | string[] | boolean;
      }
    });

    // Call Mailchimp API
    const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const response = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: mergeFields,
      }),
    });

    const data = await response.json();

    // Handle Mailchimp errors
    if (!response.ok) {
      console.error('Mailchimp API error:', data);

      // Handle specific Mailchimp errors
      if (data.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'This email address is already subscribed.' },
          { status: 400 }
        );
      }

      if (data.title === 'Invalid Resource') {
        return NextResponse.json(
          { error: 'Invalid audience ID. Please contact support.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: data.detail || 'Failed to subscribe. Please try again.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Form submission error:', error);

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
