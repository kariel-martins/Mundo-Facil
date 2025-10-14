import { CreatePaymentType } from "../../types/payments";
import { publish } from "../rabbitmq";

const EXCHANGE = "payments.events";

export async function publishCreatePaymentRequest(data: CreatePaymentType) {
    const event = {
        ...data
    }
    await publish(EXCHANGE, "payments.created.requested", event, {
        headers: { "x-service": "payment" },
    });
    console.log("📨 Evento publicado: payment.created", event);
};