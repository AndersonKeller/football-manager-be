import { z } from "zod";

export const createFormationSchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(120, "max length is 120 characters"),
  defenders: z.number(),
  midfielders: z.number(),
  forwards: z.number()
});
export const returnFormationSchema = createFormationSchema.extend({
  id: z.number()
});

export const returnAllFormationsSchema = returnFormationSchema.array();

export type iCreateFormation = z.infer<typeof createFormationSchema>;
export type iReturnFormation = z.infer<typeof returnFormationSchema>;
export type iReturnAllFormation = z.infer<typeof returnAllFormationsSchema>;
