import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Ability } from "../../entities";
import {
  iCreateAbility,
  iReturnAbility,
  returnAbilitySchema
} from "../../schemas/ability.schemas";

export const createAbilityService = async (
  abilityData: iCreateAbility
): Promise<iReturnAbility> => {
  const abilityRepository: Repository<Ability> =
    AppDataSource.getRepository(Ability);
  const createAbility = abilityRepository.create(abilityData);
  await abilityRepository.save(createAbility);

  const ability = returnAbilitySchema.parse(createAbility);

  return ability;
};
