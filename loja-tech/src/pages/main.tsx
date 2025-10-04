import { CategoryCard } from "@/components/CartCatogory";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Truck, CreditCard, ShieldCheck, CheckSquare } from "lucide-react";

// Definição das Cores Mundo Fácil:
// Cinza Chumbo/Grafite: text-gray-800, bg-gray-700
// Azul Claro/Céu (Destaque): text-blue-400, bg-blue-400, hover:bg-blue-500
// Branco: bg-white

export function Main() {
  return (
    // Fundo branco ou cinza muito claro (bg-gray-50) para um look clean
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      <Navbar />
      
      <main className="min-h-screen max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-16 pt-28">
        
        {/* Banner de Alto Impacto (Sério, Limpo e Focado em Facilidade) */}
        <section className="h-72 w-full rounded-xl p-10 flex items-center justify-between overflow-hidden 
                            bg-gray-100 border border-gray-200 shadow-md">
            
            <div className="relative z-10 space-y-3 max-w-lg">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight">
                    <CheckSquare className="inline w-10 h-10 mr-2 text-blue-400 fill-blue-400/20" />
                    SIMPLIFIQUE SUA COMPRA AGORA
                </h2>
                <p className="text-xl text-gray-600 font-normal">
                    Tudo que você precisa para o dia a dia, em um só lugar. **Organização e conveniência garantidas.**
                </p>
                {/* Botão com cor de destaque discreta (Azul Claro) */}
                <button className="mt-4 px-8 py-3 bg-blue-400 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-500 transition-colors">
                    Ver Todas as Categorias
                </button>
            </div>
            {/* Opcional: Elemento gráfico sutil de fundo */}
            <div className="hidden md:block w-36 h-36 text-gray-300 absolute right-16 top-1/2 transform -translate-y-1/2">
                {/* Ícone grande e discreto para representar "Mundo Fácil" */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </section>

        {/* Barra de Benefícios Clean e Confiável */}
        {/* Fundo branco e texto cinza para seriedade. Ícones no Azul Claro de destaque. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-blue-400" />
                <p className="text-base font-semibold text-gray-700">Frete Rápido e Seguro</p>
            </div>
            <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-blue-400" />
                <p className="text-base font-semibold text-gray-700">Pagamento Facilitado (Pix, Cartão)</p>
            </div>
            <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
                <p className="text-base font-semibold text-gray-700">Garantia de Satisfação Mundo Fácil</p>
            </div>
        </div>

        {/* Seções de Produtos - Foco na Diversidade */}
       
        <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">Moda</h3>
            <CategoryCard nameCategory="Moda Básica" />
        </section>

        <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">Tecnologia Essencial</h3>
            <CategoryCard nameCategory="Tecnologia Essencial" />
        </section>

        <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">Ofertas de Organização</h3>
            <CategoryCard nameCategory="Organização & Limpeza" />
        </section>

        <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">Lazer</h3>
            <CategoryCard nameCategory="Lazer Simples" />
        </section>

         <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-200">Casa e Conforto</h3>
            <CategoryCard nameCategory="Casa & Conforto" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}