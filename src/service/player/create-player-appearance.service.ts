import { Repository } from "typeorm";
import {
  Appearance,
  AppearanceValue,
  Player,
  PlayerAppearances
} from "../../entities";
import {
  iCreatePlayerAppearance,
  iReturnPlayerAppearance,
  returnPlayerAppearanceSchema
} from "../../schemas/player-appearance.schemas";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const createPlayerAppearanceService = async (
  playerId: string,
  playerAppearanceData: iCreatePlayerAppearance
): Promise<any> => {
  const playerRepsoitory: Repository<Player> =
    AppDataSource.getRepository(Player);
  const appearanceRepository: Repository<Appearance> =
    AppDataSource.getRepository(Appearance);
  const appearanceValueRepository: Repository<AppearanceValue> =
    AppDataSource.getRepository(AppearanceValue);
  const playerAppearanceRepository: Repository<PlayerAppearances> =
    AppDataSource.getRepository(PlayerAppearances);

  const findPlayer: Player | null = await playerRepsoitory.findOne({
    where: {
      id: parseInt(playerId)
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findAppearance: Appearance | null = await appearanceRepository.findOne({
    where: {
      id: playerAppearanceData.appearance.id
    }
  });
  if (!findAppearance) {
    throw new AppError(translate("APPEARANCE_NOT_FOUND"), 404);
  }
  if (
    Number(playerAppearanceData.value) > findAppearance.max! ||
    Number(playerAppearanceData.value) < findAppearance.min!
  ) {
    throw new AppError(translate("MIN_MAX_APPEARANCE_ERROR"), 404);
  }
  const findPlayerAppearance: PlayerAppearances | null =
    await playerAppearanceRepository.findOne({
      where: {
        appearance: {
          id: findAppearance.id
        },
        player: {
          id: findPlayer.id
        }
      },
      relations: {
        appearance: true,
        appearanceValue: true,
        player: true
      }
    });

  const createAppearanceValue = appearanceValueRepository.create({
    ...findAppearance,
    appearance: {
      id:
        findPlayerAppearance?.appearance.id ??
        playerAppearanceData.appearance.id
    },
    value: playerAppearanceData.value
  });
  if (findPlayerAppearance) {
    createAppearanceValue.id = findPlayerAppearance.appearanceValue.id;
  }

  await appearanceValueRepository.save(createAppearanceValue);
  const createPlayerAppearance = playerAppearanceRepository.create({
    value: Number(createAppearanceValue.value),
    appearance: {
      id: findAppearance.id
    },
    player: { id: findPlayer.id },
    appearanceValue: {
      id: createAppearanceValue.id
    }
  });
  if (findPlayerAppearance?.player.id === findPlayer.id) {
    createPlayerAppearance.id = findPlayerAppearance.id;
  }

  await playerAppearanceRepository.save(createPlayerAppearance);

  const player_appearance = returnPlayerAppearanceSchema.parse({
    ...createAppearanceValue,
    appearance: {
      id: createPlayerAppearance.appearance.id,
      name: findAppearance.name
    },
    value: Number(createAppearanceValue.value)
  });

  return player_appearance;
};
