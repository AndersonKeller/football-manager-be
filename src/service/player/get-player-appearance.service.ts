import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player, PlayerAppearances } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import {
  iReturnPlayerWhitAppearances,
  returnPlayerWhitAppearances
} from "../../schemas/player-appearance.schemas";

export const getPlayerAppearanceService = async (
  playerId: string
): Promise<iReturnPlayerWhitAppearances> => {
  const playerRepsoitory: Repository<Player> =
    AppDataSource.getRepository(Player);
  const playerAppearanceRepository: Repository<PlayerAppearances> =
    AppDataSource.getRepository(PlayerAppearances);

  const findPlayer: Player | null = await playerRepsoitory.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: { nationality: true }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findPlayerAppearance: PlayerAppearances[] | [] =
    await playerAppearanceRepository.find({
      where: {
        player: {
          id: findPlayer.id
        }
      },
      relations: {
        appearance: true,
        appearanceValue: true
      }
    });

  const player_appearances: iReturnPlayerWhitAppearances =
    returnPlayerWhitAppearances.parse({
      player: findPlayer,
      appearances: findPlayerAppearance.map((player_appearance) => {
        const obj = {
          appearance: { name: player_appearance.appearance.name },
          value: player_appearance.value
        };
        return obj;
      })
    });

  return player_appearances;
};
