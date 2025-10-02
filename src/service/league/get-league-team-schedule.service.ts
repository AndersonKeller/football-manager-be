import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Round } from "../../entities/round.entitie";

export const getLeagueTeamScheduleService = async (
  leagueId: number,
  teamId: string
) => {
  const roundRepository: Repository<Round> = AppDataSource.getRepository(Round);

  const findRound: Round[] | null = await roundRepository.find({
    where: {
      schedule: {
        league: {
          id: leagueId
        }
      },
      game: [
        {
          home: {
            id: teamId
          }
        },
        {
          away: {
            id: teamId
          }
        }
      ]
    },

    relations: {
      game: {
        home: true,
        away: true
      },
      schedule: true
    },
    order: { date: "ASC" }
  });
  return findRound;
};
