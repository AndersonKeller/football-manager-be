import { Request, Response } from "express";
import {
  iCreateFormation,
  iReturnAllFormation,
  iReturnFormation
} from "../schemas/formation.schemas";
import { createFormationService } from "../service/formation/create-formation.service";
import { getAllFormationsService } from "../service/formation/get-all-formations.service";

export const formationController = {
  createFormation: async (req: Request, res: Response): Promise<Response> => {
    const formationData: iCreateFormation = req.body;
    const formation: iReturnFormation =
      await createFormationService(formationData);
    return res.status(201).json(formation);
  },
  getAllFormations: async (req: Request, res: Response): Promise<Response> => {
    const formations: iReturnAllFormation = await getAllFormationsService();

    return res.status(200).json(formations);
  }
};
