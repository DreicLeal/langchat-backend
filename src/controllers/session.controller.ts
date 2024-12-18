import { Request, Response } from "express";
import { UserLogin } from "../interfaces/user.interface";
import { SessionService } from "../services/session.service";

export const SessionController = {
    login: async (req: Request, res: Response): Promise<Response> => {
      try {
        const loginData: UserLogin = req.body;
  
        const loggedIn = await SessionService.login(loginData);
  
        return res.status(200).json({
          token: loggedIn.token,
          user: loggedIn.restUser,
        });
      } catch (error: any) {
        return res.status(401).json({ message: error.message });
      }
    },
  };