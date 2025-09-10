import { AppError } from "../../../errors/AppErro";
import { publishCreateProductRequest } from "../../../messages/producers/product.producers";
import { ProductInsert, productStore } from "../dtos/types.dto.product";
import { ProductRepository } from "../repositories/repository.product";

export class ProductService {
  private repo = new ProductRepository();

  // helper para padronizar tratamento de erros
  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error(`Erro em ${context}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  public async createProduct(data: ProductInsert): Promise<productStore> {
    return this.execute(async () => {
      const product = await this.repo.create(data);
      if (!product.stores.storeName || !product.stores.email || !product.products.id || !product.products.productName || !product.products.image || !product.products.price) throw new AppError("Erro ao criar o Produto", 400);
      await publishCreateProductRequest({
        email: product.stores.email,
        product_id: product.products.id,
        price: product.products.price,
        productName: product.products.productName,
        image: product.products.image,
        storeName: product.stores.storeName
    })
      return product;
    }, "Erro ao criar o produto",
    "products/services/service.product.ts/createProduct"
);
  }

   public async getByIdProduct(product_id:string): Promise<ProductInsert> {
    return this.execute(
      async ()=> {
        const result = await this.repo.getById(product_id)
        if (!result) throw new AppError("Produto não encotrado", 404)
        return result
      },"Erro ao buscar o produto",
      "products/services/service.product.ts/getByIdProduct"
    )
   }

   public async getAllProduct(): Promise<ProductInsert[]> {
    return this.execute(
      async ()=> {
        const result = await this.repo.getAll()
        if (!result) throw new AppError("Não há Produtos", 404)
        return result
      }, "Erro ao buscar produtos",
       "products/services/service.product.ts/getAllProduct"
    )
   }

   public async updateProduct(product_id: string, data: ProductInsert): Promise<ProductInsert> {
    return this.execute(
      async ()=> {
        const result = await this.repo.update(product_id, data)
      if (!result) throw new AppError("Não foi possível atualizar o produto", 400)
        return result
      }, "Erro ao atualizar o produto",
    "products/services/service.product.ts/updateProduct"
    )
   }

   public async deleteProduct(product_id: string): Promise<ProductInsert> {
    return this.execute(
      async ()=> {
        const result = await this.repo.delete(product_id)
        if (!result) throw new AppError("Não foi possível deletar o produto")
        return result
      }, "Erro ao deletar o produto",
      "products/services/service.product.ts/deleteProduct"
    )
   }
}
