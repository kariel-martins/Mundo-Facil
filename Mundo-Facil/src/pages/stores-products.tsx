import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { PieChartComponent } from "@/components/PieChart";
import { Card, CardContent } from "@/components/ui/card";
import { getAllMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { getAllMutateStore } from "@/hooks/stores/mutation/stores.mutate";
import {
  Plus,
  Package,
  DollarSign,
  Store as StoreIcon,
  TrendingUp,
  Trash2,
  Edit,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  productName: string;
  category: string;
  price: number;
  estoque: number;
  image: string;
}

export function StoreProducts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: allProductsData, isLoading, isError } = getAllMutateProducts();
  const { data: allStoresData } = getAllMutateStore(user?.user_id ?? "");
  const { store_id } = useParams();

  const storeInfo = allStoresData?.find((store) => store.id === store_id);
  const storeProducts: Product[] =
    allProductsData?.filter((product) => product?.store_id === store_id) || [];

  const storeProductsCategories = storeProducts.map(
    (product) => product.category
  );

  const totalStock = storeProducts.reduce(
    (sum, product) => sum + product.estoque,
    0
  );
  const totalProducts = storeProducts.length;
  const averagePrice =
    totalProducts > 0
      ? storeProducts.reduce((sum, product) => sum + Number(product.price), 0) /
        totalProducts
      : 0;

  function handleProduct(productId: string) {
    navigate(`/stores/${store_id}/products/manage/${productId}`);
  }
  function handleDeleteProduct(e: React.MouseEvent, productId: string) {
    e.stopPropagation();
    if (
      window.confirm(
        "Tem certeza que deseja remover este produto? Esta ação é irreversível."
      )
    ) {
      console.log(`Excluindo produto: ${productId}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 pt-28">
        {isLoading || !storeInfo ? (
          <p className="text-center mt-10 text-blue-500 font-semibold">
            Carregando painel da loja...
          </p>
        ) : isError ? (
          <p className="text-center mt-10 text-red-500 font-semibold">
            Erro ao carregar os dados da loja.
          </p>
        ) : (
          <div className="space-y-10">
            {/* Cabeçalho do Painel */}
            <div className="flex justify-between items-center border-b pb-4">
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center">
                <StoreIcon className="w-6 h-6 mr-2 text-blue-500" />
                Painel da Loja:{" "}
                <span className="text-blue-500 ml-2">
                  {storeInfo.storeName}
                </span>
              </h1>
              {/* Botão de Cadastrar Produto (Azul Claro) */}
              <Link to={`/stores/${store_id}/products/cadastro`}>
                <Button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-md transition-colors">
                  <Plus className="w-5 h-5 mr-2" />
                  Cadastrar Novo Produto
                </Button>
              </Link>
            </div>
            {/* Seção de Estatísticas e Gráfico (MANTIDA) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card de Estatísticas */}
              <Card className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                  Visão Geral
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-blue-400" />{" "}
                      Produtos Ativos
                    </span>
                    <span className="font-bold text-xl text-gray-800">
                      {totalProducts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />{" "}
                      Estoque Total
                    </span>
                    <span className="font-bold text-xl text-gray-800">
                      {totalStock}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />{" "}
                      Preço Médio
                    </span>
                    <span className="font-bold text-xl text-gray-800">
                      R$ {averagePrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Card do Gráfico de Pizza */}
              <Card className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                  Distribuição por Categoria
                </h2>
                <div className="h-64 flex justify-center items-center">
                  <PieChartComponent categories={storeProductsCategories} />
                </div>
              </Card>
            </div>
            {/* Lista de Produtos da Loja (Tabela/Grid Clean) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                Lista de Produtos ({totalProducts})
              </h2>
              <div className="space-y-4">
                {/* Se não houver produtos, exibe a mensagem clean */}
                {totalProducts === 0 ? (
                  <div className="col-span-full p-10 text-center text-gray-500 border border-dashed rounded-xl bg-white shadow-sm">
                    <Package className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-lg">
                      Sua loja ainda não tem produtos cadastrados.
                    </p>
                    <p className="text-sm mt-1">
                      Use o botão "Cadastrar Novo Produto" para começar a
                      vender.
                    </p>
                  </div>
                ) : (
                  // Grid/Lista de Produtos
                  <div className="grid grid-cols-1 gap-4">
                    {storeProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-400/50"
                      >
                        <CardContent className="flex items-center py-4 px-6">
                          {/* Imagem do Produto */}
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-100 mr-4 flex-shrink-0"
                          />

                          {/* Nome e Categoria (Área Clicável para Detalhes/Edição) */}

                          <div
                            className="flex-grow cursor-pointer"
                            onClick={() => handleProduct(product.id)}
                          >
                            <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-500 transition-colors">
                              {product.productName}
                            </h3>

                            <p className="text-sm text-gray-500">
                              Categoria:{" "}
                              <span className="font-medium text-gray-700">
                                {product.category}
                              </span>
                            </p>
                          </div>

                          {/* Preço e Estoque */}
                          <div className="text-right space-y-1 mr-6 flex-shrink-0">
                            <p className="font-bold text-xl text-blue-500">
                              R$
                              {Number(product.price).toFixed(2)}
                            </p>

                            <p className="text-sm text-gray-600">
                              Estoque:
                              <span className="font-semibold">
                                {product.estoque}
                              </span>
                            </p>
                          </div>
                          {/* Botões de Ação (Menu Delete/Update) */}
                          <div className="flex space-x-2 flex-shrink-0">
                            {/* Botão de Editar (Azul Claro - Ação Neutra) */}
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProduct(product.id);
                              }}
                              size="icon"
                              title="Editar Produto"
                              className="bg-blue-400/10 text-blue-600 hover:bg-blue-400/20 shadow-none transition-all duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            {/* Botão de Deletar (Vermelho Suave - Ação de Perigo) */}
                            <Button
                              onClick={(e) =>
                                handleDeleteProduct(e, product.id)
                              }
                              size="icon"
                              title="Remover Produto"
                              className="bg-red-400/10 text-red-600 hover:bg-red-400/20 shadow-none transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
