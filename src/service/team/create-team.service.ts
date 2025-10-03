import { IsNull, Not, Repository } from "typeorm";
import {
  iCreateTeam,
  iReturnTeam,
  returnTeamSchema
} from "../../schemas/team.schemas";
import { Formation, League, Nationality, Stadium, Team } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  formation,
  stadium,
  league_category,
  leagues,
  teams
} from "../../config.json";
import { AppError } from "../../error";

export const createTeamService = async (
  teamData: iCreateTeam,
  userId: string | null
): Promise<iReturnTeam> => {
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
  const formationRepository: Repository<Formation> =
    AppDataSource.getRepository(Formation);
  const stadiumRepository: Repository<Stadium> =
    AppDataSource.getRepository(Stadium);
  const nationalityRepository: Repository<Nationality> =
    AppDataSource.getRepository(Nationality);
  const leagueRepository: Repository<League> =
    AppDataSource.getRepository(League);

  const findTeamNotUser: Team | null = await teamRepository.findOne({
    where: {
      nationality: {
        id: teamData.nationality.id
      },
      user: IsNull()
    },

    relations: {
      user: true,
      nationality: true,
      formation: true,
      stadium: { stadiumArea: true },
      league: { category: true }
    }
  });
  const indexFormation = Math.floor(Math.random() * 4);

  let findFormation: Formation | null = await formationRepository.findOne({
    where: {
      name: formation.initial[indexFormation].name
    }
  });
  if (!findFormation) {
    findFormation = formationRepository.create(
      formation.initial[indexFormation]
    );
    await formationRepository.save(findFormation);
  }
  if (findTeamNotUser && userId) {
    const createStadium = stadiumRepository.create({
      ...findTeamNotUser.stadium,
      name: teamData.stadium.name,
      capacity: findTeamNotUser.stadium.capacity,
      ticket: findTeamNotUser.stadium.capacity
    });

    await stadiumRepository.save(createStadium);

    const updateTeam = teamRepository.create({
      ...findTeamNotUser,
      ...teamData,
      league: findTeamNotUser.league,
      formation: findFormation,
      stadium: createStadium,
      nationality: findTeamNotUser.nationality,
      user: {
        id: userId!
      }
    });

    await teamRepository.save(updateTeam);
    const team = returnTeamSchema.parse({
      ...updateTeam,
      league: updateTeam.league
    });

    return team;
  }

  const createStadium = stadiumRepository.create({
    name: teamData.stadium.name,
    capacity: stadium.initialcapacity,
    ticket: stadium.initialTicket
  });

  await stadiumRepository.save(createStadium);
  const findNationality: Nationality | null =
    await nationalityRepository.findOne({
      where: {
        id: teamData.nationality.id
      }
    });
  if (!findNationality) {
    throw new AppError("nationality not found", 404);
  }

  let findLeague: League | null = await leagueRepository.findOne({
    where: {
      nationality: {
        id: findNationality.id
      }
    },
    relations: { nationality: true, category: true },
    order: {
      division: "DESC"
    }
  });

  if (!findLeague) {
    findLeague = leagueRepository.create({
      category: league_category.default,
      nationality: findNationality,
      name: "LIGA " + findNationality.name,
      division: 1,
      strip_name: "LIGA " + findNationality.name.substring(0, 2).toUpperCase()
    });
    await leagueRepository.save(findLeague);
    for (const [index, item] of new Array(
      leagues.numberOfTeams - 1
    ).entries()) {
      const createStadium = stadiumRepository.create({
        name: "Generic",
        capacity: stadium.initialcapacity,
        ticket: stadium.initialTicket
      });

      await stadiumRepository.save(createStadium);
      const findTeamsDefault = teams.find(
        (item) =>
          item.nationality.toLowerCase() === findNationality.name.toLowerCase()
      );
      const createTeam = teamRepository.create({
        name: findTeamsDefault?.teamsNames[index].name ?? "FC Club",
        short: findTeamsDefault?.teamsNames[index].short ?? "T" + "index",
        stadium: createStadium,
        league: { id: findLeague.id },
        formation: findFormation,

        nationality: findNationality
      });

      await teamRepository.save(createTeam);
    }
  } else {
    const newLeague = leagueRepository.create({
      category: league_category.default,
      nationality: findNationality,
      name: "LIGA " + findNationality.name,
      strip_name: "LIGA " + findNationality.name.substring(0, 2).toUpperCase(),
      division: findLeague.division + 1
    });
    await leagueRepository.save(newLeague);
    findLeague = newLeague;
    const findTeamsDefault = teams.find(
      (item) =>
        item.nationality.toLowerCase() === findNationality.name.toLowerCase()
    );
    for (const [index, item] of new Array(
      leagues.numberOfTeams - 1
    ).entries()) {
      const createStadium = stadiumRepository.create({
        name: "Generic",
        capacity: stadium.initialcapacity,
        ticket: stadium.initialTicket
      });

      await stadiumRepository.save(createStadium);
      const createTeam = teamRepository.create({
        name:
          findTeamsDefault?.teamsNames[index + leagues.numberOfTeams].name ??
          "FC Club",
        short:
          findTeamsDefault?.teamsNames[index + leagues.numberOfTeams].short ??
          "T" + "index",
        stadium: createStadium,
        league: { id: findLeague.id },
        formation: findFormation,

        nationality: findNationality
      });

      await teamRepository.save(createTeam);
    }
  }
  const createTeam = !userId
    ? teamRepository.create({
        ...teamData,

        league: { id: findLeague.id },
        formation: findFormation,
        stadium: createStadium,
        nationality: findNationality
      })
    : teamRepository.create({
        ...teamData,

        league: { id: findLeague.id },
        formation: findFormation,
        stadium: createStadium,
        nationality: findNationality,
        user: {
          id: userId
        }
      });

  await teamRepository.save(createTeam);
  const team = returnTeamSchema.parse({ ...createTeam, league: findLeague });

  return team;
};
