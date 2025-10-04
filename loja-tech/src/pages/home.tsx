import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar: Elegante e flutuante (floating digital element) */}
      <header className="flex fixed w-full justify-between items-center px-10 py-5 bg-white/50 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-lg shadow-blue-500/10">
        <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          NEO-MARKET
        </h1>
        <Link to={"/signIn"}>
          <Button
            variant="ghost"
            className="px-6 py-2 text-lg font-semibold text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 border border-purple-400/50 rounded-lg shadow-md shadow-purple-500/10"
          >
            Entrar
          </Button>
        </Link>
      </header>

      {/* Hero Section: Ultralimpo e futurista */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-16">
        <div className="max-w-3xl text-center space-y-8 animate-fade-in">
          <h2 className="text-6xl font-black tracking-tight leading-snug">
            O Futuro do Comércio é Agora na{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              NEO-MARKET
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Descubra uma experiência de compra ultralimpa e high-tech. Inovação e
            elegância em cada clique.
          </p>
          <Link to={"/signUp"}>
            <Button
              size="lg"
              className="mt-6 px-12 py-7 text-xl font-bold rounded-xl shadow-2xl transition-all duration-500 ease-out transform hover:scale-[1.02] 
                         bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white 
                         shadow-blue-500/50 hover:shadow-purple-500/50 border border-white/20"
            >
              Iniciar Jornada
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer: Minimalista */}
      <footer className="w-full py-5 text-center text-sm text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} NEO-MARKET. Estética Tecnológica.
      </footer>
    </div>
  );
}