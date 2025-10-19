import sgMail from '@sendgrid/mail';
import { env } from "../../config/env";

const { emailUser, sendgridKey } = env();

sgMail.setApiKey(sendgridKey);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  try {
    const info = await sgMail.send({
      to,
      from: `Mundo Facíl <${emailUser}>`,
      subject,
      html,
      text,
    });

    console.log("📧 E-mail enviado com sucesso");
    return info;
  } catch (error: any) {
    console.error("❌ Erro ao enviar e-mail:");

    // ✅ Mostra detalhes do erro vindo do SendGrid (útil para depurar 403)
    if (error.response?.body?.errors) {
      console.error(JSON.stringify(error.response.body.errors, null, 2));
    } else {
      console.error(error);
    }

    throw new Error("Falha ao enviar e-mail");
  }
}
