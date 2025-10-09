import type { CartRequest } from "@/types/carts";

export function ProductSummary({items, total}: { items: CartRequest[], total: number}) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">Resumo da compra</h2>
      {items.map((item) => (
        <div key={item.products.id} className="flex justify-between mb-2">
          <span>{item.products.productName} x {Number(item.carts.quantity)}</span>
          <span>R$ {(Number(item.products.price) * Number(item.carts.quantity)).toFixed(2)}</span>
        </div>
      ))}
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
