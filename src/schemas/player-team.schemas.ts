import { number, z } from "zod";
import { returnPlayerSchema } from "./player.schemas";
import { returnTeamSchema } from "./team.schemas";
import { DeepPartial } from "typeorm";

export const createPlayerTeamSchema = z.object({
  starter: z.boolean().default(false),
  captain: z.boolean().default(false),
  long_fk_taker: z.boolean().default(false),
  short_fk_taker: z.boolean().default(false),
  left_ck_taker: z.boolean().default(false),
  right_ck_taker: z.boolean().default(false),
  penalty_taker: z.boolean().default(false),
  number: z.number()
});
export const returnPlayerTeamSchema = createPlayerTeamSchema.extend({
  id: z.number(),
  player: returnPlayerSchema,
  team: returnTeamSchema.pick({ id: true, name: true })
});
export const returnAllPlayerTeamSchema = returnPlayerTeamSchema.array();

export type iCraetePlayerTeam = z.infer<typeof createPlayerTeamSchema>;
export type iReturnPlayerTeam = z.infer<typeof returnPlayerTeamSchema>;

export type iUpdatePlayerTeam = DeepPartial<iCraetePlayerTeam>;

export const togglePlayerTeamSchema = z.object({
  toReserve: returnPlayerSchema.pick({ id: true }),
  toHolder: returnPlayerSchema.pick({ id: true })
});
export const returnTogglePlayerTeamSchema = z
  .object({
    starter: z.boolean().default(false),
    player: returnPlayerSchema.pick({ id: true, name: true })
  })

  .array();

export type iTogglePlayerTeam = z.infer<typeof togglePlayerTeamSchema>;
export type iReturnTogglePlayerTeam = z.infer<
  typeof returnTogglePlayerTeamSchema
>;
