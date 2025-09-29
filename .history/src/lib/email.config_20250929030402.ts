import nodemailer from "nodemailer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendEmail(to: string, subject: string, html: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "Invoice <khgamal005@gmail.com>",
      to,
      subject,
      html, // you can pass your reactHTML converted to string
    });

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    return error;
  }
}
