import { Repository } from "typeorm";
import { Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getLeagueTeamScheduleService = async (
  leagueId: number,
  teamId: string
) => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findSchedule: Schedule | null = await scheduleRepository.findOne({
    where: {
      league: {
        id: leagueId
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
      }
    },
    order: { game: { round: "ASC" } }
  });
  return { total: findSchedule?.game.length, findSchedule };
};
