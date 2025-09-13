import { z } from "zod";
import { returnNationalitySchema } from "./nationality.schemas";
import {
  returnAllSpecialAbilitiesSchema,
  returnSpecialAbilitySchema
} from "./special-abilities.schemas";
import {
  returnAbilitySchema,
  returnAllAbilitiesSchema
} from "./ability.schemas";

export const createPlayerSchema = z.object({
  name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  strip_name: z
    .string()
    .min(3, "min length is 3 characters")
    .max(255, "max length is 255 characters"),
  nationality: returnNationalitySchema.pick({ id: true })
});
export const returnPlayerSchema = createPlayerSchema.extend({
  id: z.number(),
  nationality: returnNationalitySchema
});
export const returnAllPlayersSchema = returnPlayerSchema.array();

export type iCreatePlayer = z.infer<typeof createPlayerSchema>;
export type iReturnPlayer = z.infer<typeof returnPlayerSchema>;
export type iReturnAllPlayers = z.infer<typeof returnAllPlayersSchema>;

export const createPlayerSpecialAbilitySchema = z.object({
  specialAbility: returnSpecialAbilitySchema
    .pick({ id: true })
    .extend({ active: z.boolean() })
    .array()
});
export const returnPlayerSpecialAbilitySchema =
  createPlayerSpecialAbilitySchema.extend({
    id: z.number(),
    specialAbility: returnSpecialAbilitySchema.array()
  });

export type iCreatePlayerSpecialAbility = z.infer<
  typeof createPlayerSpecialAbilitySchema
>;
export type iReturnPlayerSpecialAbility = z.infer<
  typeof returnPlayerSpecialAbilitySchema
>;

export const returnPlayerWhitSpecialAbilitySchema = z.object({
  player: returnPlayerSchema,
  specialAbility: returnPlayerSpecialAbilitySchema
    .omit({ specialAbility: true })
    .extend({
      specialAbility: returnSpecialAbilitySchema
    })
    .array()
});
export type iReturnPlayerWhitSpecialAbility = z.infer<
  typeof returnPlayerWhitSpecialAbilitySchema
>;

export const returnPlayerWhitAbilitySchema = z.object({
  player: returnPlayerSchema,
  abilities: z
    .object({
      ability: returnAbilitySchema,
      value: z.number()
    })
    .array()
});
export const playerAbilities = z
  .object({
    ability: returnAbilitySchema,
    value: z.number()
  })
  .array();
export type iPlayerAbilities = z.infer<typeof playerAbilities>;
export type iReturnPlayerWhitAbility = z.infer<
  typeof returnPlayerWhitAbilitySchema
>;

export const updatePlayerAbilitiesSchema = z.object({
  ability: returnAbilitySchema
    .pick({ id: true })
    .extend({ value: z.number() })
    .array()
});
export type iUpdatePlayerAbilities = z.infer<
  typeof updatePlayerAbilitiesSchema
>;
