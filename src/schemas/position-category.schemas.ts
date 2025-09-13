import { z } from "zod";

export const createPositionCategorySchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  short: z
    .string()
    .min(1, "min length is 1 characters")
    .max(3, "max length is 3 characters")
});
export const returnPositionCategorySchema = createPositionCategorySchema.extend(
  {
    id: z.number()
  }
);
export const returnAllPositionCategorySchema =
  returnPositionCategorySchema.array();

export type iCreatePositionCategory = z.infer<
  typeof createPositionCategorySchema
>;
export type iReturnPositionCategory = z.infer<
  typeof returnPositionCategorySchema
>;
export type iReturnAllPositionCategory = z.infer<
  typeof returnAllPositionCategorySchema
>;
