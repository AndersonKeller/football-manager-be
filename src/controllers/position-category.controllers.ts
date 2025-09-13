import { Request, Response } from "express";
import { iReturnAllPositionCategory } from "../schemas/position-category.schemas";
import { getAllPositionCategoryService } from "../service/position-category/get-all-position-category.service";

export const positionCategoryController = {
  getAllPositionCategory: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const position_category: iReturnAllPositionCategory =
      await getAllPositionCategoryService();
    return res.status(200).json(position_category);
  }
};
