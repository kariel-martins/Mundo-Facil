import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getByIdMutateOrders } from "@/hooks/orders/mutations/orders.mutate";
import { Package } from "lucide-react";

export function Orders() {
  const { user } = useAuth();
  const { data: orders } = getByIdMutateOrders(user?.user_id ?? "");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Enviado":
        return "text-blue-400 font-bold bg-blue-400/10 rounded-full px-3 py-1 text-xs";
      case "A caminho":
        return "text-yellow-600 font-bold bg-yellow-600/10 rounded-full px-3 py-1 text-xs";
      default:
        return "text-gray-500 font-bold bg-gray-500/10 rounded-full px-3 py-1 text-xs";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
            Meus Pedidos no Mundo Fácil
          </h1>

          <div className="space-y-6">
            {orders?.map((order) => (
              <Card
                key={order.orders.id}
                className="bg-white border border-gray-200 shadow-lg shadow-gray-100 
                         transition-all duration-300 hover:shadow-xl hover:border-blue-400"
              >
                <CardContent className="flex justify-between items-center py-5 px-6">
                  <div className="flex items-center space-x-4">
                    <Package className="w-6 h-6 text-blue-400" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
                        Ordem #
                        <span className="text-blue-400">
                          {order.orders.id.toString().padStart(4, "0")}
                        </span>
                      </h2>
                      <p className="text-md text-gray-500 mt-1">
                        {order.products.productName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-extrabold text-xl text-gray-800">
                      R$ {Number(order.products.price).toFixed(2)}
                    </p>
                    <p className={getStatusStyle(order.orders.status)}>
                      {order.orders.status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {orders?.length === 0 && (
              <div className="text-center p-8 text-gray-500 border border-dashed rounded-lg mt-8">
                Você ainda não fez nenhum pedido. Sua jornada de compra
                simplificada espera por você!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
