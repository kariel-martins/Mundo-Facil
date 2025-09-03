import nodemailer from "nodemailer";
import { env } from "../../config/env"

const { emialPass, emialUser} = env()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emialUser,
    pass: emialPass,
  },
});

export async function sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string
) {
      try {
    const info = await transporter.sendMail({
      from: `"Minha Loja" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("📧 E-mail enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw new Error("Falha ao enviar e-mail");
  }
}
