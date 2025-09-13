import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player, PlayerSpecialAbilities, SpecialAbility } from "../../entities";
import {
  iCreatePlayerSpecialAbility,
  iReturnPlayerSpecialAbility,
  returnPlayerSpecialAbilitySchema
} from "../../schemas/player.schemas";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { iReturnAllSpecialAbilities } from "../../schemas/special-abilities.schemas";

export const createPlayerSpecialAbility = async (
  playerId: string,
  playerSpecialAbilityData: iCreatePlayerSpecialAbility
): Promise<iReturnPlayerSpecialAbility> => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);
  const specialAbilitiesRepository: Repository<SpecialAbility> =
    AppDataSource.getRepository(SpecialAbility);
  const playerSpecialAbilityRepository: Repository<PlayerSpecialAbilities> =
    AppDataSource.getRepository(PlayerSpecialAbilities);

  const findPlayer: Player | null = await playerRepository.findOne({
    where: {
      id: parseInt(playerId)
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findSpecialAbility: SpecialAbility[] | [] =
    await specialAbilitiesRepository.find({
      where: {
        id: In(playerSpecialAbilityData.specialAbility.map((item) => item.id))
      }
    });
  if (
    findSpecialAbility.length != playerSpecialAbilityData.specialAbility.length
  ) {
    throw new AppError(translate("SPECIAL_ABILITY_NOT_FOUND"), 404);
  }

  const special_abilities: iReturnAllSpecialAbilities = [];
  let createPlayerSpecialAbility = {} as PlayerSpecialAbilities;
  for (const special_ability of playerSpecialAbilityData.specialAbility) {
    const findPlayerSpecialAbility =
      await playerSpecialAbilityRepository.findOne({
        where: {
          player: {
            id: findPlayer.id
          },
          specialAbility: {
            id: special_ability.id
          }
        },
        relations: {
          specialAbility: true,
          player: true
        }
      });

    createPlayerSpecialAbility = playerSpecialAbilityRepository.create({
      ...findPlayerSpecialAbility,
      ...findPlayerSpecialAbility?.specialAbility,
      ...special_ability,
      id: findPlayerSpecialAbility!.id
    });

    await playerSpecialAbilityRepository.save(createPlayerSpecialAbility);

    special_abilities.push(createPlayerSpecialAbility.specialAbility);
  }
  //   special_abilities.player = findPlayer;
  const player_special_ability = returnPlayerSpecialAbilitySchema.parse({
    ...createPlayerSpecialAbility,
    specialAbility: special_abilities
  });

  return player_special_ability;
};
