import { createMutateCart } from "@/hooks/carts/mutations/cart.mutate";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type CartRequest = {
  product_id: string;
  user_id: string;
  quantity: number;
};

export function ButtonAddCart(data: CartRequest) {
  const navigate = useNavigate();
  const { mutateAsync: createCart } = createMutateCart();

  async function handleCart() {
    await createCart(data);
    navigate(`/carts`);
  }
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => handleCart()}
      // Estilo Mundo Fácil: Borda e texto em Azul Claro, hover sutil
      className="w-full px-4 py-2 text-sm font-semibold rounded-lg border-blue-400 text-blue-500 hover:bg-blue-50 hover:border-blue-500 transition-colors"
    >
      Adicionar ao Carrinho
    </Button>
  );
}