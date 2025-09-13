import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Player, PlayerSettings, Setting, SettingValue } from "../../entities";
import { AppError } from "../../error";
import { translate } from "../../middlewares/language.middleware";
import {
  iCreatePlayerSetting,
  iReturnPlayerSetting,
  returnPlayerSettingSchema
} from "../../schemas/setting.schemas";

export const createPlayerSettingService = async (
  playerId: string,
  playerSettingData: iCreatePlayerSetting
): Promise<iReturnPlayerSetting> => {
  const playerRepsoitory: Repository<Player> =
    AppDataSource.getRepository(Player);
  const settingRepository: Repository<Setting> =
    AppDataSource.getRepository(Setting);
  const settingValueRepository: Repository<SettingValue> =
    AppDataSource.getRepository(SettingValue);
  const playerSettingRepsoitory: Repository<PlayerSettings> =
    AppDataSource.getRepository(PlayerSettings);

  const findPlayer: Player | null = await playerRepsoitory.findOne({
    where: {
      id: parseInt(playerId)
    },
    relations: { nationality: true }
  });
  if (!findPlayer) {
    throw new AppError(translate("PLAYER_NOT_FOUND"), 404);
  }
  const findSetting: Setting | null = await settingRepository.findOne({
    where: {
      id: playerSettingData.setting.id
    }
  });
  if (!findSetting) {
    throw new AppError(translate("SETTING_NOT_FOUND"), 404);
  }
  if (findSetting.max && findSetting.min) {
    if (
      Number(playerSettingData.value) > findSetting.max ||
      Number(playerSettingData.value) < findSetting.min
    ) {
      throw new AppError(translate("MIN_MAX_ERROR"), 403);
    }
  }
  let findSettingValue: SettingValue | null =
    await settingValueRepository.findOne({
      where: {
        setting: {
          id: findSetting.id
        },
        value: playerSettingData.value
      }
    });
  if (!findSettingValue) {
    const createSettingValue = settingValueRepository.create({
      value: playerSettingData.value,
      setting: findSetting
    });

    await settingValueRepository.save(createSettingValue);
    findSettingValue = createSettingValue;
  }
  const findPlayerSetting: PlayerSettings | null =
    await playerSettingRepsoitory.findOne({
      where: {
        player: {
          id: findPlayer.id
        },
        setting: { id: findSetting.id }
      }
    });
  const createPlayerSetting: PlayerSettings = playerSettingRepsoitory.create({
    ...findPlayerSetting,
    player: findPlayer,
    setting: findSetting,
    settingValue: findSettingValue,
    value: findSettingValue.value
  });

  await playerSettingRepsoitory.save(createPlayerSetting);

  const player_settings = returnPlayerSettingSchema.parse({
    ...createPlayerSetting
  });

  return player_settings;
};
