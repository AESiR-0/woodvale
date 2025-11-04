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

  return nodemailer.createTransporter({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export async function sendEmailNotification(to: string, subject: string, html: string) {
  const transporter = createEmailTransporter();
  
  if (!transporter) {
    console.log('📧 Email not configured, skipping notification');
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}
