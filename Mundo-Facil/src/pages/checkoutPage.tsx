import { PaymentForm } from "@/components/PaymentForm";
import { ProductSummary } from "@/components/ProductSummary";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

export default function CheckoutPage() {
  const cartItems = [
    { id: 1, name: "Camiseta", price: 59.9, quantity: 1 },
    { id: 2, name: "Boné", price: 39.9, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Finalizar Compra</h1>
      <ProductSummary items={cartItems} />
      <Elements stripe={stripePromise}>
        <PaymentForm items={cartItems} total={total} />
      </Elements>
    </div>
  );
}
