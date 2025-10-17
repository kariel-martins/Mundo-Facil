import { Resend } from "resend";
import { env } from "../../config/env";

const { resendKey } = env();

const resend = new Resend(resendKey);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  try {
    const info = await resend.emails.send({
      from: "Mundo Facíl <no-reply@techshop.dev>",
      to,
      subject,
      html,
      text,
    });

    console.log("📧 E-mail enviado com sucesso:", info.data?.id);
    return info;
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw new Error("Falha ao enviar e-mail");
  }
}
