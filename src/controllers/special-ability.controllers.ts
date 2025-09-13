import { Request, Response } from "express";
import {
  iCreateSpecialAbility,
  iReturnAllSpecialAbilities,
  iReturnSpecialAbility
} from "../schemas/special-abilities.schemas";
import { getAllSpecialAbilitiesService } from "../service/special-ability/get-all-special-ability.service";

import { createSpecialAbilityService } from "../service/special-ability/create-special-ability.service";

export const specialAbilityController = {
  createSpecialAbility: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const special_ability_data: iCreateSpecialAbility = req.body;

    const special_ability: iReturnSpecialAbility =
      await createSpecialAbilityService(special_ability_data);

    return res.status(201).json(special_ability);
  },
  getAllSpecialAbility: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const special_abilities: iReturnAllSpecialAbilities =
      await getAllSpecialAbilitiesService();
    return res.status(200).json(special_abilities);
  }
};
