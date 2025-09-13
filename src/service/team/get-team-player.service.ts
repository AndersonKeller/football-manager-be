import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Team } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { returnTeamPlayerSchema } from "../../schemas/team.schemas";

export const getTeamPlayerService = async (teamId: string) => {
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);

  const findTeam: Team | null = await teamRepository.findOne({
    where: {
      id: teamId
    },
    relations: {
      playerTeams: {
        player: { nationality: true }
      },
      formation: true,
      stadium: { stadiumArea: true },
      league: { category: true },
      user: true,
      nationality: true
    }
  });
  if (!findTeam) {
    throw new AppError(translate("TEAM_NOT_FOUND"), 404);
  }

  const team_player = returnTeamPlayerSchema.parse({
    team: findTeam,
    players: findTeam.playerTeams
  });

  return team_player;
};
