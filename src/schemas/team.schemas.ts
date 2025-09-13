import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { returnLeagueSchema } from "./league.schemas";
import { returnStadiumSchema } from "./stadium.schemas";
import { returnFormationSchema } from "./formation.schemas";
import { returnNationalitySchema } from "./nationality.schemas";
import { returnAllPlayersSchema } from "./player.schemas";

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 cahracters")
    .max(255, "max length is 155 characters"),
  short: z
    .string()
    .min(3, "min length is 3 characters")
    .max(45, "max length is 45 characters")
    .transform((val) => val.toUpperCase()),

  stadium: returnStadiumSchema.pick({ name: true }),
  nationality: returnNationalitySchema.pick({ id: true })
});
export const returnTeamSchema = createTeamSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  formation: returnFormationSchema,
  user: returnUserSchema.pick({ id: true }),
  stadium: returnStadiumSchema,
  league: returnLeagueSchema,
  nationality: returnNationalitySchema
});
export const returnAllTeamsSchema = returnTeamSchema.array();

export type iCreateTeam = z.infer<typeof createTeamSchema>;
export type iReturnTeam = z.infer<typeof returnTeamSchema>;
export type iReturnAllTeams = z.infer<typeof returnAllTeamsSchema>;

export const returnTeamPlayerSchema = z.object({
  team: returnTeamSchema,
  players: returnAllPlayersSchema
});
