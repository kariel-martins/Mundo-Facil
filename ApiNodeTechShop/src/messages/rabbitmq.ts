import amqp, { Options, Channel, ConfirmChannel } from "amqplib";
import { env } from "../config/env";

const { rabbitMQ } = env();

let connection: amqp.Connection | null = null;
let pubChannel: ConfirmChannel | null = null;
let subChannel: Channel | null = null;

const RABBIT_URL = rabbitMQ || "amqp://guest:guest@localhost:5672";

async function createConnection(): Promise<amqp.Connection> {
  const conn = await amqp.connect(RABBIT_URL);

  conn.on("error", err => {
    console.error("RabbitMQ connection error:", err.message);
  });

  conn.on("close", async () => {
    console.warn("RabbitMQ connection closed. Reconnecting...");
    connection = null;
    pubChannel = null;
    subChannel = null;
    // backoff simples
    await new Promise(r => setTimeout(r, 2000));//espera 2s
    await ensureConnection(); // tenta reconectar
  });

  return conn;
}

async function ensureConnection() {
  if (!connection) {
    connection = await createConnection();
    console.log("✅ Conectado ao RabbitMQ");
  }
}

export async function getPublisherChannel(): Promise<ConfirmChannel> {
  await ensureConnection();
  if (!connection) throw new Error("Sem conexão RabbitMQ");
  if (!pubChannel) {
    pubChannel = await connection.createConfirmChannel();
  }
  return pubChannel;
}

export async function getSubscriberChannel(): Promise<Channel> {
  await ensureConnection();
  if (!connection) throw new Error("Sem conexão RabbitMQ");
  if (!subChannel) {
    subChannel = await connection.createChannel();
  }
  return subChannel;
}

export async function assertTopicExchange(exchange: string) {
  const ch = await getPublisherChannel();
  await ch.assertExchange(exchange, "topic", { durable: true });
}

export async function assertQueueWithDLQ(
  queue: string,
  dlx: string,
  deadLetterRoutingKey = `${queue}.dead`
) {
  const ch = await getSubscriberChannel();
  await ch.assertExchange(dlx, "topic", { durable: true });
  await ch.assertQueue(queue, {
    durable: true,
    deadLetterExchange: dlx,
    deadLetterRoutingKey,
  });
  const dlq = `${queue}.dead`;
  await ch.assertQueue(dlq, { durable: true });
  await ch.bindQueue(dlq, dlx, deadLetterRoutingKey);
  return ch;
}

export async function bindQueue(queue: string, exchange: string, pattern: string) {
  const ch = await getSubscriberChannel();
  try {
    await ch.checkExchange(exchange)
  } catch {
    await ch.assertExchange(exchange, "topic", { durable: true });
  }
  await ch.bindQueue(queue, exchange, pattern);
}

export async function publish(
  exchange: string,
  routingKey: string,
  message: unknown,
  options: Options.Publish = {}
) {
  const ch = await getPublisherChannel();
  await ch.assertExchange(exchange, "topic", { durable: true });

  const payload = Buffer.from(JSON.stringify(message));

  return new Promise<void>((resolve, reject) => {
    const ok = ch.publish(exchange, routingKey, payload, {
      persistent: true,
      contentType: "application/json",
      ...options,
    });

    if (!ok) {
      ch.once("drain", () => resolve());
    } else {
      resolve();
    }
  }).then(
    () =>
      new Promise<void>((resolve, reject) => {
        ch.waitForConfirms().then(resolve).catch(reject);
      })
  );
}
