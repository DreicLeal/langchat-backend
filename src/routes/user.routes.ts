import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

const router = Router();

// Rotas CRUD de Usuários
router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.patch("/:id", UserController.updateOne);
router.delete("/:id", UserController.delete);

export default router;