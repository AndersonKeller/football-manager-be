import { z } from "zod";
import { returnPlayerSchema } from "./player.schemas";

export const createSettingSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  required: z.boolean().default(true),
  min: z.number().nullish(),
  max: z.number().nullish()
});
export const returnSettingSchema = createSettingSchema.extend({
  id: z.number()
});
export const returnAllSettingSchema = returnSettingSchema.array();

export type iCreateSetting = z.infer<typeof createSettingSchema>;
export type iReturnSetting = z.infer<typeof returnSettingSchema>;
export type iReturnAllSetting = z.infer<typeof returnAllSettingSchema>;

export const createSettingValueSchema = z.object({
  value: z.string(),
  setting: returnSettingSchema.pick({
    id: true
  })
});
export const returnSettingValueSchema = createSettingValueSchema.extend({
  id: z.number(),
  setting: returnSettingSchema
});
export const returnAllSettingValueSchema = returnSettingValueSchema.array();

export type iCreateSettingValue = z.infer<typeof createSettingValueSchema>;
export type iReturnSettingValue = z.infer<typeof returnSettingValueSchema>;
export type iReturnAllSettingValue = z.infer<
  typeof returnAllSettingValueSchema
>;

export const createPlayerSettingSchema = z.object({
  value: z.string(),
  setting: returnSettingSchema.pick({
    id: true
  })
});
export const returnPlayerSettingSchema = createPlayerSettingSchema.extend({
  id: z.number(),
  player: returnPlayerSchema,
  setting: returnSettingSchema
});

export type iCreatePlayerSetting = z.infer<typeof createPlayerSettingSchema>;
export type iReturnPlayerSetting = z.infer<typeof returnPlayerSettingSchema>;

export const returnPlayerWhitSettingSchema = z.object({
  player: returnPlayerSchema,
  settings: returnSettingValueSchema.array()
});
export type iReturnPlayerWhitSetting = z.infer<
  typeof returnPlayerWhitSettingSchema
>;
