import { Request, Response } from "express";
import {
  iCreatePosition,
  iReturnAllPosition,
  iReturnPosition
} from "../schemas/position.schemas";
import { getAllPositionService } from "../service/position/get-all-position.service";
import { createPositionService } from "../service/position/create-position.service";

export const positionController = {
  createPosition: async (req: Request, res: Response): Promise<Response> => {
    const positionData: iCreatePosition = req.body;
    const position: iReturnPosition = await createPositionService(positionData);
    return res.status(201).json(position);
  },
  getAllPositions: async (req: Request, res: Response): Promise<Response> => {
    const positions: iReturnAllPosition = await getAllPositionService();
    return res.status(200).json(positions);
  }
};
