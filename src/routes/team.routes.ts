import { Router } from "express";
import { ensureTokenvalidMiddleware } from "../middlewares/ensure-token-is-valid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import { createTeamSchema } from "../schemas/team.schemas";
import { teamController } from "../controllers/team.controllers";

export const teamRoutes: Router = Router();

teamRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(createTeamSchema),
  teamController.createTeam
);
teamRoutes.get("", teamController.getAllTeams);
teamRoutes.get("/:id", teamController.getTeamById);

//player
teamRoutes.get("/:id/player", teamController.getTeamPlayer);

//by-nationalities
