import { Repository } from "typeorm";
import { iReturnTeam, returnTeamSchema } from "../../schemas/team.schemas";
import { Team } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const getTeamByIdService = async (
  teamId: string
): Promise<iReturnTeam> => {
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);

  const findTeam: Team | null = await teamRepository.findOne({
    where: {
      id: teamId
    },
    relations: {
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
  const team = returnTeamSchema.parse(findTeam);

  return team;
};
