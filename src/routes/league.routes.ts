import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import {
  createLeagueCategorySchema,
  createLeagueSchema
} from "../schemas/league.schemas";
import { leagueController } from "../controllers/league.controllers";

export const leagueRoutes: Router = Router();

leagueRoutes.post(
  "/category",
  ensureDataIsValidMiddleware(createLeagueCategorySchema),
  leagueController.createCategory
);
leagueRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLeagueSchema),
  leagueController.createLeague
);
leagueRoutes.get("", leagueController.getAllLeagues);
leagueRoutes.get("/category", leagueController.getAllLeagueCategory);
leagueRoutes.get("/:id", leagueController.getLeagueById);

//teams
leagueRoutes.get("/:id/team", leagueController.getLeagueTeams);
