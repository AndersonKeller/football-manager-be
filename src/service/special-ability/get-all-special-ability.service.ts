import { Repository } from "typeorm";
import {
  iReturnAllSpecialAbilities,
  returnAllSpecialAbilitiesSchema
} from "../../schemas/special-abilities.schemas";
import { SpecialAbility } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllSpecialAbilitiesService =
  async (): Promise<iReturnAllSpecialAbilities> => {
    const specialAbilitiesRepository: Repository<SpecialAbility> =
      AppDataSource.getRepository(SpecialAbility);

    const findSpecialAbilities: SpecialAbility[] | [] =
      await specialAbilitiesRepository.find();

    const special_abilities =
      returnAllSpecialAbilitiesSchema.parse(findSpecialAbilities);

    return special_abilities;
  };
