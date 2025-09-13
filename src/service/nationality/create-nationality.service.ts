import { Repository } from "typeorm";
import {
  iCreateNationality,
  iReturnNationality,
  returnNationalitySchema
} from "../../schemas/nationality.schemas";
import { Nationality } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createNationalityService = async (
  nationalityData: iCreateNationality
): Promise<iReturnNationality> => {
  const nationalityRepository: Repository<Nationality> =
    AppDataSource.getRepository(Nationality);

  const createNationality = nationalityRepository.create(nationalityData);

  await nationalityRepository.save(createNationality);

  const nationality = returnNationalitySchema.parse(createNationality);

  return nationality;
};
