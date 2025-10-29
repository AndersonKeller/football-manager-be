import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Team } from "../../entities";
import { iReturnTeam, returnTeamSchema } from "../../schemas/team.schemas";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const getTeamByUserService = async (
  userId: string
): Promise<iReturnTeam> => {
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);

  const findTeam: Team | null = await teamRepository.findOne({
    where: {
      user: {
        id: userId
      }
    },
    relations: {
      formation: true,
      stadium: { stadiumArea: true },
      league: {
        nationality: true,
        category: true
      },
      user: true,
      nationality: true
    },
    order: {
      createdAt: { direction: "DESC" }
    }
  });
  if (!findTeam) {
    throw new AppError(translate("TEAM_NOT_FOUND"), 404);
  }
  const team = returnTeamSchema.parse(findTeam);

  return team;
};
