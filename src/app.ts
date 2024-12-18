import "reflect-metadata";
import express, {  Application } from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import handleError from "./errors";

// Inicialização do App
export const app: Application = express();

app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

// Middleware de Erro Global
// app.use(handleError);