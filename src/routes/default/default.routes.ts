import { Router } from "express";
import { defaultController } from "../../controllers/default.controllers";

export const defaultRoutes: Router = Router();

defaultRoutes.post(
  "/team/:idNationality",
  defaultController.createTeamsByNationality
);
