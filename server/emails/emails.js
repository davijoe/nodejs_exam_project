import { Resend } from "@resend/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name, activationLink) => {
  try {
    await resend.emails.send({
      from: "welcome@gummiand.com",
      to: email,
      subject: "Welcome to Our App!",
      html: `<h1>Welcome, ${name}!</h1>
             <p>Thank you for joining our app. Please activate your account by clicking the link below:</p>
             <a href="${activationLink}">Activate your account</a>`,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};
