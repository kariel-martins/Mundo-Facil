import { AppError } from "../../../errors/AppErro";
import { publishCreateProductRequest } from "../../../messages/producers/product.producers";
import { Product, ProductInsert, ProductUpdate, productStore } from "../dtos/types.dto.product";
import { ProductRepository } from "../repositories/repository.product";

export class ProductService {
  private repo = new ProductRepository();

  // Helper para padronizar tratamento de erros
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

  // Método auxiliar para notificação
  private async notifyProductCreated(product: productStore): Promise<void> {
    await publishCreateProductRequest({
      email: product.stores.email,
      product_id: product.products.id,
      price: product.products.price,
      productName: product.products.productName,
      image: product.products.image,
      storeName: product.stores.storeName,
    });
  }

  public async create(store_id: string, data: ProductInsert): Promise<productStore> {
    return this.execute(async () => {
      const store = await this.repo.getStore(store_id);
      if (!store) throw new AppError("Loja não encontrada", 404);

      const product = await this.repo.create(data);

      // dispara evento de criação de produto
      await this.notifyProductCreated(product);

      return product;
    }, "Erro ao criar produto", "products/services/product.service.ts/create");
  }

  public async getById(product_id: string): Promise<Product> {
    return this.execute(async () => {
      const result = await this.repo.getById(product_id);
      if (!result) throw new AppError("Produto não encontrado", 404);
      return result;
    }, "Erro ao buscar produto", "products/services/product.service.ts/getById");
  }

  public async getAll(): Promise<Product[]> {
    return this.execute(async () => {
      const result = await this.repo.getAll();
      return result;
    }, "Erro ao buscar produtos", "products/services/product.service.ts/getAll");
  }

  public async update(product_id: string, data: ProductUpdate): Promise<Product> {
    return this.execute(async () => {
      const result = await this.repo.update(product_id, data);
      if (!result) throw new AppError("Produto não encontrado para atualização", 404);
      return result;
    }, "Erro ao atualizar produto", "products/services/product.service.ts/update");
  }

  public async delete(product_id: string): Promise<Product> {
    return this.execute(async () => {
      const result = await this.repo.delete(product_id);
      if (!result) throw new AppError("Produto não encontrado para exclusão", 404);
      return result;
    }, "Erro ao deletar produto", "products/services/product.service.ts/delete");
  }
}
