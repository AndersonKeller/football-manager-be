import { z } from "zod";

export const createAppearanceSchema = z.object({
  name: z.string().min(3).max(255),
  required: z.boolean().default(true),
  min: z.number().optional(),
  max: z.number().optional()
});
export const returnAppearanceSchema = createAppearanceSchema.extend({
  id: z.number()
});
export const returnAllAppearanceSchema = returnAppearanceSchema.array();

export type iCreateAppearance = z.infer<typeof createAppearanceSchema>;
export type iReturnAppearance = z.infer<typeof returnAppearanceSchema>;
export type iReturnAllAppearance = z.infer<typeof returnAllAppearanceSchema>;

export const createAppearanceValueSchema = z.object({
  value: z.number(),
  appearance: returnAppearanceSchema.pick({
    id: true
  })
});
export const returnAppearanceValueSchema = createAppearanceValueSchema.extend({
  id: z.number()
});

export type iCreateAppearanceValue = z.infer<
  typeof createAppearanceValueSchema
>;
export type iReturnAppearanceValue = z.infer<
  typeof returnAppearanceValueSchema
>;
