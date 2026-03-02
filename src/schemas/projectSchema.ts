import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ApiErrorDataSchema } from "./common";

extendZodWithOpenApi(z);

const ProjectMetricValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export const ProjectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  industry: z.string().nullable(),
  projectType: z.string().nullable(),
  status: z.string().nullable(),
  role: z.string(),
  engagementModel: z.string().nullable(),
  teamSize: z.number().nullable(),
  durationInMonths: z.number().nullable(),
  problem: z.string(),
  context: z.string().nullable(),
  strategy: z.string(),
  architecture: z.string(),
  execution: z.string(),
  challenges: z.string().nullable(),
  solution: z.string(),
  measurableImpact: z.string(),
  metrics: z.record(ProjectMetricValueSchema).nullable(),
  techStack: z.array(z.string()),
  infrastructure: z.array(z.string()),
  integrations: z.array(z.string()),
  coverImage: z.string(),
  galleryImages: z.array(z.string()),
  demoUrl: z.string().nullable(),
  repositoryUrl: z.string().nullable(),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  keywords: z.array(z.string()),
  featured: z.boolean(),
  published: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
}).extend({
  updatedAt: z.coerce.date().optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const ProjectResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ProjectSchema,
});

export const ProjectsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(ProjectSchema),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ApiErrorDataSchema.optional(),
});

export const IdParamSchema = z.object({
  id: z.string().transform(Number),
});

export const getAllProjectsRoute = {
  method: "get" as const,
  path: "/",
  tags: ["Projects"],
  summary: "Get all projects",
  description: "Retrieve a list of all projects",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProjectsResponseSchema,
        },
      },
      description: "List of projects",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error",
    },
  },
};

export const getProjectRoute = {
  method: "get" as const,
  path: "/{id}",
  tags: ["Projects"],
  summary: "Get project by ID",
  description: "Retrieve a specific project by its ID",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
      description: "Project details",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Project not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error",
    },
  },
};

export const createProjectRoute = {
  method: "post" as const,
  path: "/",
  tags: ["Projects"],
  summary: "Create a new project",
  description: "Add a new project to the database",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateProjectSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
      description: "Project created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Invalid request data",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error",
    },
  },
};

export const updateProjectRoute = {
  method: "put" as const,
  path: "/{id}",
  tags: ["Projects"],
  summary: "Update a project",
  description: "Update an existing project in the database",
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateProjectSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
      description: "Project updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Invalid request data",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Project not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error",
    },
  },
};

export const deleteProjectRoute = {
  method: "delete" as const,
  path: "/{id}",
  tags: ["Projects"],
  summary: "Delete a project",
  description: "Remove a project from the database",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
      description: "Project deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Project not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Internal server error",
    },
  },
};
