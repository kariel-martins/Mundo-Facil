import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOutIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { removeAutenticationMutate } from "@/hooks/auth/mutations/auth.mutations";

export function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mutateAsync: removeAuthetication } = removeAutenticationMutate();

  useEffect(() => {
    const removeToken = removeAuthetication();
    console.warn(removeToken);

    const timer = setTimeout(() => {
      logout();
    }, 1500);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center space-y-6 p-6 text-center bg-gray-50">
      <div className="flex items-center space-x-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <LogOutIcon className="w-12 h-12 text-gray-800" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800">
        Saindo da sua conta...
      </h1>

      <p className="text-lg text-gray-600 max-w-md">
        Você está sendo desconectado(a). Redirecionando para a página de login.
      </p>
      <button
        onClick={() => navigate("/signIn", { replace: true })}
        className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline mt-4"
      >
        Clique aqui se não for redirecionado(a) automaticamente.
      </button>
    </div>
  );
}
