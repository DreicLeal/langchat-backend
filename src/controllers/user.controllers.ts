import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { UserUpdate } from "../interfaces/user.interface";

export const UserController = {
  create: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.create(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  getOne: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserService.getOne(id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  updateOne: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const newData: UserUpdate = req.body;

    try {
      const updatedUser = await UserService.updateOne(id, newData);
      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await UserService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};
