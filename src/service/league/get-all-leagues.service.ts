import { Repository } from "typeorm";
import {
  iReturnAllLeagues,
  returnAllLeaguesSchema
} from "../../schemas/league.schemas";
import { League } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllLeaguesService = async (): Promise<iReturnAllLeagues> => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);

  const findLeagues: League[] | [] = await leagueRepository.find({
    relations: {
      category: true
    }
  });

  const leagues = returnAllLeaguesSchema.parse(findLeagues);

  return leagues;
};
