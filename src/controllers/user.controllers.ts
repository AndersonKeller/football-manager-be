import { Request, Response } from "express";
import {
  iCreateLogin,
  iCreateUser,
  iReturnLogin,
  iReturnUser
} from "../schemas/user.schemas";
import { createUserService } from "../service/user/create-user.service";
import { createLoginService } from "../service/user/create-login.service";
import { iReturnTeam } from "../schemas/team.schemas";
import { getTeamByUserService } from "../service/user/get-team-by-user-id.service";

export const userController = {
  createUser: async (req: Request, res: Response): Promise<Response> => {
    const userData: iCreateUser = req.body;
    const user: iReturnUser = await createUserService(userData);
    return res.status(201).json(user);
  },
  createLogin: async (req: Request, res: Response): Promise<Response> => {
    const loginData: iCreateLogin = req.body;
    const login: iReturnLogin = await createLoginService(loginData);
    return res.status(200).json(login);
  },
  getTeamByUser: async (req: Request, res: Response) => {
    const userId: string = req.user.id;

    const team: iReturnTeam = await getTeamByUserService(userId);
    return res.status(200).json(team);
  }
};
