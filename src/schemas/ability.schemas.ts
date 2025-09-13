import { z } from "zod";

export const createAbilitySchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  description: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  min: z.number(),
  max: z.number()
});
export const returnAbilitySchema = createAbilitySchema.extend({
  id: z.number()
});
export const returnAllAbilitiesSchema = returnAbilitySchema.array();

export type iCreateAbility = z.infer<typeof createAbilitySchema>;
export type iReturnAbility = z.infer<typeof returnAbilitySchema>;
export type iReturnAllAbility = z.infer<typeof returnAllAbilitiesSchema>;
