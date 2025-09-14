import { Request, Response } from "express";
import { createTeamsByNationalityService } from "../service/default/create-teams-by-nationality.service";
import { iReturnAllTeams } from "../schemas/team.schemas";

export const defaultController = {
  createTeamsByNationality: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const nationalityId: number = parseInt(req.params.idNationality);
    const teams: iReturnAllTeams =
      await createTeamsByNationalityService(nationalityId);
    return res.status(200).json(teams);
  }
};
