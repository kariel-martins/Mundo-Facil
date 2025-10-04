import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { getAllMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { Plus, Package } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function StoreProducts() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = getAllMutateProducts();
  const { store_id } = useParams();
  const products = data;

  function handleProduct(productId: string) {
    navigate(`/stores/${store_id}/products/manage/${productId}`);
  }

  const storeProducts = products?.filter(
    (product) => product?.store_id === store_id
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto pt-16">
          {isLoading ? (
            <p className="text-center mt-20 text-gray-600 font-medium">
              Carregando produtos da loja...
            </p>
          ) : isError ? (
            <p className="text-center mt-20 text-red-500 font-semibold">
              Erro ao carregar loja
            </p>
          ) : (
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
                Produtos da Loja
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {storeProducts?.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => handleProduct(product?.id)}
                    className="cursor-pointer bg-white border border-gray-200 shadow-md 
                                 transition-all ease-in duration-200 hover:scale-[1.03] 
                                 hover:border-blue-400 hover:shadow-lg"
                  >
                    <CardContent className="flex flex-col items-center text-center py-4 space-y-3">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-24 object-contain rounded-md mb-2"
                      />
                      <h2 className="font-semibold text-gray-800">
                        {product.productName}
                      </h2>
                      <p className="text-lg font-bold text-blue-500">
                        R$ {Number(product.price).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}

                {/* Card para cadastrar novo produto na loja (Ação com Azul Claro) */}
                <Link to={`/stores/${store_id}/products/cadastro`}>
                  <Card
                    className="cursor-pointer h-full flex flex-col justify-center items-center py-4 
                               bg-gray-100/70 border border-dashed border-gray-400/50 
                               transition-all ease-in duration-200 hover:scale-[1.03] 
                               hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/15"
                  >
                    <Plus className="h-10 w-10 text-gray-500 hover:text-blue-400 transition-colors" />
                    <p className="text-md font-medium text-gray-600 mt-2">
                      Cadastrar Novo Produto
                    </p>
                  </Card>
                </Link>

                {/* Exibir mensagem se não houver produtos e o card de cadastro estiver presente */}
                {storeProducts?.length === 0 && (
                  <div className="col-span-full p-8 text-center text-gray-500 border border-dashed rounded-lg mt-4 bg-white">
                    <Package className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    <p>
                      Sua loja ainda não tem produtos. Clique em "Cadastrar Novo
                      Produto" para começar a vender.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}