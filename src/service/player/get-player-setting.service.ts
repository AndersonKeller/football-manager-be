import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import {
  iReturnPlayerWhitSetting,
  returnPlayerWhitSettingSchema
} from "../../schemas/setting.schemas";

export const getPlayerSettingService = async (
  playerId: string
): Promise<any> => {
  const playerRepsoitory: Repository<Player> =
    AppDataSource.getRepository(Player);

  const findPlayer: Player | null = await playerRepsoitory.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: {
      nationality: true,
      settings: { settingValue: { setting: true } }
    }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }

  const player_setting = returnPlayerWhitSettingSchema.parse({
    player: findPlayer,
    settings: findPlayer.settings.map((setting) => {
      const obj = {
        id: setting.id,
        value: setting.value,
        setting: setting.settingValue.setting
      };
      return obj;
    })
  });
  return player_setting;
};
