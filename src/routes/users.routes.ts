import { Router } from "express";
import {
  createUserController,
  listUsersController,
  updateUserController,
  softDeleteUserController,
} from "../controllers/users.controllers";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  softDeleteUserController
);

export default userRoutes;
