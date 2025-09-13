import { Repository } from "typeorm";
import {
  iCreateFormation,
  iReturnFormation,
  returnFormationSchema
} from "../../schemas/formation.schemas";
import { Formation } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createFormationService = async (
  formationData: iCreateFormation
): Promise<iReturnFormation> => {
  const formationRepository: Repository<Formation> =
    AppDataSource.getRepository(Formation);

  const createFormation = formationRepository.create(formationData);

  await formationRepository.save(createFormation);
  const formation = returnFormationSchema.parse(createFormation);
  return formation;
};
