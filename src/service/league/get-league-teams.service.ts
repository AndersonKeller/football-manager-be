import { returnLeagueTeamsSchema } from "./../../schemas/league.schemas";
import { Repository } from "typeorm";
import { iReturnLeagueTeams } from "../../schemas/league.schemas";
import { League } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const getLeagueTeamsService = async (leagueId: number): Promise<any> => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);

  const findLeague: League | null = await leagueRepository.findOne({
    where: {
      id: leagueId
    },
    relations: {
      team: {
        formation: true,
        stadium: true,
        user: true,
        nationality: true
      },
      category: true
    }
  });
  if (!findLeague) {
    throw new AppError(translate("LEAGUE_NOT_fOUND"), 404);
  }

  const league_teams = returnLeagueTeamsSchema.parse({
    league: findLeague,
    teams: findLeague.team
  });

  return league_teams;
};
