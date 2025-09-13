import { Repository } from "typeorm";
import {
  iReturnAllSettingValue,
  returnAllSettingValueSchema
} from "../../schemas/setting.schemas";
import { SettingValue } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllSettingValueService =
  async (): Promise<iReturnAllSettingValue> => {
    const settingValueRepository: Repository<SettingValue> =
      AppDataSource.getRepository(SettingValue);

    const findSettingValue: SettingValue[] | [] =
      await settingValueRepository.find({ relations: { setting: true } });

    const setting_value = returnAllSettingValueSchema.parse(findSettingValue);

    return setting_value;
  };
