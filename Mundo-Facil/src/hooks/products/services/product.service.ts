import { axiosInstance } from "@/lib/axios";
import { type ProductData } from "@/types/products";
import type { ProductDataForm } from "../dtos/products.schemas";

type CreateProductProps = ProductDataForm & { store_id: string }
type UpdateProductProps = ProductDataForm & { product_id: string }

export class ProductService {
  public async getAll(): Promise<ProductData[]> {
    const result  = await axiosInstance.get("/products");
    return result.data;
  }

  public async getById(product_id: string): Promise<ProductData> {
    const result = await axiosInstance.get(`/products/${product_id}`);
    return result.data;
  }

  public async create(variables: CreateProductProps): 
  Promise<ProductData> {
    const result = await axiosInstance.post(`/products/${variables.store_id}`, variables);
    return result.data;
  }

  public async update(variables: UpdateProductProps): Promise<ProductData> {
    const {product_id, ...data} = variables;
    const result = await axiosInstance.put(`/products/${product_id}`, data);
    return result.data;
  }

  public async remove(product_id: string): Promise<ProductData> {
    const result = await axiosInstance.delete(`/products/${product_id}`);
    return result.data;
  }
}
