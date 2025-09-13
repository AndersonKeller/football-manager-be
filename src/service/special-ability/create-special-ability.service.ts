import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { SpecialAbility } from "../../entities";
import {
  iCreateSpecialAbility,
  iReturnSpecialAbility,
  returnSpecialAbilitySchema
} from "../../schemas/special-abilities.schemas";

export const createSpecialAbilityService = async (
  special_ability_data: iCreateSpecialAbility
): Promise<iReturnSpecialAbility> => {
  const specialAbilitiesRepository: Repository<SpecialAbility> =
    AppDataSource.getRepository(SpecialAbility);

  const createSpecialAbility =
    specialAbilitiesRepository.create(special_ability_data);

  await specialAbilitiesRepository.save(createSpecialAbility);

  const special_ability =
    returnSpecialAbilitySchema.parse(createSpecialAbility);

  return special_ability;
};
