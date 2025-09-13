import { Router } from "express";
import { abilityController } from "../controllers/ability.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createAbilitySchema } from "../schemas/ability.schemas";

export const abilityRoutes: Router = Router();

abilityRoutes.post(
  "",
  ensureDataIsValidMiddleware(createAbilitySchema),
  abilityController.createAbility
);
abilityRoutes.get("", abilityController.getAllabilities);
