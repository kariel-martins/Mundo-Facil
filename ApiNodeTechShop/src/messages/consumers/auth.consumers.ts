// auth.consumers.ts - MODIFICAR
import { sendEmail } from "../../share/services/EmailService";
import {
  createContaEmailTemplate,
  passwordResetSuccessEmailTemplate,
  resetPasswordEmailTemplate,
} from "../../share/templetes/Email.auth";
import {
  assertQueueWithDLQ,
  bindQueue,
  assertTopicExchange,
} from "../rabbitmq";
type verifyEventData = {
  email: string;
  token: string;
  userId: string;
};

type forgotPasswordEventData = {
  email: string;
  token: string;
  name: string;
};

const EXCHANGE = "auth.events";
const DLX = "auth.events.dlx";

//============== Verify Email ================
const EMAIL_VERIFICATION_QUEUE = "email.verification.send";
const EMAIL_VERIFICATION_PATTERN = "auth.email.verification.requested";

export async function startEmailVerificationConsumer() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(EMAIL_VERIFICATION_QUEUE, DLX);
    await bindQueue(
      EMAIL_VERIFICATION_QUEUE,
      EXCHANGE,
      EMAIL_VERIFICATION_PATTERN
    );

    await ch.prefetch(10);
    console.log(
      `👂 Aguardando mensagens em: ${EMAIL_VERIFICATION_QUEUE} (pattern: ${EMAIL_VERIFICATION_PATTERN})`
    );

    ch.consume(EMAIL_VERIFICATION_QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString()) as verifyEventData;
        if (!event.email || !event.token || !event.userId) {
          throw new Error("Dados do evento incompletos");
        }

        await sendEmail(
          event.email,
          "Create Account",
          createContaEmailTemplate("/auth/verify-email", event.token, event.userId)
        );
        ch.ack(msg);
        console.log("✅ E-mail de verificação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de EmailVerification:", error);
    throw error;
  }
}

//================ Forgort Password ==================
const FORGOT_PASSWORD_QUEUE = "email.forgot.password.send";
const FORGOT_PASSWORD_PATTERN = "auth.forgot.password.requested";

export async function startForgotPasswordConsumer() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(FORGOT_PASSWORD_QUEUE, DLX);
    await bindQueue(FORGOT_PASSWORD_QUEUE, EXCHANGE, FORGOT_PASSWORD_PATTERN);
    await ch.prefetch(10);

    console.log(`👂 Aguardando mensagens em: ${FORGOT_PASSWORD_QUEUE} (pattern: ${EMAIL_VERIFICATION_PATTERN}`);

    ch.consume(FORGOT_PASSWORD_QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(
          msg.content.toString()
        ) as forgotPasswordEventData;
        if (!event.email || !event.token)
          throw new Error("Dados de evento incompletos");
        await sendEmail(
          event.email,
          "Forgot Password",
          resetPasswordEmailTemplate(
            event.name,
            "/auth/resert-password",
            event.token
          )
        );
        ch.ack(msg);
        console.log("✅ E-mail de recuperação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar forgotPassword:", err,);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de forgotPassword:", error);
    throw error;
  }
}

//================ Resert Password =======================
const RESERT_PASSWORD_QUEUE = "email.reset.password.send";
const RESERT_PASSWORD_PATTERN = "auth.reset.password.requested";

export async function startResertPasswordConsumer() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(RESERT_PASSWORD_QUEUE, DLX);
    await bindQueue(RESERT_PASSWORD_QUEUE, EXCHANGE, RESERT_PASSWORD_PATTERN);
    await ch.prefetch(10);

    console.log(`👂 Aguardando mensagens em: ${RESERT_PASSWORD_QUEUE} (pattern: ${EMAIL_VERIFICATION_PATTERN}`);

    ch.consume(RESERT_PASSWORD_QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString()) as {
          email: string;
          name: string;
        };
        if (!event.email || !event.name)
          throw new Error("Dados de evento incompletos");
        await sendEmail(
          event.email,
          "Resert Password",
          passwordResetSuccessEmailTemplate(event.name)
        );
        ch.ack(msg);
        console.log("✅ E-mail de recuperação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar forgotPassword:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de resetPassword:", error);
    throw error;
  }
}
