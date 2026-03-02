import type { z } from "zod";
import { CreateTestimonialSchema } from "../schemas/testimonialSchema";

export const insertTestimonialSchema = CreateTestimonialSchema;
export type InsertTestimonial = z.infer<typeof CreateTestimonialSchema> & { id?: number };
