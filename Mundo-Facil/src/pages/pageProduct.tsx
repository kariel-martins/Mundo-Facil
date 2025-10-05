import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Button } from "@/components/ui/button";
import { getByIdMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { Link, useParams } from "react-router-dom";
import { Truck, ShieldCheck, Star, Zap, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ButtonAddCart } from "@/components/ButtoAddCart";

interface ProductData {
  id: string;
  productName: string;
  price: string;
  priceOrigin: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  estoque: number;
  storeName: string;
}

const mockProductDetails: Partial<ProductData> = {
  priceOrigin: 1500.0,
  rating: 4.8,
  estoque: 50,
  storeName: "Mundo Fácil Vendedor Oficial",
  category: "Tecnologia Essencial",
};

export const PageProduct = () => {
  const { user } = useAuth();
  const { product_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, isError } = getByIdMutateProducts(product_id ?? "");
  const product = { ...data, ...mockProductDetails } as ProductData;

  if (isLoading)
    return (
      <p className="text-center pt-32 text-gray-600 font-medium">
        Carregando detalhes do produto...
      </p>
    );
  if (isError || !data)
    return (
      <p className="text-center pt-32 text-red-600 font-medium">
        Produto não encontrado ou erro de conexão.
      </p>
    );

  const discount = 1 - Number(product.price) / product.priceOrigin;
  const finalPrice = product.price;
  console.log(typeof data.price )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 pt-28">
        {/* Container Principal */}
        <div className="bg-white p-8 rounded-xl shadow-2xl shadow-gray-200 border border-gray-200 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-10">
          {/* Seção de Imagem */}
          <div className="lg:w-1/2 flex-shrink-0">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-auto object-contain rounded-xl border border-gray-100 shadow-lg"
            />
          </div>

          {/* Seção de Detalhes e Ações */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              {product.productName}
            </h1>

            {/* Avaliação e Status */}
            <div className="flex items-center space-x-4 border-b pb-4 border-gray-100">
              <div className="flex items-center space-x-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-700">
                  {product.rating}
                </span>
                <span className="text-gray-500">(150 avaliações)</span>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                Em Estoque ({product.estoque})
              </span>
            </div>

            {/* Descrição e Especificações */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-700">Descrição</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <ul className="text-sm text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                <li className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-blue-400" /> Compra
                  100% Segura
                </li>
                <li className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-blue-400" /> Frete Rápido
                  para Todo o Brasil
                </li>
              </ul>
            </div>

            {/* Seção de Preço e Compra */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              {/* Preço Original e Desconto */}
              <div className="flex items-center space-x-3">
                <p className="text-md text-gray-400 line-through">
                  R$ {product.price}
                </p>
                <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                  {Math.round(discount * 100)}% OFF
                </span>
              </div>

              {/* Preço Final */}
              <p className="text-5xl font-extrabold text-gray-800">
                R${" "}
                <span className="text-blue-500">{finalPrice}</span>
              </p>

              {/* Contador de Quantidade */}
              <div className="flex items-center space-x-4 py-2">
                <span className="text-lg font-semibold text-gray-700">
                  Quantidade:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gray-700 hover:bg-gray-100 rounded-r-none"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-8 text-center font-bold text-gray-800">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-gray-700 hover:bg-gray-100 rounded-l-none"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Botão Comprar */}
              <Button className="w-full text-lg font-semibold py-3 rounded-lg transition-all duration-300 mb-3 bg-blue-400 hover:bg-blue- text-white shadow-md shadow-blue-400/50">
                <Zap className="h-5 w-5 mr-2" />
                Comprar Agora
              </Button>

              {/* Botão Adicionar ao Carrinho */}
              <ButtonAddCart
                product_id={data.id}
                user_id={user?.user_id ?? ""}
                quantity={quantity}
              />
            </div>

            {/* Ações Secundárias e Vendedor */}
            <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
              <p className="text-gray-500">
                Vendido por:{" "}
                <Link
                  to={`/stores/${product.storeName}`}
                  className="font-semibold text-gray-700 hover:text-blue-400"
                >
                  {product.storeName}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
