import { Request, Response } from "express";
import {
  iCreateStadium,
  iCreateStadiumArea,
  iReturnAllStadiums,
  iReturnAllStadiumsArea,
  iReturnStadium,
  iReturnStadiumArea
} from "../schemas/stadium.schemas";
import { createStadiumAreaService } from "../service/stadium/create-stadium-area.service";
import { createStadiumService } from "../service/stadium/create-stadium.service";
import { getAllStadiumsService } from "../service/stadium/get-all-stadiums.service";
import { getStadiumByIdService } from "../service/stadium/get-stadium-by-id.service";
import { getAllStadiumAreasService } from "../service/stadium/get-all-stadium-area.service";

export const stadiumController = {
  createStadiumArea: async (req: Request, res: Response) => {
    const stadiumAreaData: iCreateStadiumArea = req.body;
    const stadiumArea: iReturnStadiumArea =
      await createStadiumAreaService(stadiumAreaData);
    return res.status(201).json(stadiumArea);
  },
  createStadium: async (req: Request, res: Response): Promise<Response> => {
    const stadiumData: iCreateStadium = req.body;
    const stadium: iReturnStadium = await createStadiumService(stadiumData);
    return res.status(201).json(stadium);
  },
  getAllStadiums: async (req: Request, res: Response): Promise<Response> => {
    const stadiums: iReturnAllStadiums = await getAllStadiumsService();
    return res.status(200).json(stadiums);
  },
  getStadiumById: async (req: Request, res: Response): Promise<Response> => {
    const stadiumId: number = parseInt(req.params.id);
    const stadium: iReturnStadium = await getStadiumByIdService(stadiumId);
    return res.status(200).json(stadium);
  },
  getAllStadiumAreas: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const stadiumAreas: iReturnAllStadiumsArea =
      await getAllStadiumAreasService();
    return res.status(200).json(stadiumAreas);
  }
};
