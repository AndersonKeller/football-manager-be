import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { StadiumArea } from "../../entities";
import {
  iReturnAllStadiumsArea,
  returnAllStadiumAreaSchema
} from "../../schemas/stadium.schemas";

export const getAllStadiumAreasService =
  async (): Promise<iReturnAllStadiumsArea> => {
    const stadiumAreaRepository: Repository<StadiumArea> =
      AppDataSource.getRepository(StadiumArea);

    const findStadiumsArea: StadiumArea[] | [] =
      await stadiumAreaRepository.find({
        relations: {
          stadium: true
        }
      });

    const stadiumsArea = returnAllStadiumAreaSchema.parse(findStadiumsArea);

    return stadiumsArea;
  };
