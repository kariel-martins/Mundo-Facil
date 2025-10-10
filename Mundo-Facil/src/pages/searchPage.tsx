import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Button } from "@/components/ui/button";
import { getAllMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Filter, ShoppingCart, Truck, ShieldCheck, Star } from "lucide-react";
import type { ProductData } from "@/types/products";

export function SearchPage() {
  const navigate = useNavigate();
  const allProduct = getAllMutateProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("product");

  const filtered = allProduct.data?.filter(
    (product) =>
      product.productName.toLowerCase().includes(query?.toLowerCase() || "") ||
      product.category.toLowerCase().includes(query?.toLowerCase() || "")
  );

  if (allProduct.isError)
    return (
      <p className="text-center pt-30 text-red-600 font-semibold">
        Erro ao buscar produtos. Por favor, tente recarregar a página.
      </p>
    );

  function handleProductClick(id: string) {
    navigate(`/products/${id}`);
  }

  const getProductDetails = (product: ProductData) => ({
    ...product,
    storeName: "Xcode",
    isOfficial: "Oficial",
    freeShipping: product.price > 100,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pt-28">
        {/* Cabeçalho de Resultados */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resultados para: "<span className="text-blue-400">{query}</span>"
        </h1>

        <div className="flex space-x-8">
          <div className="w-64 flex-shrink-0 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Filter className="w-4 h-4 mr-2 text-gray-600" />
              Filtros
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-400 rounded border-gray-300 focus:ring-blue-400"
                />
                <span>Frete Grátis</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-400 rounded border-gray-300 focus:ring-blue-400"
                />
                <span>Loja Oficial</span>
              </label>
              <Button
                variant="link"
                className="text-sm p-0 text-blue-400 h-auto mt-4 hover:text-blue-500"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>

          {/* Coluna de Produtos */}
          <div className="flex-grow">
            {allProduct.isLoading ? (
              <p className="text-gray-600 font-medium">
                Buscando as melhores opções para você...
              </p>
            ) : filtered && filtered.length === 0 ? (
              <div className="bg-white p-10 rounded-xl shadow-lg text-center border border-gray-200">
                <p className="text-xl font-semibold text-gray-700">
                  Nenhum produto encontrado. Tente simplificar a busca!
                </p>
              </div>
            ) : (
              filtered?.map((product) => {
                const details = getProductDetails(product);
                return (
                  <div
                    key={details.id}
                    className="flex bg-white p-4 mb-4 rounded-xl shadow-md border border-gray-200 
                               hover:shadow-lg transition-all duration-200 space-x-4 cursor-pointer"
                  >
                    {/* Imagem do Produto */}
                    <Link
                      to={`/products/${details.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={details.image}
                        alt={details.productName}
                        className="w-32 h-32 object-contain rounded-lg border border-gray-100"
                      />
                    </Link>

                    {/* Detalhes e Ações */}
                    <div className="flex-grow flex justify-between">
                      <div className="flex flex-col justify-between">
                        {/* Informações Principais */}
                        <div onClick={() => handleProductClick(details.id)}>
                          <Link
                            to={`/products/${details.id}`}
                            className="text-lg font-semibold text-gray-800 hover:text-blue-400 transition-colors"
                          >
                            {details.productName}
                          </Link>
                          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{details.rating}</span>
                            <span>| Categoria: {details.category}</span>
                          </div>
                        </div>

                        {/* Preço e Benefícios */}
                        <div className="space-y-2 mt-2">
                          <p className="text-2xl font-extrabold text-gray-800">
                            R${" "}
                            <span className="text-blue-500">
                              {details.price}
                            </span>
                          </p>
                          {details.freeShipping && (
                            <p className="text-sm text-green-600 font-medium flex items-center">
                              <Truck className="w-4 h-4 mr-1" /> Frete Grátis
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Área da Loja (Vendedor) e Botão */}
                      <div className="w-56 flex-shrink-0 text-right space-y-2 pt-1">
                        <p className="text-xs text-gray-500">Vendido por:</p>
                        <p
                          className={`font-bold text-sm ${
                            details.isOfficial
                              ? "text-blue-500"
                              : "text-gray-700"
                          }`}
                        >
                          {details.storeName}
                        </p>
                        {details.isOfficial && (
                          <p className="text-xs text-blue-400 font-semibold flex items-center justify-end">
                            <ShieldCheck className="w-3 h-3 mr-1" /> Loja
                            Oficial
                          </p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-sm font-semibold mt-3 bg-blue-400 hover:bg-blue-500 text-white shadow-md transition-colors"
                          onClick={() => handleProductClick(details.id)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" /> Comprar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
