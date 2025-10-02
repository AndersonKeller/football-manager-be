import { Repository } from "typeorm";
import { Game, League, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { any, number } from "zod";
import { leagues } from "../../config.json";
import { inflate } from "zlib";
import { iCreateGame, iCreateRound } from "../../schemas/game.schemas";
import { Round } from "../../entities/round.entitie";
export const createLeagueScheduleService = async (leagueId: number) => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const gameRepository: Repository<Game> = AppDataSource.getRepository(Game);
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
  let schedule = findLeague.schedule[0];
  if (!findLeague.schedule.length) {
    const createSchedule = scheduleRepository.create({
      league: findLeague,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    });
    await scheduleRepository.save(createSchedule);
    schedule = createSchedule;
  }
  let games: iCreateGame[] = [];
  const numTimes = findLeague.team.length;

  let round = 1;

  for (let i = 0; i < numTimes; i++) {
    // round = 1;
    for (let j = i + 1; j < numTimes; j++) {
      // Gerar jogos para o primeiro turno

      if (i != j) {
        let createGame = gameRepository.create({
          home: findLeague.team[i],
          away: findLeague.team[j],
          round,

          schedule
        });
        await gameRepository.save(createGame);
        games.push(createGame);
        round++;
        // // Gerar jogos para o segundo turno

        createGame = gameRepository.create({
          home: findLeague.team[j],
          away: findLeague.team[i],
          round: round,

          schedule
        });
        await gameRepository.save(createGame);

        games.push(createGame);
        round++;
      }
    }
  }
  const rodadas: iCreateRound[] = [];

  let rounds: number[] = [];
  let gamesrodada: iCreateGame[] = [];
  for (let i = 1; i <= leagues.numberOfTeams * 2 - 2; i++) {
    gamesrodada.push(games[i - 1]);
    games.forEach((game) => {
      const findHome = gamesrodada.find((item) => {
        if (item.home.id === game.home.id || item.home.id === game.away.id) {
          return item;
        }
      });
      const findAway = gamesrodada.find((item) => {
        if (item.away.id === game.away.id || item.away.id === game.home.id) {
          return item;
        }
      });

      if (!findAway && !findHome && !rounds.includes(game.round)) {
        gamesrodada.push(game);
        rounds.push(game.round);
      }
    });

    rodadas.push({ round: i, game: [...gamesrodada] });
    gamesrodada = [];
  }
  //return rodadas;
  for (const rodada of rodadas) {
    if (rodada.round % 2 != 0) {
      console.log("aki par");
      for (const game of rodada.game) {
        const createRound = roundRepository.create({
          date: new Date(
            game.schedule.year,
            game.schedule.month - 1,
            Math.floor(rodada.round - rodada.round / 2) + 1
          ).toISOString(),
          game: game,
          round: Math.floor(rodada.round - rodada.round / 2) + 1,
          schedule: game.schedule
        });
        await roundRepository.save(createRound);
      }
    } else {
      console.log("aki impar");
      for (const game of rodada.game) {
        const createRound = roundRepository.create({
          date: new Date(
            game.schedule.year,
            game.schedule.month - 1,
            rodada.round / 2 + 15
          ).toISOString(),
          game: game,
          round: rodada.round / 2 + 15,
          schedule: game.schedule
        });
        await roundRepository.save(createRound);
      }
    }
  }

  return {
    rodadasl: rodadas.length,
    rodadas
  };
};
