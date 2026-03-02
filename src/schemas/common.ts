import { z } from "zod";

const PrimitiveValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export const ErrorDetailsSchema = z.record(z.union([PrimitiveValueSchema, z.array(PrimitiveValueSchema)]));

export const ApiErrorDataSchema = z.object({
  message: z.string().optional(),
  name: z.string().optional(),
  code: z.string().optional(),
  stack: z.string().optional(),
  details: ErrorDetailsSchema.optional(),
});

export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
