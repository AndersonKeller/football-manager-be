import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createLoginSchema, createUserSchema } from "../schemas/user.schemas";
import { userController } from "../controllers/user.controllers";
import { languageMiddleware } from "../middlewares/language.middleware";
import { ensureTokenvalidMiddleware } from "../middlewares/ensure-token-is-valid.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  userController.createUser
);
userRoutes.post(
  "/login",
  ensureDataIsValidMiddleware(createLoginSchema),
  userController.createLogin
);
userRoutes.get(
  "/team",
  ensureTokenvalidMiddleware,
  userController.getTeamByUser
);
