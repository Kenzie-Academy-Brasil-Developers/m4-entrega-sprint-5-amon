import createUserService from "../services/users/createUser.services";
import updateUserService from "../services/users/updateUser.services";
import listUsersService from "../services/users/listUsers.services";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest, IUserUpdate } from "../interfaces/users/index";
import softDeleteUserService from "../services/users/softDeleteUser.services";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(instanceToPlain(users));
};

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const { id } = req.params;
  const bodyId = req.body.id;
  const updatedUser = await updateUserService(user, id, bodyId);
  return res.json(updatedUser);
};

const softDeleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await softDeleteUserService(id);
  return res.status(204).json();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  softDeleteUserController,
};
