import { Request, Response } from "express";
import {
  iCreateLeague,
  iCreateLeagueCategory,
  iReturnAllLeagueCategory,
  iReturnAllLeagues,
  iReturnCategoryLeague,
  iReturnLeague,
  iReturnLeagueTeams
} from "../schemas/league.schemas";
import { createLeagueCategoryService } from "../service/league/create-league-category.service";
import { createLeagueService } from "../service/league/create-league.service";
import { getAllLeaguesService } from "../service/league/get-all-leagues.service";
import { getLeagueByIdService } from "../service/league/get-league-by-id.service";
import { getAllLeagueCategoryService } from "../service/league/get-all-league-category.service";
import { getLeagueTeamsService } from "../service/league/get-league-teams.service";
import { createLeagueScheduleService } from "../service/league/create-schedule.service";
import { getLeagueTeamScheduleService } from "../service/league/get-league-team-schedule.service";

export const leagueController = {
  createCategory: async (req: Request, res: Response): Promise<Response> => {
    const leagueCategoryData: iCreateLeagueCategory = req.body;
    const category: iReturnCategoryLeague =
      await createLeagueCategoryService(leagueCategoryData);
    return res.status(201).json(category);
  },
  createLeague: async (req: Request, res: Response): Promise<Response> => {
    const leagueData: iCreateLeague = req.body;
    const league: iReturnLeague = await createLeagueService(leagueData);
    return res.status(201).json(league);
  },
  getAllLeagues: async (req: Request, res: Response): Promise<Response> => {
    const leagues: iReturnAllLeagues = await getAllLeaguesService();
    return res.status(200).json(leagues);
  },
  getLeagueById: async (req: Request, res: Response): Promise<Response> => {
    const leagueId: number = parseInt(req.params.id);
    const league: iReturnLeague = await getLeagueByIdService(leagueId);
    return res.status(200).json(league);
  },
  getAllLeagueCategory: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const categories: iReturnAllLeagueCategory =
      await getAllLeagueCategoryService();
    return res.status(200).json(categories);
  },
  getLeagueTeams: async (req: Request, res: Response): Promise<Response> => {
    const leagueId: number = parseInt(req.params.id);
    const league_teams: iReturnLeagueTeams =
      await getLeagueTeamsService(leagueId);
    return res.status(200).json(league_teams);
  },
  createLeagueSchedule: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const leagueId: number = parseInt(req.params.id);
    const schedule = await createLeagueScheduleService(leagueId);
    return res.status(200).json(schedule);
  },
  getLeagueTeamSchedule: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const teamId: string = req.params.idteam;
    const leagueId: number = parseInt(req.params.id);
    const schedule = await getLeagueTeamScheduleService(leagueId, teamId);
    return res.status(200).json(schedule);
  }
};
