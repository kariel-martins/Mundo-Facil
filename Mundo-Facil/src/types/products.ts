import type { ProductDataForm } from "@/hooks/products/dtos/products.schemas";

export type ProductData = {
    id: string;
    store_id: string;
    productName: string;
    category: string;
    discount: number;
    rating: number;
    price: number;
    description: string;
    priceOrigin: number;
    estoque: number;
    image: string;
};

export interface ProductDataProps {
  ProductData: ProductDataForm;
  store_id: string;
}
