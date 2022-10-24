import createSessionService from "../services/session/createSession.services";
import { IUserLogin } from "../interfaces/users/index";
import { Request, Response } from "express";

const createSessionController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const token = await createSessionService(data);
  return res.json({ token });
};

export { createSessionController };
