import { Repository } from "typeorm";
import { Player, PlayerTeams, Team } from "../../entities";
import {
  iCraetePlayerTeam,
  iReturnPlayerTeam,
  returnPlayerTeamSchema
} from "../../schemas/player-team.schemas";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const playerIntoTeamService = async (
  playerId: number,
  teamId: string,
  playerTeamData: iCraetePlayerTeam
): Promise<iReturnPlayerTeam> => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
  const playerTeamRepository: Repository<PlayerTeams> =
    AppDataSource.getRepository(PlayerTeams);

  const findPlayer: Player | null = await playerRepository.findOne({
    where: {
      id: playerId
    },
    relations: { nationality: true }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findTeam: Team | null = await teamRepository.findOne({
    where: {
      id: teamId
    }
  });
  if (!findTeam) {
    throw new AppError(translate("TEAM_NOT_FOUND"), 404);
  }
  const createPlayerTeam = playerTeamRepository.create({
    player: findPlayer,
    team: findTeam,
    ...playerTeamData
  });
  await playerTeamRepository.save(createPlayerTeam);

  const player_team = returnPlayerTeamSchema.parse(createPlayerTeam);

  return player_team;
};
