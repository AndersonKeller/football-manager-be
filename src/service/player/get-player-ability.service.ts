import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player, PlayerAbilities } from "../../entities";
import {
  iReturnPlayerWhitAbility,
  returnPlayerWhitAbilitySchema
} from "../../schemas/player.schemas";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const getPlayerAbilityService = async (
  playerId: string
): Promise<iReturnPlayerWhitAbility> => {
  const playerAbilityRepository: Repository<PlayerAbilities> =
    AppDataSource.getRepository(PlayerAbilities);
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);

  const findPlayer: Player | null = await playerRepository.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: {
      nationality: true
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findPlayerAbilities: PlayerAbilities[] | [] =
    await playerAbilityRepository.find({
      where: {
        player: { id: findPlayer?.id }
      },
      relations: {
        ability: true
      },
      order: {
        ability: {
          id: "ASC"
        }
      }
    });
  const playerAbilities = returnPlayerWhitAbilitySchema.parse({
    player: findPlayer,
    abilities: findPlayerAbilities
  });

  return playerAbilities;
};
