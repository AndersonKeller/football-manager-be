import { Repository } from "typeorm";
import {
  iReturnAllStadiums,
  returnAllStadiumsSchema
} from "../../schemas/stadium.schemas";
import { Stadium } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllStadiumsService = async (): Promise<iReturnAllStadiums> => {
  const stadiumRepository: Repository<Stadium> =
    AppDataSource.getRepository(Stadium);

  const findStadiums: Stadium[] | [] = await stadiumRepository.find({
    relations: {
      stadiumArea: true
    }
  });

  const stadiums = returnAllStadiumsSchema.parse(findStadiums);
  return stadiums;
};
