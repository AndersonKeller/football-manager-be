import { z } from "zod";
export const createSpecialAbilitySchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  description: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters")
});
export const returnSpecialAbilitySchema = createSpecialAbilitySchema.extend({
  id: z.number()
});
export const returnAllSpecialAbilitiesSchema =
  returnSpecialAbilitySchema.array();

export type iCreateSpecialAbility = z.infer<typeof createSpecialAbilitySchema>;
export type iReturnSpecialAbility = z.infer<typeof returnSpecialAbilitySchema>;
export type iReturnAllSpecialAbilities = z.infer<
  typeof returnAllSpecialAbilitiesSchema
>;
