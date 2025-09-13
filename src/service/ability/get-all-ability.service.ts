import { Repository } from "typeorm";
import {
  iReturnAllAbility,
  returnAllAbilitiesSchema
} from "../../schemas/ability.schemas";
import { Ability } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllAbilityService = async (): Promise<iReturnAllAbility> => {
  const abilityRepository: Repository<Ability> =
    AppDataSource.getRepository(Ability);

  const findabilities: Ability[] | [] = await abilityRepository.find();

  const abilities = returnAllAbilitiesSchema.parse(findabilities);

  return abilities;
};
