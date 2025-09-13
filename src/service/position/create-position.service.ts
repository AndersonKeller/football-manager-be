import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Position, PositionCategory } from "../../entities";
import {
  iCreatePosition,
  iReturnPosition,
  returnPositionSchema
} from "../../schemas/position.schemas";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const createPositionService = async (
  positiondata: iCreatePosition
): Promise<iReturnPosition> => {
  const positionRepository: Repository<Position> =
    AppDataSource.getRepository(Position);
  const positionCategoryRepository: Repository<PositionCategory> =
    AppDataSource.getRepository(PositionCategory);
  const findCategory: PositionCategory | null =
    await positionCategoryRepository.findOne({
      where: {
        id: positiondata.positionCategory.id
      }
    });
  if (!findCategory) {
    throw new AppError(translate("POSITION_CATEGORY_NOT_FOUND"), 404);
  }
  const createPosition = positionRepository.create(positiondata);

  await positionRepository.save(createPosition);

  const position = returnPositionSchema.parse({
    ...createPosition,
    positionCategory: findCategory
  });

  return position;
};
