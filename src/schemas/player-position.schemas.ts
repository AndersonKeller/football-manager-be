import { z } from "zod";
import { returnPositionSchema } from "./position.schemas";
import { returnPlayerSchema } from "./player.schemas";

export const createPlayerPositionSchema = z.object({
  registered: z.boolean().default(true),
  position: returnPositionSchema.pick({ id: true })
});
export const returnPlayerPositionSchema = createPlayerPositionSchema.extend({
  id: z.number(),
  player: returnPlayerSchema,
  position: returnPositionSchema
});

export type iCreatePlayerPosition = z.infer<typeof createPlayerPositionSchema>;
export type iReturnPlayerPosition = z.infer<typeof returnPlayerPositionSchema>;

export const returnPlayerWhitPositions = z.object({
  player: returnPlayerSchema,
  positions: returnPositionSchema.array()
});
export type iReturnPlayerWhitPositions = z.infer<
  typeof returnPlayerWhitPositions
>;
