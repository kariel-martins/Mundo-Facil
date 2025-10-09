import { CheckCircleIcon, ShoppingCartIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SuccessPage() {
  // Dados de Exemplo (Em um app real, seriam passados por props/contexto/URL)
  const orderData = {
    orderId: "PED-12345678-ABCD",
    totalValue: "R$ 149,90",
    paymentMethod: "Cartão de Crédito",
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center space-y-8 p-6 text-center bg-gray-50">
      
      <div className="flex flex-col items-center space-y-4">
        <CheckCircleIcon className="w-20 h-20 text-green-600 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-900">
          Pagamento Realizado com Sucesso! 🎉
        </h1>
        <p className="text-xl text-gray-700 max-w-lg">
          Obrigado(a) pela sua compra! Seu pedido foi processado e confirmado.
        </p>
      </div>

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3 text-left">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Detalhes da Transação</h2>
        <p className="flex justify-between text-gray-600">
          <span className="font-medium">ID do Pedido:</span>
          <span className="text-green-700 font-bold">{orderData.orderId}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span className="font-medium">Valor Total:</span>
          <span className="font-bold">{orderData.totalValue}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span className="font-medium">Forma de Pagamento:</span>
          <span>{orderData.paymentMethod}</span>
        </p>
        <p className="mt-4 flex items-center text-sm text-gray-500">
          <MailIcon className="w-4 h-4 mr-2" /> 
          Você receberá o email de confirmação em breve.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to="/minha-conta/pedidos">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors flex items-center">
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Acompanhar Pedido
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="w-full sm:w-auto text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors">
            Voltar à Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}