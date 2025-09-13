import { Repository } from "typeorm";
import { Player } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  iReturnAllPlayers,
  returnAllPlayersSchema
} from "../../schemas/player.schemas";

export const getAllPlayersService = async (): Promise<iReturnAllPlayers> => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);

  const findPlayers: Player[] | [] = await playerRepository.find({
    relations: { nationality: true }
  });

  const players = returnAllPlayersSchema.parse(findPlayers);

  return players;
};
