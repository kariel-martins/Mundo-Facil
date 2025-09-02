"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeOrderCreated = consumeOrderCreated;
const rabbitmq_1 = require("../rabbitmq");
async function consumeOrderCreated() {
    const channel = await (0, rabbitmq_1.initRabbitMQ)();
    const queue = "order_created";
    await channel.assertQueue(queue, { durable: true });
    console.log("👂 Aguardando mensagens em:", queue);
    channel.consume(queue, (msg) => {
        if (msg) {
            const order = JSON.parse(msg.content.toString());
            console.log("✅ Pedido recebido no consumer:", order);
            // Aqui você chama um service do seu domínio, ex:
            // orderService.processPayment(order)
            // emailService.sendOrderConfirmation(order)
            channel.ack(msg);
        }
    });
}
