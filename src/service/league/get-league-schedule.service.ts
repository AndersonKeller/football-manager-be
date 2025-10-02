import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { League } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { Round } from "../../entities/round.entitie";
import {
  iCreateRound,
  iReturnAllRounds,
  returnAllRoundSchema
} from "../../schemas/game.schemas";

export const getLeagueScheduleService = async (
  leagueId: number
): Promise<iReturnAllRounds> => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);
  const roundRepository: Repository<Round> = AppDataSource.getRepository(Round);

  const findLeague: League | null = await leagueRepository.findOne({
    where: {
      id: leagueId
    },
    relations: {
      team: true,
      schedule: true
    }
  });
  if (!findLeague) {
    throw new AppError(translate("LEAGUE_NOT_FOUND"), 404);
  }
  const findRound: Round[] | null = await roundRepository.find({
    where: {
      schedule: {
        league: findLeague
      }
    },
    loadEagerRelations: true,
    relations: {
      game: {
        home: true,
        away: true
      },
      schedule: true
    },
    order: { date: "ASC" }
  });
  const rounds: iReturnAllRounds = [];
  findRound.forEach((round) => {
    const findround = rounds.find((item) => {
      if (item.round === round.round) {
        return round;
      }
    });
    if (!findround) {
      rounds.push({
        id: round.id,
        date: round.date,
        round: round.round,
        games: [round.game]
      });
    } else {
      findround.games.push(round.game);
    }
  });
  const returnRounds = returnAllRoundSchema.parse(rounds);
  return returnRounds;
};
