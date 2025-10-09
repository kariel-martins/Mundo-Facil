import { Navbar } from "@/components/header/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  getMutateCart,
  removeMutateCart,
  updatemutateCart,
} from "@/hooks/carts/mutations/cart.mutate";
import { Trash, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type UpdataQuantProps = {
  quant: "add" | "down";
  cart_id: string;
  quantity: number;
};

export function Cart() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { mutateAsync: updateCart } = updatemutateCart();
  const { mutateAsync: removeIten } = removeMutateCart();
  const {
    data: cartItems,
    isLoading,
    isError,
  } = getMutateCart(user?.user_id ?? "");

  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item.products.price * item.carts.quantity,
      0
    ) || 0;

  async function checkoutCart() {
    navigate("/checkout")
  }

  async function UpdateQuantItenCart({
    quant,
    cart_id,
    quantity,
  }: UpdataQuantProps) {
    if (quant === "add") {
      updateCart({
        cart_id: cart_id,
        quantity: quantity + 1,
      });
    } else {
      updateCart({
        cart_id: cart_id,
        quantity: quantity - 1,
      });
    }
  }

  async function removeItenCart(cart_id: string) {
    removeIten(cart_id);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 pt-28 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
          Meu Carrinho de Compras
        </h1>

        {isLoading ? (
          <p className="text-center py-10 text-gray-600 font-medium">
            Carregando seus itens...
          </p>
        ) : isError ? (
          <p className="text-center py-10 text-red-500 font-semibold">
            Erro ao carregar o carrinho.
          </p>
        ) : cartItems?.length === 0 ? (
          <div className="bg-white p-16 rounded-xl shadow-lg text-center border border-gray-200">
            <ShoppingCart className="w-16 h-16 mx-auto text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Seu carrinho está vazio.
            </h2>
            <p className="text-gray-600 mb-6">
              Explore o nosso catálogo para encontrar ofertas incríveis!
            </p>
            <Link to="/catalog">
              <Button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-md transition-colors">
                Ver Produtos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item) => (
                <Card
                  key={item.carts.id}
                  className="bg-white border border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-300"
                >
                  <CardContent className="flex justify-between items-center py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.products.image}
                        alt={item.products.productName}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                      />
                      <div>
                        <h2 className="font-semibold text-lg text-gray-800">
                          {item.products.productName}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                      <Button
                        onClick={() =>
                          UpdateQuantItenCart({
                            quant: "down",
                            quantity: item.carts.quantity,
                            cart_id: item.carts.id,
                          })
                        }
                        disabled={item.carts.quantity <= 1}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 text-gray-700 hover:bg-blue-100 hover:text-blue-500 p-0"
                      >
                        -
                      </Button>
                      <span className="font-medium w-6 text-center text-gray-700">
                        {item.carts.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          UpdateQuantItenCart({
                            quant: "add",
                            quantity: item.carts.quantity,
                            cart_id: item.carts.id,
                          })
                        }
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 text-gray-700 hover:bg-blue-100 hover:text-blue-500 p-0"
                      >
                        +
                      </Button>
                    </div>

                    <p className="font-extrabold text-xl text-blue-600 w-32 text-right">
                      R$
                      {(item.products.price * item.carts.quantity).toFixed(2)}
                    </p>

                    <Button
                      onClick={() => removeItenCart(item.carts.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100/70 hover:text-red-600 transition-colors"
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-6 space-y-5 h-fit lg:col-span-1 shadow-xl border border-gray-200 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
                Resumo da Compra
              </h2>

              <div className="space-y-3">
                <p className="flex justify-between text-lg text-gray-700">
                  <span>Subtotal ({cartItems?.length} itens)</span>
                  <span className="font-semibold">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between text-lg text-gray-700">
                  <span>Frete Estimado</span>
                  <span className="font-semibold text-green-600">Grátis</span>
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="flex justify-between text-2xl font-extrabold text-gray-800">
                  <span>Total</span>
                  <span className="text-blue-500">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </p>
              </div>

              <Button
                onClick={() => checkoutCart()}
                className="w-full text-lg font-semibold py-3 mt-4 
                           bg-blue-400 hover:bg-blue-500 text-white shadow-md transition-colors"
              >
                Finalizar Compra
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
