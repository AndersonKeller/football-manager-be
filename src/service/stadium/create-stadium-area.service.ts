import { Repository } from "typeorm";
import {
  iCreateStadiumArea,
  iReturnStadiumArea,
  returnStadiumAreaSchema
} from "../../schemas/stadium.schemas";
import { StadiumArea } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createStadiumAreaService = async (
  stadiumAreaData: iCreateStadiumArea
): Promise<iReturnStadiumArea> => {
  const stadiumAreaRepository: Repository<StadiumArea> =
    AppDataSource.getRepository(StadiumArea);

  const createStadiumArea = stadiumAreaRepository.create(stadiumAreaData);

  await stadiumAreaRepository.save(createStadiumArea);

  const stadiumArea = returnStadiumAreaSchema.parse(createStadiumArea);

  return stadiumArea;
};
