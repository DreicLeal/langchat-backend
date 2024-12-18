import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import bcrypt, { getRounds, hashSync } from "bcrypt";
import { UserUpdate } from "../interfaces/user.interface";

export const UserService = {
  create: async (email: string, password: string) => {
    const repo = AppDataSource.getRepository(User);

    // Verifica se o usuário já existe
    const existingUser = await repo.findOneBy({ email });
    if (existingUser) throw new Error("Email already exists");

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário
    const user = repo.create({ email, password: hashedPassword });
    return await repo.save(user);
  },

  getAll: async () => {
    const repo = AppDataSource.getRepository(User);
    return await repo.find();
  },

  getOne: async (id: string) => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });
    if (!user) throw new Error("User not found");
    return user;
  },

  updateOne: async (id: string, newData: UserUpdate): Promise<User> => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });
    if (!user) throw new Error("User not found");
    if (newData.email) user.email = newData.email;
    if (newData.password) {
      const isEncrypted = getRounds(newData.password);
      user.password = isEncrypted
        ? newData.password
        : hashSync(newData.password, 10);
    }

    // Salvar alterações
    await repo.save(user);

    return user;
  },

  delete: async (id: string) => {
    const repo = AppDataSource.getRepository(User);
    return await repo.delete(id);
  },
};
