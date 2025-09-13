import { Repository } from "typeorm";
import {
  iReturnAllSetting,
  returnAllSettingSchema
} from "../../schemas/setting.schemas";
import { Setting } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllSettingService = async (): Promise<iReturnAllSetting> => {
  const settingRepository: Repository<Setting> =
    AppDataSource.getRepository(Setting);

  const findSettings: Setting[] | [] = await settingRepository.find();

  const settings = returnAllSettingSchema.parse(findSettings);

  return settings;
};
