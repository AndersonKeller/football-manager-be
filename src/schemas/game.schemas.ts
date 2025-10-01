import { z } from "zod";
import { createTeamSchema, returnTeamSchema } from "./team.schemas";
import { createLeagueSchema } from "./league.schemas";

export const createScheduleSchema = z.object({
  year: z.number(),
  month: z.number(),
  id: z.number()
});

export const createGameSchema = z.object({
  id: z.number(),
  round: z.number(),
  home: returnTeamSchema.pick({ id: true }),
  away: returnTeamSchema.pick({ id: true }),
  schedule: createScheduleSchema
});

export const createRoundSchema = z.object({
  round: z.number(),
  date: z.string().optional(),
  game: createGameSchema.array()
});

export type iCreateGame = z.infer<typeof createGameSchema>;
export type iCreateSchedule = z.infer<typeof createScheduleSchema>;
export type iCreateRound = z.infer<typeof createRoundSchema>;
