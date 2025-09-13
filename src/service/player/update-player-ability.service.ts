import { Repository } from "typeorm";
import {
  iPlayerAbilities,
  iReturnPlayerWhitAbility,
  iUpdatePlayerAbilities,
  returnPlayerWhitAbilitySchema
} from "../../schemas/player.schemas";
import { Player, PlayerAbilities } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const updatePlayerAbilityService = async (
  playerId: string,
  abilityData: iUpdatePlayerAbilities
): Promise<any> => {
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
  const abilities: iPlayerAbilities = [];
  for (const ability of abilityData.ability) {
    const findPlayerAbility: PlayerAbilities | null =
      await playerAbilityRepository.findOne({
        where: {
          player: {
            id: findPlayer.id
          },
          ability: {
            id: ability.id
          }
        },
        relations: {
          ability: true
        }
      });
    if (
      ability.value > findPlayerAbility!.ability.max ||
      ability.value < findPlayerAbility!.ability.min
    ) {
      throw new AppError(translate("MIN_MAX_ERROR"), 409);
    }
    const updateAbility = playerAbilityRepository.create({
      ...findPlayerAbility,
      value: ability.value
    });
    await playerAbilityRepository.save(updateAbility);

    abilities.push({
      ability: updateAbility.ability,
      value: updateAbility.value
    });
  }
  const playerAbilities = returnPlayerWhitAbilitySchema.parse({
    player: findPlayer,
    abilities: abilities
  });
  return playerAbilities;
};
