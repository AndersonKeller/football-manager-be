import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { League } from "../../entities";
import {
  iReturnLeague,
  returnLeagueSchema
} from "../../schemas/league.schemas";
import { AppError } from "../../error";

export const getLeagueByIdService = async (
  leagueId: number
): Promise<iReturnLeague> => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);

  const findLeague: League | null = await leagueRepository.findOne({
    where: {
      id: leagueId
    },
    relations: {
      category: true
    }
  });
  if (!findLeague) {
    throw new AppError("league not found", 404);
  }
  const league = returnLeagueSchema.parse(findLeague);

  return league;
};
