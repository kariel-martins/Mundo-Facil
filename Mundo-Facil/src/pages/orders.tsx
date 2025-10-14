import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Orderitems } from "@/components/OrdersItem";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMutateOrders } from "@/hooks/orders/mutations/orders.mutate";
import { Package } from "lucide-react";

export function Orders() {
  const { user } = useAuth();
  const { data: orders } = getAllMutateOrders(user?.user_id ?? "");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pago":
        return "text-green-500 text-center font-bold bg-green-500/10 rounded-full px-3 py-1 text-xs"; // Mudança para verde (sucesso)
      case "Enviado":
        return "text-blue-500 text-center font-bold bg-blue-500/10 rounded-full px-3 py-1 text-xs";
      case "A caminho":
        return "text-yellow-600 text-center font-bold bg-yellow-600/10 rounded-full px-3 py-1 text-xs";
      default:
        return "text-gray-500 text-center font-bold bg-gray-500/10 rounded-full px-3 py-1 text-xs";
    }
  };
  
  // Função auxiliar para formatar a data (opcional, mas bom para design)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 sm:p-8 bg-gray-50"> {/* Adicionado p-4 para mobile */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-gray-800">
            Meus Pedidos no Mundo Fácil
          </h1>

          <div className="space-y-6">
            {orders?.map((order) => (
              <Card
                key={order.id}
                className="bg-white border border-gray-200 shadow-md shadow-gray-100 
                         transition-all duration-300 hover:shadow-lg hover:border-blue-500" // Ajuste de hover para blue-500
              >
                <CardContent className="p-5 sm:p-6"> {/* Ajuste de padding */}
                  <div className="flex justify-between items-start border-b pb-4 mb-4 border-gray-100">
                    
                    {/* Coluna de Detalhes da Ordem e Itens */}
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Package className="w-5 h-5 text-blue-500" /> {/* Ícone mais destacado */}
                        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
                          Ordem #
                          <span className="text-blue-500 ml-1">
                            {order.id.toString().padStart(4, "0")}
                          </span>
                        </h2>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">
                          Data: <span className="font-medium text-gray-700">{formatDate(order.created_at)}</span>
                      </p>
                      
                      {/* Componente de Itens do Pedido */}
                      <div className="mt-4">
                         <Orderitems order_id={order.id}/>
                      </div>
                    </div>

                    {/* Coluna de Status e Total */}
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-extrabold text-2xl text-gray-800 mb-1">
                        R$ {Number(order.total).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">Total</p>
                      <p className={getStatusStyle(order.status)}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {orders?.length === 0 && (
              <div className="text-center p-10 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl mt-8 bg-white">
                <Package className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">Você ainda não fez nenhum pedido.</p>
                <p className="text-sm mt-1">Sua jornada de compra simplificada espera por você!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}