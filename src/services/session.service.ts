import { compare } from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import { Token, UserLogin } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export const SessionService = {
  login: async (loginData: UserLogin): Promise<Token> => {
    
    const validatedData = LoginSchema.parse(loginData);
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email: validatedData.email });
    if (!user) throw new Error("User not found");

    const passwordMatch = await compare(validatedData.password, user.password);
    if (!passwordMatch) {
      throw new Error("User or password invalid");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not defined in environment variables");
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });

    const restUser = {
      id: user.id,
      email: user.email,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };

    return { token, restUser };
  },
};
