"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublisherChannel = getPublisherChannel;
exports.getSubscriberChannel = getSubscriberChannel;
exports.assertTopicExchange = assertTopicExchange;
exports.assertQueueWithDLQ = assertQueueWithDLQ;
exports.bindQueue = bindQueue;
exports.publish = publish;
const amqplib_1 = __importDefault(require("amqplib"));
const env_1 = require("../config/env");
const { rabbitMQ } = (0, env_1.env)();
let connection = null;
let pubChannel = null;
let subChannel = null;
const RABBIT_URL = rabbitMQ || "amqp://guest:guest@localhost:5672";
async function createConnection() {
    const conn = await amqplib_1.default.connect(RABBIT_URL);
    conn.on("error", err => {
        console.error("RabbitMQ connection error:", err.message);
    });
    conn.on("close", async () => {
        console.warn("RabbitMQ connection closed. Reconnecting...");
        connection = null;
        pubChannel = null;
        subChannel = null;
        // backoff simples
        await new Promise(r => setTimeout(r, 2000)); //espera 2s
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
async function getPublisherChannel() {
    await ensureConnection();
    if (!connection)
        throw new Error("Sem conexão RabbitMQ");
    if (!pubChannel) {
        pubChannel = await connection.createConfirmChannel();
    }
    return pubChannel;
}
async function getSubscriberChannel() {
    await ensureConnection();
    if (!connection)
        throw new Error("Sem conexão RabbitMQ");
    if (!subChannel) {
        subChannel = await connection.createChannel();
    }
    return subChannel;
}
async function assertTopicExchange(exchange) {
    const ch = await getPublisherChannel();
    await ch.assertExchange(exchange, "topic", { durable: true });
}
async function assertQueueWithDLQ(queue, dlx, deadLetterRoutingKey = `${queue}.dead`) {
    const ch = await getSubscriberChannel();
    await ch.assertExchange(dlx, "topic", { durable: true });
    await ch.assertQueue(queue, {
        durable: true,
        deadLetterExchange: dlx,
        deadLetterRoutingKey,
    });
    return ch;
}
async function bindQueue(queue, exchange, pattern) {
    const ch = await getSubscriberChannel();
    await ch.bindQueue(queue, exchange, pattern);
}
async function publish(exchange, routingKey, message, options = {}) {
    const ch = await getPublisherChannel();
    await ch.assertExchange(exchange, "topic", { durable: true });
    const payload = Buffer.from(JSON.stringify(message));
    return new Promise((resolve, reject) => {
        const ok = ch.publish(exchange, routingKey, payload, {
            persistent: true,
            contentType: "application/json",
            ...options,
        });
        if (!ok) {
            ch.once("drain", () => resolve());
        }
        else {
            resolve();
        }
    }).then(() => new Promise((resolve, reject) => {
        ch.waitForConfirms().then(resolve).catch(reject);
    }));
}
