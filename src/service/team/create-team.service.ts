import { Repository } from "typeorm";
import {
  iCreateTeam,
  iReturnTeam,
  returnTeamSchema
} from "../../schemas/team.schemas";
import { Formation, League, Nationality, Stadium, Team } from "../../entities";
import { AppDataSource } from "../../data-source";
import { formation, stadium, league_category } from "../../config.json";
import { AppError } from "../../error";
export const createTeamService = async (
  teamData: iCreateTeam,
  userId: string
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

  let findFormation: Formation | null = await formationRepository.findOne({
    where: {
      name: formation.initial.name
    }
  });
  if (!findFormation) {
    findFormation = formationRepository.create(formation.initial);
    await formationRepository.save(findFormation);
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
    relations: { nationality: true, category: true }
  });
  if (!findLeague) {
    findLeague = leagueRepository.create({
      category: league_category.default,
      nationality: findNationality,
      name: "LIGA " + findNationality.name,
      strip_name: "LIGA " + findNationality.name.substring(0, 2).toUpperCase()
    });
    await leagueRepository.save(findLeague);
  }
  const createTeam = teamRepository.create({
    ...teamData,
    user: {
      id: userId
    },
    league: findLeague,
    formation: findFormation,
    stadium: createStadium,
    nationality: findNationality
  });
  await teamRepository.save(createTeam);
  const team = returnTeamSchema.parse(createTeam);

  return team;
};
