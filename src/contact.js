// netlify/functions/contact.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  // Parse the JSON body
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON' })
    };
  }

  // Validate the data
  const { name, email, message } = data;
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }

  // For demonstration purposes, we'll just log the contact info
  // In a real application, you'd send an email or store in a database
  console.log('Contact form submission:', { name, email, message });

  // You would typically set up nodemailer here to send emails
  // This is just a mock implementation
  try {
    /*
    // Uncomment and configure this for actual email sending
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: "your-email@example.com",
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>`
    });
    */

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending message' })
    };
  }
};