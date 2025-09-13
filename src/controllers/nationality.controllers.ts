import { Request, Response } from "express";
import {
  iCreateNationality,
  iReturnAllNationality,
  iReturnNationality
} from "../schemas/nationality.schemas";
import { createNationalityService } from "../service/nationality/create-nationality.service";
import { getAllNationalityService } from "../service/nationality/get-all-nationality.service";

export const nationalityController = {
  createNationality: async (req: Request, res: Response) => {
    const nationalityData: iCreateNationality = req.body;
    const nationality: iReturnNationality =
      await createNationalityService(nationalityData);
    return res.status(201).json(nationality);
  },
  getAllNationality: async (req: Request, res: Response): Promise<Response> => {
    const nationalities: iReturnAllNationality =
      await getAllNationalityService();
    return res.status(200).json(nationalities);
  }
};
