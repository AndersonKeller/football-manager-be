import { Repository } from "typeorm";
import {
  iReturnAllLeagueCategory,
  returnAllLeagueCategorySchema
} from "../../schemas/league.schemas";
import { LeagueCategory } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllLeagueCategoryService =
  async (): Promise<iReturnAllLeagueCategory> => {
    const leagueCategoryRepository: Repository<LeagueCategory> =
      AppDataSource.getRepository(LeagueCategory);

    const findLeagueCategory: LeagueCategory[] | [] =
      await leagueCategoryRepository.find();

    const categories = returnAllLeagueCategorySchema.parse(findLeagueCategory);

    return categories;
  };
