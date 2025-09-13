import { Repository } from "typeorm";
import {
  iCreatePlayer,
  iReturnPlayer,
  returnPlayerSchema
} from "../../schemas/player.schemas";
import {
  Ability,
  Player,
  PlayerAbilities,
  PlayerSettings,
  PlayerSpecialAbilities,
  Setting,
  SettingValue,
  SpecialAbility
} from "../../entities";
import { AppDataSource } from "../../data-source";
import { player as playerConfig } from "../../config.json";

export const createPlayerService = async (
  playerData: iCreatePlayer
): Promise<iReturnPlayer> => {
  const playerRepository: Repository<Player> =
    AppDataSource.getRepository(Player);
  const specialAbilitiesRepository: Repository<SpecialAbility> =
    AppDataSource.getRepository(SpecialAbility);
  const playerSpecialAbilityRepository: Repository<PlayerSpecialAbilities> =
    AppDataSource.getRepository(PlayerSpecialAbilities);
  const playerAbilityRepository: Repository<PlayerAbilities> =
    AppDataSource.getRepository(PlayerAbilities);
  const playerSettingRepository: Repository<PlayerSettings> =
    AppDataSource.getRepository(PlayerSettings);
  const settingValueRepository: Repository<SettingValue> =
    AppDataSource.getRepository(SettingValue);

  const createPlayer = playerRepository.create(playerData);
  const settingRepository: Repository<Setting> =
    AppDataSource.getRepository(Setting);
  await playerRepository.save(createPlayer);

  const findSpecialAbilities: SpecialAbility[] | [] =
    await specialAbilitiesRepository.find();
  for (const special_ability of findSpecialAbilities) {
    const createPlayerSpecialAbility = playerSpecialAbilityRepository.create({
      active: false,
      player: createPlayer,
      specialAbility: special_ability
    });
    await playerSpecialAbilityRepository.save(createPlayerSpecialAbility);
  }

  for (const ability of playerConfig.defaultAbility) {
    const createPlayerAbility = playerAbilityRepository.create({
      ability: {
        id: ability.id
      },
      value: ability.value,
      player: { id: createPlayer.id }
    });
    await playerAbilityRepository.save(createPlayerAbility);
  }
  const findSetting: Setting[] | [] = await settingRepository.find();

  for (const setting of findSetting) {
    //PEGA AS INFOS DO SETTING NO APP
    const key = setting.name as keyof typeof playerConfig.defaultSetting;
    let value = playerConfig.defaultSetting[key];
    //CASO SEJA OPÇÃO DE STRONG FOOT
    if (Array.isArray(value)) {
      let aleatorio = Math.floor(Math.random() * 10) + 1;
      if (value.length === 2) {
        if (aleatorio <= 5) {
          value = value[0];
        } else {
          value = value[0];
        }
      }
      //CASO SEJA INJURY
      else if (value.length === 3) {
        if (aleatorio <= 5) {
          value = value[0];
        } else if (aleatorio <= 8) {
          value = value[1];
        } else {
          value = value[2];
        }
      } else {
        value = "";
      }
    }
    let findSettingValue: SettingValue | null =
      await settingValueRepository.findOne({
        where: {
          setting: {
            id: setting.id
          },
          value: value
        }
      });
    if (!findSettingValue) {
      const createSettingValue = settingValueRepository.create({
        value: value,
        setting: setting
      });

      await settingValueRepository.save(createSettingValue);
      findSettingValue = createSettingValue;
    }
    const createPlayerSetting = playerSettingRepository.create({
      player: createPlayer,
      setting: setting,
      settingValue: findSettingValue,
      value: findSettingValue.value
    });
    await playerSettingRepository.save(createPlayerSetting);
  }

  const player = returnPlayerSchema.parse(createPlayer);

  return player;
};
