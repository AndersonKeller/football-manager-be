import { Request, Response } from "express";
import { iReturnAllAppearance } from "../schemas/appearance.schemas";
import { getAllAppearanceService } from "../service/appearance/get-all-appearance.service";

export const appearanceController = {
  getAllAppearance: async (req: Request, res: Response): Promise<Response> => {
    const appearances: iReturnAllAppearance = await getAllAppearanceService();
    return res.status(200).json(appearances);
  }
};
