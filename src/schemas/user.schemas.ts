import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "min length is 3 characters")
    .max(45, "max length is 45 characters"),
  email: z.string().email("wrong format"),
  password: z.string().max(12, "max length is 12 characters")
});
export const returnUserSchema = createUserSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
  })
  .omit({ password: true });

export type iCreateUser = z.infer<typeof createUserSchema>;
export type iReturnUser = z.infer<typeof returnUserSchema>;

export const createLoginSchema = z.object({
  email: z.string().email("wrong format"),
  password: z.string().max(12, "max length is 12 characters")
});
export const returnLoginSchema = z.object({
  token: z.string(),
  user: returnUserSchema
});
export type iCreateLogin = z.infer<typeof createLoginSchema>;
export type iReturnLogin = z.infer<typeof returnLoginSchema>;
