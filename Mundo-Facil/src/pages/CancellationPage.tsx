import { AlertTriangleIcon, CreditCard, MessageSquareIcon, RepeatIcon } from "lucide-react"; // Importei CreditCardOffIcon e RepeatIcon
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PaymentCancelledPage() { 
  const paymentData = {
    orderId: "PED-12345678-ABCD",
    reason: "Pagamento não autorizado pela administradora do cartão.", // 
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center space-y-8 p-6 text-center bg-gray-50">
      
      <div className="flex flex-col items-center space-y-4">
        <CreditCard className="w-20 h-20 text-red-600" /> 
        {/* Ícone mais específico para pagamento */}
        <h1 className="text-4xl font-extrabold text-gray-900">
          Pagamento Cancelado 😞
        </h1>
        <p className="text-xl text-gray-700 max-w-lg">
          Não foi possível processar o pagamento do seu pedido **#{paymentData.orderId}**.
          Por favor, verifique as informações e tente novamente.
        </p>
      </div>

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3 text-left">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Detalhes do Problema</h2>
        <p className="flex items-start text-gray-600">
          <AlertTriangleIcon className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
          <span className="font-medium">Motivo:</span>
          <span className="ml-auto text-red-700">{paymentData.reason}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2 pl-8">
          Certifique-se de que os dados do cartão, endereço de cobrança ou saldo estão corretos.
        </p>
        <div className="pt-4 border-t mt-4 flex items-center justify-center">
            <MessageSquareIcon className="w-5 h-5 mr-2 text-gray-500" />
            <Link to="/suporte" className="text-sm text-blue-600 hover:underline">
                Precisa de ajuda? Fale com nosso suporte.
            </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to={`/checkout/${paymentData.orderId}`}> {/* Link para a página de checkout para tentar novamente */}
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors flex items-center">
            <RepeatIcon className="w-5 h-5 mr-2" />
            Tentar Pagamento Novamente
          </Button>
        </Link>
        <Link to="/minha-conta/pedidos"> {/* Pode ser "Meus Pedidos" ou "Página Inicial" */}
          <Button variant="outline" className="w-full sm:w-auto text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors">
            Ver Meus Pedidos
          </Button>
        </Link>
      </div>
    </div>
  );
}