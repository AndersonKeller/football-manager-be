import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Team } from "../../entities";
import {
  iReturnAllTeams,
  returnAllTeamsSchema
} from "../../schemas/team.schemas";

export const getAllTeamsService = async (): Promise<iReturnAllTeams> => {
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);

  const findTeams: Team[] | [] = await teamRepository.find({
    relations: {
      formation: true,
      stadium: { stadiumArea: true },
      league: { category: true },
      user: true,
      nationality: true
    }
  });

  const teams = returnAllTeamsSchema.parse(findTeams);

  return teams;
};
