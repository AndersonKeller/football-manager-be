import {
  iReturnPlayerWhitAbility,
  iReturnPlayerWhitSpecialAbility,
  iUpdatePlayerAbilities
} from "./../schemas/player.schemas";
import { Request, Response } from "express";
import {
  iCreatePlayer,
  iCreatePlayerSpecialAbility,
  iReturnAllPlayers,
  iReturnPlayer,
  iReturnPlayerSpecialAbility
} from "../schemas/player.schemas";
import { createPlayerService } from "../service/player/create-player.service";
import { getAllPlayersService } from "../service/player/get-all-players.service";
import { createPlayerSpecialAbility } from "../service/player/create-player-special-ability.service";
import { getPlayerSpecialAbilityService } from "../service/player/get-player-special-ability.service";
import { getPlayerAbilityService } from "../service/player/get-player-ability.service";
import { updatePlayerAbilityService } from "../service/player/update-player-ability.service";
import { iCreatePlayerPosition } from "../schemas/player-position.schemas";
import { createPlayerPositionService } from "../service/player/create-player-position.service";
import { getPlayerPositionsService } from "../service/player/get-player-positions.service";
import {
  iCreatePlayerAppearance,
  iReturnPlayerAppearance,
  iReturnPlayerWhitAppearances
} from "../schemas/player-appearance.schemas";
import { createPlayerAppearanceService } from "../service/player/create-player-appearance.service";
import { iCreateAppearanceValue } from "../schemas/appearance.schemas";
import { getPlayerAppearanceService } from "../service/player/get-player-appearance.service";
import {
  iCreatePlayerSetting,
  iReturnPlayerSetting,
  iReturnPlayerWhitSetting
} from "../schemas/setting.schemas";
import { createPlayerSettingService } from "../service/player/create-player-setting.service";
import { getPlayerSettingService } from "../service/player/get-player-setting.service";

export const playerController = {
  createPlayer: async (req: Request, res: Response): Promise<Response> => {
    const playerData: iCreatePlayer = req.body;
    const player: iReturnPlayer = await createPlayerService(playerData);
    return res.status(201).json(player);
  },
  getAllPlayers: async (req: Request, res: Response): Promise<Response> => {
    const players: iReturnAllPlayers = await getAllPlayersService();
    return res.status(200).json(players);
  },
  createPlayerSpecialAbility: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerId: string = req.params.id;
    const playerSpecialAbilityData: iCreatePlayerSpecialAbility = req.body;
    const player_special_ability: iReturnPlayerSpecialAbility =
      await createPlayerSpecialAbility(playerId, playerSpecialAbilityData);
    return res.status(201).json(player_special_ability);
  },
  getPlayerSpecialAbility: async (req: Request, res: Response) => {
    const playerId: string = req.params.id;
    const player: iReturnPlayerWhitSpecialAbility =
      await getPlayerSpecialAbilityService(playerId);
    return res.status(200).json(player);
  },
  getPlayerAbility: async (req: Request, res: Response) => {
    const playerId: string = req.params.id;
    const player: iReturnPlayerWhitAbility =
      await getPlayerAbilityService(playerId);
    return res.status(200).json(player);
  },
  updatePlayerAbility: async (req: Request, res: Response) => {
    const playerId: string = req.params.id;
    const abilityData: iUpdatePlayerAbilities = req.body;
    const player: iReturnPlayerWhitAbility = await updatePlayerAbilityService(
      playerId,
      abilityData
    );
    return res.status(200).json(player);
  },
  createPlayerPosition: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerId: string = req.params.id;
    const playerPositionData: iCreatePlayerPosition = req.body;

    const player_position = await createPlayerPositionService(
      playerId,
      playerPositionData
    );
    return res.status(201).json(player_position);
  },
  getPlayerPositions: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerId: string = req.params.id;
    const player_positions = await getPlayerPositionsService(playerId);
    return res.status(200).json(player_positions);
  },
  createPlayerAppearance: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerAppearanceData: iCreatePlayerAppearance = req.body;
    const playerId: string = req.params.id;

    const player_appearance: iReturnPlayerAppearance =
      await createPlayerAppearanceService(playerId, playerAppearanceData);
    return res.status(201).json(player_appearance);
  },
  getPlayerAppearance: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerId: string = req.params.id;
    const player_appearances: iReturnPlayerWhitAppearances =
      await getPlayerAppearanceService(playerId);
    return res.status(200).json(player_appearances);
  },
  createPlayerSetting: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const playerSettingData: iCreatePlayerSetting = req.body;
    const playerId: string = req.params.id;
    const player_setting: iReturnPlayerSetting =
      await createPlayerSettingService(playerId, playerSettingData);
    return res.status(201).json(player_setting);
  },
  getPlayerSetting: async (req: Request, res: Response): Promise<Response> => {
    const playerId: string = req.params.id;

    const player_setting: iReturnPlayerWhitSetting =
      await getPlayerSettingService(playerId);
    return res.status(200).json(player_setting);
  }
};
