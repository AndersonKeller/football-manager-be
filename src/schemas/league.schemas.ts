import { z } from "zod";
import { returnAllTeamsSchema, returnTeamSchema } from "./team.schemas";
import { returnFormationSchema } from "./formation.schemas";
import { returnUserSchema } from "./user.schemas";
import { returnStadiumSchema } from "./stadium.schemas";
import { returnNationalitySchema } from "./nationality.schemas";

export const createLeagueCategorySchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters")
});
export const returnLeagueCategorySchema = createLeagueCategorySchema.extend({
  id: z.number()
});
export const returnAllLeagueCategorySchema = returnLeagueCategorySchema.array();

export type iCreateLeagueCategory = z.infer<typeof createLeagueCategorySchema>;
export type iReturnCategoryLeague = z.infer<typeof returnLeagueCategorySchema>;
export type iReturnAllLeagueCategory = z.infer<
  typeof returnAllLeagueCategorySchema
>;

export const createLeagueSchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  strip_name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(52, "max length is 255 characters"),
  category: returnLeagueCategorySchema.pick({
    id: true
  })
});
export const returnLeagueSchema = createLeagueSchema.extend({
  id: z.number(),
  category: returnLeagueCategorySchema
});
export const returnAllLeaguesSchema = returnLeagueSchema.array();

export type iCreateLeague = z.infer<typeof createLeagueSchema>;
export type iReturnLeague = z.infer<typeof returnLeagueSchema>;
export type iReturnAllLeagues = z.infer<typeof returnAllLeaguesSchema>;

export const returnLeagueTeamsSchema = z.object({
  league: returnLeagueSchema,
  teams: z
    .object({
      id: z.string(),
      name: z.string(),
      short: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      deletedAt: z.string().nullable(),
      formation: returnFormationSchema,
      user: returnUserSchema.pick({ id: true }),
      stadium: returnStadiumSchema,
      nationality: returnNationalitySchema
    })
    .array()
});

export type iReturnLeagueTeams = z.infer<typeof returnLeagueTeamsSchema>;
