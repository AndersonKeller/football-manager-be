import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Nationality } from "../../entities";
import {
  iReturnAllNationality,
  returnAllNationalitySchema
} from "./../../schemas/nationality.schemas";
export const getAllNationalityService =
  async (): Promise<iReturnAllNationality> => {
    const nationalityRepository: Repository<Nationality> =
      AppDataSource.getRepository(Nationality);

    const findNationalities: Nationality[] | [] =
      await nationalityRepository.find({
        order: {
          name: "ASC"
        }
      });

    const nationalities = returnAllNationalitySchema.parse(findNationalities);

    return nationalities;
  };
