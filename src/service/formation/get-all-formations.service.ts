import { Repository } from "typeorm";
import {
  iReturnAllFormation,
  returnAllFormationsSchema
} from "../../schemas/formation.schemas";
import { Formation } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllFormationsService =
  async (): Promise<iReturnAllFormation> => {
    const formationRepository: Repository<Formation> =
      AppDataSource.getRepository(Formation);

    const findFormations: Formation[] | [] = await formationRepository.find();

    const formations = returnAllFormationsSchema.parse(findFormations);

    return formations;
  };
