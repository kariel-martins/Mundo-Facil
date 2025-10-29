import { useEffect, useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ProductSummary } from "@/components/ProductSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCarts } from "@/hooks/carts/mutations/cart.mutate";
import { usePaymentIntent } from "@/hooks/payments/mutations/payment.mutate";
import { CheckoutForm } from "@/components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

export function CheckoutPage() {
  const { user } = useAuth();
  const userId = user?.user_id ?? "";

  const { data, isPending: loadingCart, isError: errorCart } = 
  useGetCarts(userId);
  const cartItens = data ?? []
  const { mutateAsync: createPaymentIntent } = usePaymentIntent();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasRequested = useRef(false);

  const total =
    cartItens?.reduce(
      (sum, item) => sum + Number(item.products.price) * item.carts.quantity,
      0
    ) ?? 0;

  useEffect(() => {
    if (!userId || cartItens.length === 0 || hasRequested.current) {
      return;
    }

    hasRequested.current = true;
    setLoading(true)
    setError(null);

    (async () => {
      try {
        const response = await createPaymentIntent({
          user_id: userId,
          total,
          carts: cartItens,
        });
        const clientSecret =
          response?.data?.clientSecret ?? response?.clientSecret;

        if (!clientSecret) {
          throw new Error("Resposta inválida do servidor de pagamento");
        }

        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Erro ao criar PaymentIntent:", err);
        setError("Falha ao iniciar o pagamento. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    })();
  }, [cartItens, userId]);

  const options = {
    clientSecret: clientSecret!,
    appearance: { theme: "stripe" as const },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          Finalizar Compra 🛍️
        </h1>
          {loadingCart || loading ? <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-700">Carregando pagamento...</p>
      </div> : error || errorCart ? <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="p-6 border-l-4 border-red-400 text-red-700 bg-white rounded-lg shadow">
          <p>{error}</p>
        </div>
      </div> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <ProductSummary items={cartItens} total={total} />
          </div>

          <div className="lg:col-span-2">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm total={total} data={cartItens} />
            </Elements>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
