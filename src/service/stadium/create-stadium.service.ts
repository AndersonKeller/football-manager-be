import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Stadium, StadiumArea } from "../../entities";
import {
  iCreateStadium,
  iReturnStadium,
  returnStadiumAreaSchema,
  returnStadiumSchema
} from "../../schemas/stadium.schemas";
import { AppError } from "../../error";

export const createStadiumService = async (
  stadiumData: iCreateStadium
): Promise<iReturnStadium> => {
  const stadiumAreaRepository: Repository<StadiumArea> =
    AppDataSource.getRepository(StadiumArea);
  const stadiumRepository: Repository<Stadium> =
    AppDataSource.getRepository(Stadium);

  const findStadiumArea: StadiumArea | null =
    await stadiumAreaRepository.findOne({
      where: {
        id: stadiumData.stadiumArea.id
      }
    });
  if (!findStadiumArea) {
    throw new AppError("Stadium area not found", 404);
  }
  console.log(stadiumData, "data?");
  const createStadium = stadiumRepository.create(stadiumData);
  await stadiumRepository.save(createStadium);

  const stadium = returnStadiumSchema.parse({
    ...createStadium,
    stadiumArea: findStadiumArea
  });

  return stadium;
};
