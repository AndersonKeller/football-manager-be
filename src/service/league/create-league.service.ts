import { Repository } from "typeorm";
import {
  iCreateLeague,
  iReturnLeague,
  returnLeagueSchema
} from "../../schemas/league.schemas";
import { League, LeagueCategory } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

export const createLeagueService = async (
  leagueData: iCreateLeague
): Promise<iReturnLeague> => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);
  const leagueCategoryRepository: Repository<LeagueCategory> =
    AppDataSource.getRepository(LeagueCategory);
  const findCategory: LeagueCategory | null =
    await leagueCategoryRepository.findOne({
      where: {
        id: leagueData.category.id
      }
    });
  if (!findCategory) {
    throw new AppError("category not found", 404);
  }
  const createLeague = leagueRepository.create(leagueData);
  await leagueRepository.save(createLeague);

  const league: iReturnLeague = returnLeagueSchema.parse({
    ...createLeague,
    category: findCategory
  });

  return league;
};
