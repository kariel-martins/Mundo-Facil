import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailMutate } from "@/hooks/auth/mutations/auth.mutations";
import { useEffect } from "react";

export function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const user_id = searchParams.get("user_id")
    const { mutateAsync: verifyEmail} = verifyEmailMutate()

    useEffect(() => {
    if (token && user_id) {
      verifyEmail({ token, user_id }).catch((err) => {
        console.error("Erro ao verificar e-mail:", err);
      });
    }
  }, []);

  if (!token || !user_id) {
    return <p className="min-h-screen flex items-center justify-center text-xl text-red-500 bg-gray-50">
                Falha na recuperação de token de verificação.
            </p>;
  }
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center space-y-6 p-6 text-center bg-gray-50">
      
      {/* Ícone de sucesso (Verde Sólido) */}
      <div className="p-4 rounded-full bg-white shadow-xl border border-gray-100">
        <CheckCircleIcon className="w-24 h-24 text-green-600" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
        Email Verificado!
      </h1>
      <p className="text-lg text-gray-600 max-w-md">
        Sua conta no Mundo Fácil foi ativada com **sucesso**. Você já pode fazer login e começar a comprar.
      </p>

      {/* Botão no Azul Claro/Céu Sólido */}
      <Link to="/signIn">
        <Button 
            className="mt-6 text-lg font-semibold py-3 px-10 transition-colors 
                       bg-blue-400 hover:bg-blue-500 text-white shadow-md"
        >
          Acessar Sua Conta
        </Button>
      </Link>
    </div>
  );
}