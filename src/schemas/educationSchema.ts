import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ApiErrorDataSchema } from "./common";

extendZodWithOpenApi(z);

export const EducationSchema = z.object({
  id: z.number(),
  institution: z.string(),
  degree: z.string(),
  field: z.string().nullable(),
  graduationDate: z.string().nullable(),
  order: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateEducationSchema = EducationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateEducationSchema = CreateEducationSchema.partial();

export const EducationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: EducationSchema,
});

export const EducationsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(EducationSchema),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ApiErrorDataSchema.optional(),
});

export const IdParamSchema = z.object({
  id: z.string().transform(Number),
});
