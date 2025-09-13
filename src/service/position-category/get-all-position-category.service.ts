import { Repository } from "typeorm";
import {
  iReturnAllPositionCategory,
  returnAllPositionCategorySchema
} from "../../schemas/position-category.schemas";
import { PositionCategory } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllPositionCategoryService =
  async (): Promise<iReturnAllPositionCategory> => {
    const positionCategoryRepository: Repository<PositionCategory> =
      AppDataSource.getRepository(PositionCategory);

    const findPositionCategory: PositionCategory[] | [] =
      await positionCategoryRepository.find();

    const position_category =
      returnAllPositionCategorySchema.parse(findPositionCategory);

    return position_category;
  };
