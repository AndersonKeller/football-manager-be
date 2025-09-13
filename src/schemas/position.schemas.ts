import { array, z } from "zod";
import { translate } from "../middlewares/language.middleware";
import { returnPositionCategorySchema } from "./position-category.schemas";

export const createPositionSchema = z.object({
  name: z
    .string()
    .min(1, translate("MIN_CHAR"))
    .max(255, translate("MAX_CHAR")),
  description: z
    .string()
    .min(3, translate("MIN_CHAR"))
    .max(255, translate("MAX_CHAR")),
  short: z
    .string()
    .min(1, translate("MIN_CHAR"))
    .max(45, translate("MAX_CHAR"))
    .transform((val) => val.toUpperCase()),
  positionCategory: returnPositionCategorySchema.pick({ id: true })
});
export const returnPositionSchema = createPositionSchema.extend({
  id: z.number(),
  positionCategory: returnPositionCategorySchema
});
export const returnAllPositionSchema = returnPositionSchema.array();

export type iCreatePosition = z.infer<typeof createPositionSchema>;
export type iReturnPosition = z.infer<typeof returnPositionSchema>;
export type iReturnAllPosition = z.infer<typeof returnAllPositionSchema>;
