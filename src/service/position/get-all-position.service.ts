import { Repository } from "typeorm";
import {
  iReturnAllPosition,
  returnAllPositionSchema
} from "../../schemas/position.schemas";
import { Position } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllPositionService = async (): Promise<iReturnAllPosition> => {
  const positionRepository: Repository<Position> =
    AppDataSource.getRepository(Position);

  const findPositions: Position[] | [] = await positionRepository.find({
    relations: {
      positionCategory: true
    }
  });

  const positions = returnAllPositionSchema.parse(findPositions);

  return positions;
};
