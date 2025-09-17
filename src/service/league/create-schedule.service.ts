import { Repository } from "typeorm";
import { Game, League, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { any, number } from "zod";
import { leagues } from "../../config.json";
import { inflate } from "zlib";
export const createLeagueScheduleService = async (leagueId: number) => {
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const gameRepository: Repository<Game> = AppDataSource.getRepository(Game);

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
  console.log(findLeague, "findleague");
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
  let games: any = [];
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
  const rodadas: any = [];

  let rounds: any = [];
  let gamesrodada: any = [];
  for (let i = 1; i <= leagues.numberOfTeams * 2 - 2; i++) {
    gamesrodada.push(games[i - 1]);
    games.forEach((game: any, gameIndex: number) => {
      const findHome = gamesrodada.find((item: any, index: number) => {
        if (item.home.id === game.home.id || item.home.id === game.away.id) {
          return item;
        }
      });
      const findAway = gamesrodada.find((item: any, index: number) => {
        if (item.away.id === game.away.id || item.away.id === game.home.id) {
          return item;
        }
      });

      if (!findAway && !findHome && !rounds.includes(game.round)) {
        gamesrodada.push(game);
        rounds.push(game.round);
      }
    });

    rodadas.push({ rodada: i, game: [...gamesrodada] });
    gamesrodada = [];
  }
  // const now = new Date();
  // const date = new Date(now.getFullYear(), now.getMonth() + 1);
  rodadas.forEach((rodada: any) => {
    if (rodada.rodada % 2 != 0) {
      rodada.date = new Date(
        rodada.game[0].schedule.year,
        rodada.game[0].schedule.month - 1,
        Math.floor(rodada.rodada - rodada.rodada / 2) + 1
      );
    } else {
      console.log("else");
      rodada.date = new Date(
        rodada.game[0].schedule.year,
        rodada.game[0].schedule.month - 1,
        rodada.rodada / 2 + 15
      );
    }
  });
  return {
    rodadasl: rodadas.length,
    rodadas
  };
};
