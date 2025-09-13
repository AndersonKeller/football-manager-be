import { z } from "zod";
import {
  returnAppearanceSchema,
  returnAppearanceValueSchema
} from "./appearance.schemas";
import { returnPlayerSchema } from "./player.schemas";

export const createPlayerAppearanceSchema = z.object({
  value: z.string(),
  appearance: returnAppearanceSchema.pick({ id: true })
});
export const returnPlayerAppearanceSchema = createPlayerAppearanceSchema.extend(
  {
    id: z.number(),
    appearance: returnAppearanceSchema.pick({ id: true, name: true }),
    value: z.number()
  }
);

export type iCreatePlayerAppearance = z.infer<
  typeof createPlayerAppearanceSchema
>;
export type iReturnPlayerAppearance = z.infer<
  typeof returnPlayerAppearanceSchema
>;

export const returnPlayerWhitAppearances = z.object({
  player: returnPlayerSchema,
  appearances: z
    .object({
      appearance: returnAppearanceSchema.pick({ name: true }),
      value: z.number()
    })
    .array()
});

export type iReturnPlayerWhitAppearances = z.infer<
  typeof returnPlayerWhitAppearances
>;
