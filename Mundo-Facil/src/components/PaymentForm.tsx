import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { usePaymentIntent } from "@/hooks/payments/mutations/payment.mutate";

export function PaymentForm({ items, total }: { items: any[]; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const { data: clientSecret, isLoading } = usePaymentIntent(items);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setStatus("processando");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setStatus(`Erro: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      setStatus("Pagamento aprovado ✅");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Pagamento com cartão</h2>

      <div className="border p-3 rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading || status === "processando"}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {status === "processando" ? "Processando..." : `Pagar R$ ${total.toFixed(2)}`}
      </button>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </form>
  );
}
