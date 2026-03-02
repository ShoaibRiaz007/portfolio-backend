import type { z } from "zod";
import { CreateProjectSchema } from "../schemas/projectSchema";

export type InsertProject = z.infer<typeof CreateProjectSchema> & { id?: number };
