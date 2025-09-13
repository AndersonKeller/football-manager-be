import { Router } from "express";
import { settingController } from "../controllers/setting.controllers";

export const settingRoutes: Router = Router();

settingRoutes.get("", settingController.getAllSetting);
settingRoutes.get("/value", settingController.getAllSettingValue);
