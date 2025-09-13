import { Request, Response } from "express";
import {
  iReturnAllSetting,
  iReturnAllSettingValue
} from "../schemas/setting.schemas";
import { getAllSettingService } from "../service/setting/get-all-setting.service";
import { getAllSettingValueService } from "../service/setting/get-all-setting-value.service";

export const settingController = {
  getAllSetting: async (req: Request, res: Response): Promise<Response> => {
    const setting: iReturnAllSetting = await getAllSettingService();
    return res.status(200).json(setting);
  },
  getAllSettingValue: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const setting_value: iReturnAllSettingValue =
      await getAllSettingValueService();
    return res.status(200).json(setting_value);
  }
};
