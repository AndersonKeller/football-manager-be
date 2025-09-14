import { Repository } from "typeorm";
import { League, Nationality, Team } from "../../entities";
import { AppDataSource } from "../../data-source";
import { leagues, league_category } from "../../config.json";
import { createTeamService } from "../team/create-team.service";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { iReturnAllTeams, returnTeamSchema } from "../../schemas/team.schemas";
export const createTeamsByNationalityService = async (
  nationalityId: number
): Promise<iReturnAllTeams> => {
  const nationalityRepository: Repository<Nationality> =
    AppDataSource.getRepository(Nationality);

  const findNationality: Nationality | null =
    await nationalityRepository.findOne({
      where: {
        id: nationalityId
      },
      relations: {
        team: {
          nationality: true,
          formation: true,
          league: {
            category: true
          },
          stadium: { stadiumArea: true }
        }
      }
    });
  if (!findNationality) {
    throw new AppError(translate("NATIONALITY_NOT_FOUND"), 404);
  }

  const teams = [];

  if (findNationality.team.length < leagues.numberOfTeams) {
    for (const item of new Array(leagues.numberOfTeams)) {
      //console.log(item, "create team default");
      const createTeam = {
        name: "Teste " + "index",
        short: "T" + "index",
        stadium: {
          name: "Generic"
        },
        nationality: {
          id: nationalityId
        }
      };
      console.log(findNationality.team, "create team default");
      const team = await createTeamService(createTeam, null);
      teams.push(team);
      // await teamRepository.save(createTeam);
    }

    return teams;
  } else {
    const teams = findNationality.team.map((team) =>
      returnTeamSchema.parse(team)
    );

    return teams;
  }
};
