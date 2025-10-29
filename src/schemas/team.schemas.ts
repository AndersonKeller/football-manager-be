import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { returnLeagueSchema } from "./league.schemas";
import { returnStadiumSchema } from "./stadium.schemas";
import { returnFormationSchema } from "./formation.schemas";
import { returnNationalitySchema } from "./nationality.schemas";
import { returnAllPlayersSchema, returnPlayerSchema } from "./player.schemas";
import { returnAllPlayerTeamSchema } from "./player-team.schemas";
import { returnAbilitySchema } from "./ability.schemas";
import { returnPositionSchema } from "./position.schemas";
import { returnPlayerPositionSchema } from "./player-position.schemas";

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
  user: returnUserSchema.pick({ id: true }).nullish(),
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
  players: z
    .object({
      player: returnPlayerSchema.extend({
        abilities: z
          .object({
            ability: returnAbilitySchema,
            value: z.number()
          })
          .array(),
        position: returnPlayerPositionSchema.omit({ player: true }).array()
      }),
      starter: z.boolean().default(false),
      captain: z.boolean().default(false),
      long_fk_taker: z.boolean().default(false),
      short_fk_taker: z.boolean().default(false),
      left_ck_taker: z.boolean().default(false),
      right_ck_taker: z.boolean().default(false),
      penalty_taker: z.boolean().default(false),
      number: z.number()
    })
    .array()
});
