import { Search, Bell, Menu, ShoppingCart, Store } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMutateStore } from "@/hooks/stores/mutation/stores.mutate";
import { useForm } from "react-hook-form";

type SearchFormData = {
  search: string;
};

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ showMessages , setShowMessages] = useState("left-full")
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<SearchFormData>();

  const { data } = getAllMutateStore(user?.user_id ?? "");

  const onSearch = (dataSearch: SearchFormData) => {
    navigate(`/search?product=${dataSearch.search}`);
  };

  async function handleStore() {
    if (data?.length === 0) return navigate("/stores/cadastro");
    navigate(`/stores`);
  }

  return (
    // Fundo branco sólido, sem blur ou sombras vibrantes. Borda Cinza sutil.
    <nav className="top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Sólido e Sério */}
          <Link to="/" className="flex items-center space-x-2">
             {/* Logo com texto cinza chumbo e destaque simples em Azul Claro */}
             <div className="text-3xl font-extrabold tracking-tight text-gray-800">
               MUNDO <span className="text-blue-400">FÁCIL</span>
             </div>
          </Link>

          {/* Desktop Navigation - Links Cinzas, Hover Azul Claro */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link
              to="/main"
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

          {/* Search and Actions - Elementos Limpos */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <form onSubmit={handleSubmit(onSearch)}>
                {/* Campo de busca limpo e organizado */}
                <Input
                  placeholder="Buscar produtos..."
                  type="text"
                  className="pl-10 w-64 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-0 transition-all duration-300"
                  {...register("search")}
                />
              </form>
            </div>

            {/* Ícone de Carrinho - Hover no Azul Claro */}
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

            {/* Ícone de Notificação - Hover no Azul Claro */}
            <Button
            onClick={()=> setShowMessages(showMessages === "left-full" ? "right-0" : "left-full")}
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-all duration-300 rounded-lg"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* Ícone de Loja - Hover discreto */}
            <Button
              onClick={handleStore}
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 rounded-lg"
            >
              <Store className="h-5 w-5" />
            </Button>

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
              to={"/main"}
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
        {/* Messages - Mantido Limpo */}
          <div className={`fixed ${showMessages} w-2xs h-96 mt-6 space-y-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-scroll`}>
          <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
            Bem vindo ao Mundo Fácil!<br/>
            Sua jornada de compra simplificada começa agora.
          </div>
        </div>
      </div>
    </nav>
  );
}