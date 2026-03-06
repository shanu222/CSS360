import nodemailer from 'nodemailer';

const recipient = 'shahnawaz9974balouch@gmail.com';

const getTransporter = () => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
};

export const sendSignupNotification = async ({ name, email, createdAt }) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Signup email skipped: GMAIL_USER or GMAIL_APP_PASSWORD missing.');
    return;
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: recipient,
    subject: 'New CSS360 signup',
    text: [
      'A new user has registered.',
      `Name: ${name}`,
      `Email: ${email}`,
      `Time: ${new Date(createdAt).toISOString()}`,
    ].join('\n'),
  });
};
