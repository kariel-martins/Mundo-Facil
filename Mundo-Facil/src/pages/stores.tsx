import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMutateStore } from "@/hooks/stores/mutation/stores.mutate";
import { Plus, Store as StoreIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Store() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, isError } = getAllMutateStore(user?.user_id ?? "");
  const store = data;

  function hanbleStore(store_id: string) {
    navigate(`/stores/${store_id}`);
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-50 overflow-x-hidden">
        {isLoading ? (
          <p className="text-center mt-20 text-gray-600 font-medium">
            Carregando seus espaços de venda...
          </p>
        ) : isError ? (
          <p className="text-center mt-20 text-red-500 font-semibold">
            Erro ao acessar o diretório de lojas.
          </p>
        ) : (
          <div className="max-w-7xl mx-auto pt-16">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
              Suas Lojas no Mundo Fácil
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards de Lojas Existentes */}
              {store?.map((store) => (
                <Card
                  key={store.id}
                  onClick={() => hanbleStore(store.id)}
                  className="cursor-pointer h-60 bg-white border border-gray-200 shadow-lg 
                            transition-all ease-out duration-300 hover:scale-[1.03] 
                            hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/15"
                >
                  <CardContent className="flex flex-col h-full justify-center items-center py-4 text-center space-y-4">
                    {/* Ícone store */}
                    <StoreIcon className="h-10 w-10 text-blue-400" /> 
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                      {store.storeName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ID: {store.id.substring(0, 8)}...
                    </p>
                    <p className="text-xs text-blue-500 font-semibold">
                      Gerenciar Loja
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* Card para Cadastrar Nova Loja */}
              <Link to="/stores/cadastro">
                <Card
                  className="cursor-pointer h-60 flex flex-col justify-center items-center py-4 text-center space-y-2 
                          bg-gray-100/70 border border-dashed border-gray-400/50 transition-all ease-out duration-300 
                          hover:scale-[1.03] hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/15"
                >
                  <Plus className="h-10 w-10 text-gray-500 hover:text-blue-400 transition-colors" />
                  <p className="text-md font-medium text-gray-600">
                    Abrir Nova Loja
                  </p>
                  <p className="text-sm text-gray-400">
                    Comece a vender de forma simples.
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}