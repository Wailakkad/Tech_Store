import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create email transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password (not regular password)
    },
  });
};

// Send notification email to your Gmail
async function sendNotificationEmail(contactData) {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to your own Gmail
    subject: `🔔 Nouveau message de contact - ${contactData.prenom} ${contactData.nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #333; border-bottom: 3px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
            📧 Nouveau Message de Contact
          </h1>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #000; margin-top: 0; font-size: 18px;">Informations du contact :</h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 120px;">Nom :</strong>
              <span style="color: #666;">${contactData.nom}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 120px;">Prénom :</strong>
              <span style="color: #666;">${contactData.prenom}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 120px;">Téléphone :</strong>
              <span style="color: #666;">${contactData.telephone || 'Non fourni'}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #333; display: inline-block; width: 120px;">IP Address :</strong>
              <span style="color: #666; font-size: 12px;">${contactData.ip}</span>
            </div>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #000; margin-top: 0; font-size: 16px;">💬 Message :</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #000;">
              <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
          </div>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              📅 Reçu le : ${new Date(contactData.timestamp).toLocaleString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div style="margin-top: 25px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              ✨ Ce message a été envoyé depuis votre site web contact form
            </p>
          </div>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

// POST handler for contact form submissions
export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { nom, prenom, telephone, message } = body;

    // Basic validation
    if (!nom || !prenom || !message) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'Nom, Prénom, and Message are required fields.'
        },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{0,20}$/;
    if (telephone && !phoneRegex.test(telephone)) {
      return NextResponse.json(
        { 
          error: 'Invalid phone format',
          message: 'Please provide a valid phone number.'
        },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedData = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      telephone: telephone?.trim() || '',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          request.ip || 
          'unknown'
    };

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        {
          error: 'Email service not configured',
          message: 'Le service d\'email n\'est pas configuré. Veuillez contacter l\'administrateur.'
        },
        { status: 500 }
      );
    }

    // Send notification email to your Gmail
    try {
      await sendNotificationEmail(sanitizedData);
      console.log('✅ Notification email sent successfully to:', process.env.GMAIL_USER);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      return NextResponse.json(
        {
          error: 'Email sending failed',
          message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.'
        },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log('📧 New contact form submission:', {
      name: `${sanitizedData.prenom} ${sanitizedData.nom}`,
      phone: sanitizedData.telephone,
      timestamp: sanitizedData.timestamp
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
      },
      { status: 500 }
    );
  }
}

// GET handler for health check
export async function GET() {
  const isConfigured = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
  
  return NextResponse.json(
    {
      message: 'Contact API is working',
      emailConfigured: isConfigured,
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}