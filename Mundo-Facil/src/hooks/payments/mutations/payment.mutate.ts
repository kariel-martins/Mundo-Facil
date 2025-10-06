import { useQuery } from "@tanstack/react-query";

export function usePaymentIntent(items: any[]) {
  return useQuery({
    queryKey: ["payment-intent", items],
    queryFn: async () => {
      const res = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      return data.clientSecret;
    },
    staleTime: Infinity,
  });
}
