import { Repository } from "typeorm";
import {
  iReturnTogglePlayerTeam,
  iTogglePlayerTeam,
  returnTogglePlayerTeamSchema
} from "../../schemas/player-team.schemas";
import { PlayerTeams } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { returnTeamPlayerSchema } from "../../schemas/team.schemas";

export const togglePlayerIntoTeamService = async (
  teamId: string,
  togglePlayerIntoTeamData: iTogglePlayerTeam
): Promise<iReturnTogglePlayerTeam> => {
  const playerTeamPlayerRepository: Repository<PlayerTeams> =
    AppDataSource.getRepository(PlayerTeams);

  const findToReservePlayerTeam: PlayerTeams | null =
    await playerTeamPlayerRepository.findOne({
      where: {
        player: {
          id: togglePlayerIntoTeamData.toReserve.id
        },
        team: {
          id: teamId
        }
      },
      relations: { player: true }
    });
  const findToHolderPlayerTeam: PlayerTeams | null =
    await playerTeamPlayerRepository.findOne({
      where: {
        player: {
          id: togglePlayerIntoTeamData.toHolder.id
        },
        team: {
          id: teamId
        }
      },
      relations: { player: true }
    });

  if (!findToHolderPlayerTeam || !findToReservePlayerTeam) {
    throw new AppError("NOT_FOUND_PLAYER", 400);
  }
  const updateReservePlayerTeam = playerTeamPlayerRepository.create({
    ...findToReservePlayerTeam,
    starter: false
  });
  await playerTeamPlayerRepository.save(updateReservePlayerTeam);
  const updateHolderPlayerTeam = playerTeamPlayerRepository.create({
    ...findToHolderPlayerTeam,
    starter: true
  });
  await playerTeamPlayerRepository.save(updateHolderPlayerTeam);

  const playersTeam = returnTogglePlayerTeamSchema.parse([
    { ...updateReservePlayerTeam },
    { ...updateHolderPlayerTeam }
  ]);
  return playersTeam;
};
