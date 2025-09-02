"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishOrderCreated = publishOrderCreated;
const rabbitmq_1 = require("../rabbitmq");
async function publishOrderCreated(order) {
    const channel = await (0, rabbitmq_1.initRabbitMQ)();
    const queue = "order_created";
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), { persistent: true });
    console.log("📨 Evento publicado: order_created", order);
}
