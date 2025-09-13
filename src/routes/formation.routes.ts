import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createFormationSchema } from "../schemas/formation.schemas";
import { formationController } from "../controllers/formation.controllers";

export const formationRoutes: Router = Router();

formationRoutes.post(
  "",
  ensureDataIsValidMiddleware(createFormationSchema),
  formationController.createFormation
);
formationRoutes.get("", formationController.getAllFormations);
