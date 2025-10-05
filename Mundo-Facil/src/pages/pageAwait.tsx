import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PageAwait() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center space-y-4 p-6 text-center bg-gray-50">
      <CheckCircleIcon className="w-20 h-20 text-green-600" />
      <h1 className="text-4xl font-bold text-gray-800">Ação Concluída!</h1>
      <p className="text-lg text-gray-600 max-w-md">
        Seu pedido foi processado. Enviaremos um email de confirmação em breve.
        Por favor, aguarde.
      </p>
      <Link to="/signIn">
        <Button className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-md transition-colors">
          Voltar ao Login
        </Button>
      </Link>
    </div>
  );
}
