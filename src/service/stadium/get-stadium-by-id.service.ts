import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Stadium } from "../../entities";
import {
  iReturnStadium,
  returnAllStadiumsSchema,
  returnStadiumSchema
} from "../../schemas/stadium.schemas";
import { AppError } from "../../error";

export const getStadiumByIdService = async (
  stadiumId: number
): Promise<iReturnStadium> => {
  const stadiumRepository: Repository<Stadium> =
    AppDataSource.getRepository(Stadium);

  const findStadium: Stadium | null = await stadiumRepository.findOne({
    where: {
      id: stadiumId
    },
    relations: {
      stadiumArea: true
    }
  });
  if (!findStadium) {
    throw new AppError("Stadium not found", 404);
  }

  const stadium = returnStadiumSchema.parse(findStadium);
  return stadium;
};
