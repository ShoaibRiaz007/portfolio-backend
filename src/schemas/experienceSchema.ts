import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ApiErrorDataSchema } from "./common";

extendZodWithOpenApi(z);

export const ExperienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  location: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
  order: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateExperienceSchema = ExperienceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateExperienceSchema = CreateExperienceSchema.partial();

export const ExperienceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ExperienceSchema,
});

export const ExperiencesResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(ExperienceSchema),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ApiErrorDataSchema.optional(),
});

export const IdParamSchema = z.object({
  id: z.string().transform(Number),
});
