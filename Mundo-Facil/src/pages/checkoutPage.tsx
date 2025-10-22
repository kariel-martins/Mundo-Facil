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

  const { data: cartItens } = useGetCarts(userId);
  const { mutateAsync: createPaymentIntent } = usePaymentIntent();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const hasRequested = useRef(false);
  const total =
    cartItens?.reduce(
      (sum, item) => sum + Number(item.products.price) * item.carts.quantity,
      0
    ) ?? 0;

  useEffect(() => {
    if (!userId || !cartItens?.length || hasRequested.current) {
      setLoading(false);
      return;
    }

    hasRequested.current = true; 

    (async () => {
      try {
        const response = await createPaymentIntent({
          user_id: userId,
          total,
          carts: cartItens,
        });

        const clientSecret =
          response?.data?.clientSecret ?? response?.clientSecret;

        if (clientSecret) {
          setClientSecret(clientSecret);
        }
      } catch (err) {
        console.error("Erro ao criar PaymentIntent:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [cartItens]);

  if (!cartItens) return <p>Erro ao carregar o carrinho.</p>;
  if (loading) return <p>Carregando pagamento...</p>;
  if (cartItens.length === 0) return <p>Seu carrinho está vazio.</p>;

  const options = clientSecret
    ? { clientSecret, appearance: { theme: "stripe" as const } }
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          Finalizar Compra 🛍️
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <ProductSummary items={cartItens} total={total} />
          </div>
          <div className="lg:col-span-2">
            {clientSecret && options ? (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm total={total} data={cartItens} />
              </Elements>
            ) : (
              <div className="p-8 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg">
                <p>Falha ao iniciar o pagamento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
