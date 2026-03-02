import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import {
  CreateProjectSchema,
  IdParamSchema,
  ErrorResponseSchema as ProjectErrorResponseSchema,
  ProjectResponseSchema,
  ProjectsResponseSchema,
  UpdateProjectSchema,
} from "../schemas/projectSchema";
import {
  CreateTestimonialSchema,
  ErrorResponseSchema as TestimonialErrorResponseSchema,
  TestimonialResponseSchema,
  TestimonialsResponseSchema,
  UpdateTestimonialSchema,
} from "../schemas/testimonialSchema";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/projects",
  summary: "Get all projects",
  description: "Retrieve a list of all projects",
  tags: ["Projects"],
  responses: {
    200: {
      description: "List of projects",
      content: {
        "application/json": {
          schema: ProjectsResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/projects/{id}",
  summary: "Get project by ID",
  description: "Retrieve a specific project by its ID",
  tags: ["Projects"],
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      description: "Project details",
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/projects",
  summary: "Create a new project",
  description: "Add a new project to the database",
  tags: ["Projects"],
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
      description: "Project created successfully",
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/projects/{id}",
  summary: "Update a project",
  description: "Update an existing project in the database",
  tags: ["Projects"],
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
      description: "Project updated successfully",
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/projects/{id}",
  summary: "Delete a project",
  description: "Remove a project from the database",
  tags: ["Projects"],
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      description: "Project deleted successfully",
      content: {
        "application/json": {
          schema: ProjectResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProjectErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/testimonials",
  summary: "Get all testimonials",
  description: "Retrieve a list of all testimonials",
  tags: ["Testimonials"],
  responses: {
    200: {
      description: "List of testimonials",
      content: {
        "application/json": {
          schema: TestimonialsResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/testimonials/{id}",
  summary: "Get testimonial by ID",
  description: "Retrieve a specific testimonial by its ID",
  tags: ["Testimonials"],
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      description: "Testimonial details",
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
    },
    404: {
      description: "Testimonial not found",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/testimonials",
  summary: "Create a new testimonial",
  description: "Add a new testimonial to the database",
  tags: ["Testimonials"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTestimonialSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Testimonial created successfully",
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/testimonials/{id}",
  summary: "Update a testimonial",
  description: "Update an existing testimonial in the database",
  tags: ["Testimonials"],
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateTestimonialSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Testimonial updated successfully",
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
    },
    404: {
      description: "Testimonial not found",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/testimonials/{id}",
  summary: "Delete a testimonial",
  description: "Remove a testimonial from the database",
  tags: ["Testimonials"],
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      description: "Testimonial deleted successfully",
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
    },
    404: {
      description: "Testimonial not found",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: TestimonialErrorResponseSchema,
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Portfolio Backend API",
    description: "API for managing portfolio projects and testimonials",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
});
