import { Router } from "express";
import { positionController } from "../controllers/position.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createPositionSchema } from "../schemas/position.schemas";

export const positionRoutes: Router = Router();

positionRoutes.get("", positionController.getAllPositions);
positionRoutes.post(
  "",
  ensureDataIsValidMiddleware(createPositionSchema),
  positionController.createPosition
);
