import { getAllMutateProducts } from "@/hooks/products/mutation/product.mutate";
import { ProductCard } from "./CardProducts";

type CategoryProps = {
  nameCategory: string
}

export function CategoryCard({nameCategory}: CategoryProps) {
  const { data: products, isLoading, isError } = getAllMutateProducts();

  return (
    <section id={nameCategory.toLowerCase().replace(/\s/g, "-")} className="py-8">
      {/* Container de Produtos: Scroll Horizontal Limpo e Espaçado */}
      <div className="flex overflow-x-auto overflow-y-hidden py-4 -mx-6 px-6 lg:px-8 space-x-6"> 
        
        <div className="flex space-x-6"> 
          {isLoading ? (
            // Mensagem de carregamento direta e limpa
            <p className="text-gray-600 font-medium">Carregando produtos para simplificar...</p>
          ) : isError ? (
            <p className="text-red-600 font-medium">Erro ao buscar produtos. Tente novamente.</p>
          ) : products?.length === 0 ? (
            <p className="text-gray-500">Não há produtos nesta categoria.</p>
          ) : (
            products?.filter((product) => product.category.toLowerCase().includes(nameCategory.toLowerCase()))
              .map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })
          )}
        </div>
      </div>
    </section>
  );
}