import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

import dotenv from "dotenv";
import { InitialSchema1734384710588 } from "../migrations/1734384710588-initialSchema";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "langchat",
  synchronize: false,
  logging: false,
  entities: [User], // Adicione aqui todas as entidades criadastypeorm migration:generate -d src/config/data-source.ts src/migrations/initialSchema
  migrations: [InitialSchema1734384710588],
  subscribers: [],
});
