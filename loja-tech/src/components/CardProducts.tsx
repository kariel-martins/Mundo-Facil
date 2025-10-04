import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import type { ProductData } from "@/types/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductData;
  delay?: number;
}

export const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  return ( 
    // Card Limpo e Sóbrio: Fundo branco sólido, borda e sombra suaves (Cinza).
    <Card
      className="w-72 mr-6 py-0 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] 
                 bg-white border border-gray-200 shadow-md shadow-gray-100 
                 overflow-hidden group cursor-pointer" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        {/* Imagem do Produto */}
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Detalhe de Desconto com Cor Sólida (Azul Claro) */}
        <div className="absolute top-3 left-3 bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md shadow-blue-400/30">
          {product.discount}% OFF
        </div>

        {/* Ícone de Favorito Discreto */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-200 shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 text-base leading-snug">
            {product.productName}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {/* Estrelas do Rating */}
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs text-gray-500">{product.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          {/* Preço com Cor Sólida (Cinza Chumbo e Azul Claro) */}
          <div className="space-y-1">
            <span className="text-xl font-extrabold tracking-tight text-gray-800">
              R$ <span className="text-blue-500">{product.price}</span>
            </span>
            <span className="block text-xs text-gray-400 line-through">
              R$ {product.priceOrigin}
            </span>
          </div>

          {/* Botão de Compra com Foco em Facilidade (Azul Claro) */}
          <Link to={`/products/${product.id}`}>
            <Button
              className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 
                       bg-blue-400 hover:bg-blue-500 text-white 
                       shadow-blue-400/30"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};