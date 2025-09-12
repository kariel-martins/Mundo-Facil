import { AppError } from "../../../errors/AppErro";
import { UserInsert } from "../dtos/user.type.dto";
import { UserRepository } from "../repositories/users.repository";

export class UserService {
  private repo = new UserRepository()
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

  public async getByIdUser(user_id: string): Promise<UserInsert> {
    return this.execute(
      async ()=> {
        const user = await this.repo.findUser(user_id)
        if (!user) throw new AppError("Usuário não encontrado",404)
        return user
      }, "Erro ao buscar o usuário",
      "users/services/user.service.ts/getUser"
    )
  }

  public async getByIdAllUser(): Promise<UserInsert[]> {
    return this.execute(
      async ()=> {
        const users = await this.repo.findAllUser()
        if (!users) throw new AppError("Não há usuários", 404)
          return users
      }, "Erro ao buscar usuários",
      "users/services/user.service.ts/getAllUser"
    )
  }

  public async updateUser(user_id: string, data: UserInsert): Promise<UserInsert> {
    return this.execute(
      async ()=> {
        const user = await this.repo.updateUser(user_id, data)
        if (!data) throw new AppError("Não foi possível atualizar o usuário", 404)
        return user
      }, "Erro ao atualizar o usuário",
      "users/services/user.service.ts/updateUser"
    )
  }
  public async deleteUser(user_id: string): Promise<UserInsert> {
    return this.execute(
      async ()=> {
        const user = await this.repo.deleteUser(user_id)
        if (!user) throw new AppError("Não foi possível deletar o usuário")
           return user
      }, "Erro ao deletar o usuário",
      "users/services/user.service.ts/deleteUser"
    )
  }
}