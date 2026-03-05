import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ApiErrorDataSchema } from "./common";

extendZodWithOpenApi(z);

export const ProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  shortBio: z.string(),
  picture: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  linkedin: z.string().nullable(),
  location: z.string().nullable(),
  topSkills: z.array(z.string()),
  updatedAt: z.coerce.date(),
});

export const UpsertProfileSchema = ProfileSchema.omit({
  id: true,
  updatedAt: true,
});

export const ProfileResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ProfileSchema,
});

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ApiErrorDataSchema.optional(),
});
