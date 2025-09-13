import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player, PlayerPositions } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import { returnPlayerWhitPositions } from "../../schemas/player-position.schemas";

export const getPlayerPositionsService = async (playerId: string) => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);
  const playerPositionRepository: Repository<PlayerPositions> =
    AppDataSource.getRepository(PlayerPositions);
  const findPlayer: Player | null = await playerRepository.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: {
      nationality: true
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findPlayerPositions: PlayerPositions[] | [] =
    await playerPositionRepository.find({
      where: {
        player: {
          id: parseInt(playerId)
        }
      },
      relations: {
        position: {
          positionCategory: true
        }
      }
    });
  const registered = findPlayerPositions.filter((item) => item.registered);

  const player_positions = returnPlayerWhitPositions.parse({
    player: findPlayer,
    positions: registered.map((item) => item.position)
  });
  return player_positions;
};
