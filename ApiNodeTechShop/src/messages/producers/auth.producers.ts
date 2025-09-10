// messages/producers/auth.producers.ts
import crypto from "node:crypto";
import { publish } from "../rabbitmq";

const EXCHANGE = "auth.events";

type UserCreatedEvent = {
  eventId: string;
  occurredAt: string;
  schemaVersion: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function publishUserCreated(user: {
  id: string;
  name: string;
  email: string;
}) {
  const event: UserCreatedEvent = {
    eventId: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    schemaVersion: 1,
    user,
  };
  await publish(EXCHANGE, "auth.user.created", event, {
    headers: { "x-service": "auth" },
  });
  console.log("📨 Evento publicado: auth.user.created", event);
}

type EmailVerificationRequestedEvent = {
  eventId: string;
  occurredAt: string;
  schemaVersion: number;
  userId: string;
  email: string;
  token: string;
  expiresAt: string;
};

export async function publishEmailVerificationRequested(data: {
  userId: string;
  email: string;
  token: string;
  expiresAt: string;
}) {
  const event: EmailVerificationRequestedEvent = {
    eventId: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    schemaVersion: 1,
    ...data,
  };
  await publish(EXCHANGE, "auth.email.verification.requested", event, {
    headers: { "x-service": "auth" },
  });
  console.log("📨 Evento publicado: auth.email.verification.requested", event);
}

export async function publishForgotPasswordEmail(
  email: string,
  token: string,
  name: string
) {
  const event = {
    email,
    token,
    name,
  };
  await publish(EXCHANGE, "auth.forgot.password.requested", event, {headers: {"x-service": "auth"}});
  console.log("📨 Evento publicado: auth.forgot.password.requested", event, {
    headers: { "x-service": "auth" },
  });
}

export async function publishResertPasswordUser(
  email: string,
  name: string
) {
  const event = {
    email,
    name,
  };
  await publish(EXCHANGE, "auth.resert.password.requested", event, {
    headers: { "x-service": "auth" },
  });
  console.log("📨  Evento publicado: auth.resert.password.requested", event);
}
