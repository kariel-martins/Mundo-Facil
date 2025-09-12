import { AppError } from "../../../errors/AppErro";
import { CartInsert } from "../dtos/cart.type.dto";
import { CartRepository } from "../repositories/cart.repository";

export class CartService {
  private repo = new CartRepository();
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

  public async createCart(
    data: CartInsert
  ): Promise<CartInsert> {
    return this.execute(
      async () => {
        const verifyCart = await this.repo.findCart(data.user_id);
        if (!verifyCart) throw new AppError("Carrinho não existe");
        const cart = await this.repo.create(data);
        if (!cart) throw new AppError("Erro ao criar o carrinho", 400);
        return cart;
      },
      "Erro ao criar o carrinho",
      "products/services/service.product.ts/createProduct"
    );
  }

  public async getByIdCart(cart_id: string): Promise<CartInsert> {
    return this.execute(
      async () => {
        const cart = await this.repo.findCart(cart_id);
        if (!cart) throw new AppError("carrinho não encontrado", 404);
        return cart;
      },
      "Erro ao buscar o carrinho",
      "carts/services/cart.service.ts/getCart"
    );
  }

  public async getAllCart(): Promise<CartInsert[]> {
    return this.execute(
      async () => {
        const carts = await this.repo.findAllCart();
        if (!carts) throw new AppError("Não há carrinhos", 404);
        return carts;
      },
      "Erro ao buscar carrinhos",
      "carts/services/cart.service.ts/getAllCart"
    );
  }

  public async updateCart(
    cart_id: string,
    data: CartInsert
  ): Promise<CartInsert> {
    return this.execute(
      async () => {
        const cart = await this.repo.updateCart(cart_id, data);
        if (!data)
          throw new AppError("Não foi possível atualizar o carrinho", 404);
        return cart;
      },
      "Erro ao atualizar o carrinho",
      "carts/services/cart.service.ts/updateCart"
    );
  }
  public async deleteCart(cart_id: string): Promise<CartInsert> {
    return this.execute(
      async () => {
        const cart = await this.repo.deleteCart(cart_id);
        if (!cart) throw new AppError("Não foi possível deletar o carrinho");
        return cart;
      },
      "Erro ao deletar o carrinho",
      "carts/services/cart.service.ts/deleteCart"
    );
  }
}
