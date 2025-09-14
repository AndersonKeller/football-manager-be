import { Request, Response } from "express";
import {
  iCreateTeam,
  iReturnAllTeams,
  iReturnTeam
} from "../schemas/team.schemas";
import { createTeamService } from "../service/team/create-team.service";
import { getAllTeamsService } from "../service/team/get-all-teams.service";
import { getTeamPlayerService } from "../service/team/get-team-player.service";
import { getTeamByIdService } from "../service/team/get-team-by-id.service";

export const teamController = {
  createTeam: async (req: Request, res: Response) => {
    const teamData: iCreateTeam = req.body;
    const userId: string = req.user.id;
    const team = await createTeamService(teamData, userId);

    return res.status(201).json(team);
  },
  getAllTeams: async (req: Request, res: Response): Promise<Response> => {
    const teams: iReturnAllTeams = await getAllTeamsService();
    return res.status(200).json(teams);
  },
  getTeamById: async (req: Request, res: Response): Promise<Response> => {
    const teamId: string = req.params.id;
    const team: iReturnTeam = await getTeamByIdService(teamId);
    return res.status(200).json(team);
  },
  getTeamPlayer: async (req: Request, res: Response): Promise<Response> => {
    const teamId: string = req.params.id;
    const team_player = await getTeamPlayerService(teamId);
    return res.status(200).json(team_player);
  }
};
