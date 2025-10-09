import { removeMutateCart } from "@/hooks/carts/mutations/cart.mutate";
import type { CartRequest } from "@/types/carts";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  total: number;
  data: CartRequest[];
}

export function CheckoutForm({ total, data }: CheckoutFormProps) {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutateAsync: clearCart } = removeMutateCart()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setStatus("Processando pagamento...");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`, 
      },
      redirect: "if_required",
    });

    if (error) {
      console.error("[Stripe Error]", error);
      setStatus(`Erro: ${error.message}`);
      setIsProcessing(false);
      navigate("/checkout/cancel",  
        // {state: { 
        //   orderId: data[0]?.carts.id,
        //   errorMessage: error.message 
        // }}
      )
    } else if (paymentIntent?.status === "succeeded") {
      setStatus("Pagamento aprovado! ✅");
      data.map( cart => clearCart(cart.carts.id) )
      navigate("/checkout/success")
    } else {
      setStatus(`Status: ${paymentIntent?.status ?? "desconhecido"}`);
      setIsProcessing(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Detalhes do Pagamento</h2>

      <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
          !stripe || !elements || isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
        }`}
      >
        {isProcessing
          ? "Processando..."
          : `Pagar R$ ${total.toFixed(2)}`}
      </button>

      {status && (
        <p className={`text-sm mt-3 p-2 rounded ${
            status.includes("Erro") ? "text-red-700 bg-red-100" : "text-gray-600 bg-gray-100"
        }`}>
            {status}
        </p>
      )}
    </form>
  );
}
