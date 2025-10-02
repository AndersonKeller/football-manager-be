import { iReturnAllAbility } from "./ability.schemas";
import { z } from "zod";
import { returnTeamSchema } from "./team.schemas";

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

export const returnAllRoundSchema = z
  .object({
    id: z.number(),
    round: z.number(),
    date: z.string().optional(),
    games: z
      .object({
        id: z.number(),
        home: returnTeamSchema.omit({
          formation: true,
          league: true,
          nationality: true,
          stadium: true,
          user: true
        }),
        away: returnTeamSchema.omit({
          formation: true,
          league: true,
          nationality: true,
          stadium: true,
          user: true
        })
      })
      .array()
  })
  .array();
export type iReturnAllRounds = z.infer<typeof returnAllRoundSchema>;
export type iCreateGame = z.infer<typeof createGameSchema>;
export type iCreateSchedule = z.infer<typeof createScheduleSchema>;
export type iCreateRound = z.infer<typeof createRoundSchema>;
