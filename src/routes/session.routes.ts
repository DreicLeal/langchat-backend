import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { SessionController } from "../controllers/session.controller";

const router = Router();

// Rotas CRUD de Usuários
router.post("/", SessionController.login);


export default router;