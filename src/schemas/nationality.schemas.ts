import { z } from "zod";

export const createNationalitySchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 charcaters")
});
export const returnNationalitySchema = createNationalitySchema.extend({
  id: z.number()
});
export const returnAllNationalitySchema = returnNationalitySchema.array();

export type iCreateNationality = z.infer<typeof createNationalitySchema>;
export type iReturnNationality = z.infer<typeof returnNationalitySchema>;
export type iReturnAllNationality = z.infer<typeof returnAllNationalitySchema>;
