import { Router } from "express";
import { playerController } from "../controllers/player.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensure-data-is-valid.middleware";
import {
  createPlayerSchema,
  createPlayerSpecialAbilitySchema,
  updatePlayerAbilitiesSchema
} from "../schemas/player.schemas";
import { ensureNationalityIsValidMiddleware } from "../middlewares/ensure-nationality-is-valid.middleware";
import { createPlayerPositionSchema } from "../schemas/player-position.schemas";
import { createPlayerAppearanceSchema } from "../schemas/player-appearance.schemas";
import { createPlayerSettingSchema } from "../schemas/setting.schemas";
import { createPlayerTeamSchema } from "../schemas/player-team.schemas";

export const playerRoutes: Router = Router();

//player
playerRoutes.post(
  "",
  ensureDataIsValidMiddleware(createPlayerSchema),
  ensureNationalityIsValidMiddleware,
  playerController.createPlayer
);
playerRoutes.get("", playerController.getAllPlayers);

//special-ability
playerRoutes.post(
  "/:id/special-ability",
  ensureDataIsValidMiddleware(createPlayerSpecialAbilitySchema),
  playerController.createPlayerSpecialAbility
);
playerRoutes.get(
  "/:id/special-ability",
  playerController.getPlayerSpecialAbility
);

//ability
playerRoutes.get("/:id/ability", playerController.getPlayerAbility);
playerRoutes.patch(
  "/:id/ability",
  ensureDataIsValidMiddleware(updatePlayerAbilitiesSchema),
  playerController.updatePlayerAbility
);

//position
playerRoutes.post(
  "/:id/position",
  ensureDataIsValidMiddleware(createPlayerPositionSchema),
  playerController.createPlayerPosition
);
playerRoutes.get("/:id/position", playerController.getPlayerPositions);

//appearance
playerRoutes.post(
  "/:id/appearance",
  ensureDataIsValidMiddleware(createPlayerAppearanceSchema),
  playerController.createPlayerAppearance
);
playerRoutes.get("/:id/appearance", playerController.getPlayerAppearance);

//setting
playerRoutes.post(
  "/:id/setting",
  ensureDataIsValidMiddleware(createPlayerSettingSchema),
  playerController.createPlayerSetting
);
playerRoutes.get("/:id/setting", playerController.getPlayerSetting);

//team
playerRoutes.post(
  "/:id/team/:teamId",
  ensureDataIsValidMiddleware(createPlayerTeamSchema),
  playerController.playerIntoTeam
);
