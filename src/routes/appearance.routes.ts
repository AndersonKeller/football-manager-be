import { Router } from "express";
import { appearanceController } from "../controllers/appearance.controllers";

export const appearanceRoutes: Router = Router();

appearanceRoutes.get("", appearanceController.getAllAppearance);
