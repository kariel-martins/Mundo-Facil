import { Search, Menu, ShoppingCart, Store } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMutateStore } from "@/hooks/stores/mutation/stores.mutate";
import { useForm } from "react-hook-form";
import { Autorization } from "@/contexts/AutorizationContext";
import { useState } from "react";

type SearchFormData = {
  search: string;
};

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<SearchFormData>();

  const { data } = getAllMutateStore(user?.user_id ?? "");

  const onSearch = (dataSearch: SearchFormData) => {
    navigate(`/search?product=${dataSearch.search}`);
  };

  const { auth, loading } = Autorization();

  if (loading) return null;

  async function handleStore() {
    if (data?.length === 0) return navigate("/stores/cadastro");
    navigate(`/stores`);
  }

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo  */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl font-extrabold tracking-tight text-gray-800">
              MUNDO <span className="text-blue-400">FÁCIL</span>
            </div>
          </Link>

          {/* Desktop Navigation  */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Início
            </Link>
            <Link
              to="/catalog"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Catálogo Completo
            </Link>
            <Link
              to="/orders"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Meus Pedidos
            </Link>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <form onSubmit={handleSubmit(onSearch)}>
                <Input
                  placeholder="Buscar produtos..."
                  type="text"
                  className="pl-10 w-64 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300"
                  {...register("search")}
                />
              </form>
            </div>

            {/* Ícone de Carrinho */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-all duration-300 rounded-lg"
            >
              <Link to={"/carts"}>
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Ícone de Loja  */}
            <Button
              onClick={handleStore}
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 rounded-lg"
            >
              <Store className="h-5 w-5" />
            </Button>

            {/* Botão de login */}
            <div className="flex items-center gap-4">
              {auth?.ok ? (
                <>
                  <span className="text-sm text-gray-700">
                    Olá, {user?.name ?? "Usuário"}
                  </span>
                  <Link
                    to="/logout"
                    className="text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    Sair
                  </Link>
                </>
              ) : (
                <Link
                  to="/signIn"
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Entrar
                </Link>
              )}
            </div>

            {/* Botão de Menu (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 rounded-lg p-4 bg-gray-50 border border-gray-200 shadow-inner">
            <Link
              to={"/"}
              className="block py-2 text-gray-700 hover:text-blue-400 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/catalog"
              className="block py-2 text-gray-700 hover:text-blue-400 transition-colors"
            >
              Catálogo Completo
            </Link>
            <Link
              to="/orders"
              className="block py-2 text-gray-700 hover:text-blue-400 transition-colors"
            >
              Meus Pedidos
            </Link>
            <button
              onClick={handleStore}
              className="w-full text-left block py-2 text-gray-700 hover:text-blue-400 transition-colors"
            >
              Loja
            </button>
            <div className="md:flex items-center relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <form onSubmit={handleSubmit(onSearch)}>
                <Input
                  placeholder="Buscar produtos..."
                  type="text"
                  className="pl-10 w-full bg-white border border-gray-300 rounded-lg focus:border-blue-400 transition-all duration-300"
                  {...register("search")}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
