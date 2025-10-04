import { Mail, Github, LinkedinIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    
    // Fundo branco e borda sutil para manter a limpeza
    <footer className="w-full bg-white border-t border-gray-200 shadow-md shadow-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        
        {/* Layout de Conteúdo: Branding, Links e Mídias Sociais */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          
          {/* Branding - Foco na Seriedade (Texto Cinza Sólido) */}
          <div className="space-y-2">
             {/* Logo com texto cinza chumbo e destaque simples em Azul Claro */}
             <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
               MUNDO <span className="text-blue-400">FÁCIL</span>
             </h1>
             <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Mundo Fácil. Todos os direitos reservados.
             </p>
             <p className="text-xs text-gray-400">
                A Vida Mais Simples Começa Aqui.
             </p>
          </div>

          {/* Links de Navegação - Limpos e Úteis */}
          <div className="flex flex-wrap space-x-6 text-gray-600 font-medium">
            <Link to="/about" className="hover:text-blue-400 transition-colors">
                Sobre Nós
            </Link>
            <Link to="/support" className="hover:text-blue-400 transition-colors">
                Ajuda e Suporte
            </Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Termos de Uso
            </Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacidade
            </Link>
          </div>

          {/* Ícones Sociais - Simplificados e no Tom Certo */}
          <div className="flex space-x-4">
            {/* Ícones discretos, hover no Azul Claro de destaque */}
            <a href="www.linkedin.com/in/kariel-martins" className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-blue-400 transition-all duration-300">
                 <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-blue-400 transition-all duration-300">
                <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/kariel-martins/lojaTech" className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-300">
                <Github className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}