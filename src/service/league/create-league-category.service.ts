import { Repository } from "typeorm";
import {
  iCreateLeagueCategory,
  iReturnCategoryLeague,
  returnLeagueCategorySchema
} from "../../schemas/league.schemas";
import { LeagueCategory } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createLeagueCategoryService = async (
  leagueCategoryData: iCreateLeagueCategory
): Promise<iReturnCategoryLeague> => {
  const leagueCategoryRepository: Repository<LeagueCategory> =
    AppDataSource.getRepository(LeagueCategory);

  const createLeaguecategory =
    leagueCategoryRepository.create(leagueCategoryData);
  await leagueCategoryRepository.save(createLeaguecategory);

  const leagueCategory = returnLeagueCategorySchema.parse(createLeaguecategory);

  return leagueCategory;
};
