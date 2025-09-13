import { Request, Response } from "express";
import {
  iCreateAbility,
  iReturnAbility,
  iReturnAllAbility
} from "../schemas/ability.schemas";
import { getAllAbilityService } from "../service/ability/get-all-ability.service";
import { createAbilityService } from "../service/ability/create-ability.service";

export const abilityController = {
  createAbility: async (req: Request, res: Response): Promise<Response> => {
    const abilityData: iCreateAbility = req.body;
    const ability: iReturnAbility = await createAbilityService(abilityData);
    return res.status(201).json(ability);
  },
  getAllabilities: async (req: Request, res: Response): Promise<Response> => {
    const abilities: iReturnAllAbility = await getAllAbilityService();
    return res.status(200).json(abilities);
  }
};
