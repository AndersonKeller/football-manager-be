import { Repository } from "typeorm";
import {
  iCreatePlayerPosition,
  iReturnPlayerPosition,
  returnPlayerPositionSchema
} from "../../schemas/player-position.schemas";
import { Player, PlayerPositions, Position } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";

export const createPlayerPositionService = async (
  playerId: string,
  playerPositionData: iCreatePlayerPosition
): Promise<iReturnPlayerPosition> => {
  const positionRepository: Repository<Position> =
    AppDataSource.getRepository(Position);
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
  const findPosition: Position | null = await positionRepository.findOne({
    where: {
      id: playerPositionData.position.id
    },
    relations: {
      positionCategory: true
    }
  });
  if (!findPosition) {
    throw new AppError(translate("POSITION_NOT_FOUND"), 404);
  }
  const findPlayerPositions: PlayerPositions | null =
    await playerPositionRepository.findOne({
      where: {
        player: {
          id: findPlayer.id
        },
        position: {
          id: findPosition.id
        }
      }
    });
  const createPlayerPosition = playerPositionRepository.create({
    ...findPlayerPositions,
    registered:
      playerPositionData.registered ?? findPlayerPositions?.registered,
    position: {
      id: findPosition.id
    },
    player: {
      id: findPlayer.id
    }
  });

  await playerPositionRepository.save(createPlayerPosition);

  const player_position = returnPlayerPositionSchema.parse({
    ...createPlayerPosition,
    player: findPlayer,
    position: findPosition
  });

  return player_position;
};
