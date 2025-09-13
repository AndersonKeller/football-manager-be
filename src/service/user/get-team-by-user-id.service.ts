import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Team } from "../../entities";
import { iReturnTeam, returnTeamSchema } from "../../schemas/team.schemas";
import { AppError } from "../../error";

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
    }
  });
  if (!findTeam) {
    throw new AppError("Team not found", 404);
  }
  const team = returnTeamSchema.parse(findTeam);

  return team;
};
