import { returnPlayerWhitSpecialAbilitySchema } from "./../../schemas/player.schemas";
import { Repository } from "typeorm";

import { Player } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const getPlayerSpecialAbilityService = async (
  playerId: string
): Promise<any> => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);
  const findPlayer: Player | null = await playerRepository.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: {
      specialAbilities: {
        specialAbility: true
      },
      nationality: true
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }

  const player = returnPlayerWhitSpecialAbilitySchema.parse({
    player: findPlayer,
    specialAbility: findPlayer.specialAbilities.filter((item) => item.active)
  });
  return player;
};
