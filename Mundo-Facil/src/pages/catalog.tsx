import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/header/NavBar";
import { Button } from "@/components/ui/button";
import { useGetAllMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { Filter, Zap } from "lucide-react";
import { ProductCard } from "@/components/CardProducts";
import { useState } from "react";

const MOCK_CATEGORIES = [
  "Casa & Conforto",
  "Organização & Limpeza",
  "Tecnologia Essencial",
  "Saúde & Bem-Estar",
  "Ferramentas & Reparos",
  "Moda Básica",
  "Lazer Simples",
  "Automotivos",
  "Acessórios",
  "Outros",
];

export function CatalogPage() {
  const { data: allProducts, isLoading, isError } = useGetAllMutateProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFreeShipping, setShowFreeShipping] = useState(false);

  const filteredProducts = allProducts?.filter((product) => {
    if (showFreeShipping && product.price <= 100) {
      return false;
    }
    if (selectedCategories.length > 0) {
      return selectedCategories.includes(product.category);
    }

    return true;
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setShowFreeShipping(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 pt-28">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight border-b pb-4">
          Catálogo Completo de Produtos
        </h1>

        <div className="flex space-x-8">
          <aside className="w-64 flex-shrink-0 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit sticky top-28">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Filter className="w-4 h-4 mr-2 text-gray-600" />
              Opções de Filtro
            </h2>

            <div className="space-y-3 mb-6">
              <h3 className="text-md font-semibold text-gray-700">
                Benefícios
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors text-sm">
                <input
                  type="checkbox"
                  checked={showFreeShipping}
                  onChange={() => setShowFreeShipping(!showFreeShipping)}
                  className="form-checkbox text-blue-400 rounded border-gray-300 focus:ring-blue-400"
                />
                <span>Frete Grátis</span>
              </label>
            </div>

            <div className="space-y-3 border-t pt-4">
              <h3 className="text-md font-semibold text-gray-700">
                Categorias
              </h3>
              {MOCK_CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="form-checkbox text-blue-400 rounded border-gray-300 focus:ring-blue-400"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            {(selectedCategories.length > 0 || showFreeShipping) && (
              <Button
                variant="link"
                className="text-sm p-0 text-blue-400 h-auto mt-6 hover:text-blue-500"
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </Button>
            )}
          </aside>

          <div className="flex-grow">
            {isLoading ? (
              <p className="text-gray-600 font-medium text-center py-10">
                Buscando as melhores ofertas para você...
              </p>
            ) : isError ? (
              <p className="text-red-600 font-medium text-center py-10">
                Erro ao carregar o catálogo.
              </p>
            ) : filteredProducts && filteredProducts.length === 0 ? (
              <div className="bg-white p-10 rounded-xl shadow-lg text-center border border-gray-200">
                <Zap className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
                <p className="text-xl font-semibold text-gray-700">
                  Nenhum produto encontrado com os filtros aplicados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10">
                {filteredProducts?.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    delay={index * 50}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
