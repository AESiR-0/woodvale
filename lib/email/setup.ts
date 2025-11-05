import nodemailer from 'nodemailer';

export function createEmailTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.log('⚠️  Email not configured. Set SMTP_* variables in .env.local for email notifications');
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // Enable TLS for port 587
    ...(parseInt(smtpPort) === 587 && {
      requireTLS: true,
      tls: {
        rejectUnauthorized: false,
      },
    }),
  });
}

export async function sendEmailNotification(to: string | string[], subject: string, html: string) {
  const transporter = createEmailTransporter();
  
  if (!transporter) {
    console.log('📧 Email not configured, skipping notification');
    return;
  }

  try {
    const recipients = Array.isArray(to) ? to.join(', ') : to;
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients,
      subject,
      html,
    });
    console.log('✅ Email sent successfully to:', recipients);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}
