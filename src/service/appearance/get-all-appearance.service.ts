import { Repository } from "typeorm";
import {
  iReturnAllAppearance,
  returnAllAppearanceSchema
} from "../../schemas/appearance.schemas";
import { Appearance } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllAppearanceService =
  async (): Promise<iReturnAllAppearance> => {
    const appearanceRepository: Repository<Appearance> =
      AppDataSource.getRepository(Appearance);
    const findAppearance: Appearance[] | [] = await appearanceRepository.find();

    const appearances = returnAllAppearanceSchema.parse(findAppearance);

    return appearances;
  };
