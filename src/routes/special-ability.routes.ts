import { Router } from "express";
import { specialAbilityController } from "../controllers/special-ability.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createSpecialAbilitySchema } from "../schemas/special-abilities.schemas";

export const specialAbilityRoutes: Router = Router();

specialAbilityRoutes.post("",ensureDataIsValidMiddleware(createSpecialAbilitySchema),specialAbilityController.createSpecialAbility);
specialAbilityRoutes.get("", specialAbilityController.getAllSpecialAbility);
