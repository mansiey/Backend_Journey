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
        from: `"${process.env.SMTP_FROM_EMAIL}" < ${process.env.SMTP_FROM_EMAIL}>`,
        to, 
        subject,
        html,
    })
};


const verificationEmail = async (email, token) => {
    const url = `${process.env.CLIENT_URL}/verifyEmail/${token}`;
    const subject = "Verify your email";

    const html = `
        <h1> Email Verification </h1>
        <p> Click the link below: </p>
        <a href="${url}"> Verify Email</a>`;

    await sendMail(email, subject, html);
};

const sendResetPasswordEmail = async (email, token) => {
    const url = `${process.env.CLIENT_URL}/resetPassword/${token}`;
    const subject = "Reset your password";

    const html = `
        <h1> Password Reset </h1>
        <p> Click the link below: </p> 
        <p> <a href="${url}"> Click here </a> to reset your password. This link expires in 15 minutes. </p>`;

    await sendMail(email, subject, html);
}

const sendOrderConfirmationEmail = async (email, order) => {

}


export {
    sendMail,
    verificationEmail,
    sendResetPasswordEmail,
    sendOrderConfirmationEmail
}