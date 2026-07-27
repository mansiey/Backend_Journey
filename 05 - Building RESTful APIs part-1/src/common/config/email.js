//will learn how to send emails
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_EMAIL}`,
        to, 
        subject,
        html,
    })
};


const verificationEmail = async (email, token) => {
    const subject = "Verify your email";

    const html = `
        <h1>Email Verification</h1>
        <p>Click the link below:</p>
        <a href="http://localhost:3000/verify/${token}">
            Verify Email
        </a>
    `;

    await sendMail(email, subject, html);
};


export {
    sendMail,
    verificationEmail,
}