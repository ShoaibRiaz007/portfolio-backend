import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import {
  CreateEducationSchema,
  EducationResponseSchema,
  EducationsResponseSchema,
  ErrorResponseSchema as EducationErrorResponseSchema,
  IdParamSchema as EducationIdParamSchema,
  UpdateEducationSchema,
} from "../schemas/educationSchema";
import {
  CreateExperienceSchema,
  ErrorResponseSchema as ExperienceErrorResponseSchema,
  ExperienceResponseSchema,
  ExperiencesResponseSchema,
  IdParamSchema as ExperienceIdParamSchema,
  UpdateExperienceSchema,
} from "../schemas/experienceSchema";
import {
  ErrorResponseSchema as ProfileErrorResponseSchema,
  ProfileResponseSchema,
  UpsertProfileSchema,
} from "../schemas/profileSchema";
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

// Profile routes
registry.registerPath({
  method: "get",
  path: "/api/profile",
  summary: "Get profile",
  description: "Retrieve the profile record",
  tags: ["Profile"],
  responses: {
    200: {
      description: "Profile details",
      content: {
        "application/json": {
          schema: ProfileResponseSchema,
        },
      },
    },
    404: {
      description: "Profile not found",
      content: {
        "application/json": {
          schema: ProfileErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProfileErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/profile",
  summary: "Upsert profile",
  description: "Create or update the profile record",
  tags: ["Profile"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpsertProfileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Profile updated successfully",
      content: {
        "application/json": {
          schema: ProfileResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: ProfileErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ProfileErrorResponseSchema,
        },
      },
    },
  },
});

// Experience routes
registry.registerPath({
  method: "get",
  path: "/api/experiences",
  summary: "Get all experiences",
  description: "Retrieve a list of all experiences",
  tags: ["Experiences"],
  responses: {
    200: {
      description: "List of experiences",
      content: {
        "application/json": {
          schema: ExperiencesResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/experiences/{id}",
  summary: "Get experience by ID",
  description: "Retrieve a specific experience by its ID",
  tags: ["Experiences"],
  request: {
    params: ExperienceIdParamSchema,
  },
  responses: {
    200: {
      description: "Experience details",
      content: {
        "application/json": {
          schema: ExperienceResponseSchema,
        },
      },
    },
    404: {
      description: "Experience not found",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/experiences",
  summary: "Create a new experience",
  description: "Add a new experience to the database",
  tags: ["Experiences"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateExperienceSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Experience created successfully",
      content: {
        "application/json": {
          schema: ExperienceResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/experiences/{id}",
  summary: "Update an experience",
  description: "Update an existing experience in the database",
  tags: ["Experiences"],
  request: {
    params: ExperienceIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateExperienceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Experience updated successfully",
      content: {
        "application/json": {
          schema: ExperienceResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Experience not found",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/experiences/{id}",
  summary: "Delete an experience",
  description: "Remove an experience from the database",
  tags: ["Experiences"],
  request: {
    params: ExperienceIdParamSchema,
  },
  responses: {
    200: {
      description: "Experience deleted successfully",
      content: {
        "application/json": {
          schema: ExperienceResponseSchema,
        },
      },
    },
    404: {
      description: "Experience not found",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ExperienceErrorResponseSchema,
        },
      },
    },
  },
});

// Education routes
registry.registerPath({
  method: "get",
  path: "/api/education",
  summary: "Get all education",
  description: "Retrieve a list of all education records",
  tags: ["Education"],
  responses: {
    200: {
      description: "List of education records",
      content: {
        "application/json": {
          schema: EducationsResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/education/{id}",
  summary: "Get education by ID",
  description: "Retrieve a specific education record by its ID",
  tags: ["Education"],
  request: {
    params: EducationIdParamSchema,
  },
  responses: {
    200: {
      description: "Education details",
      content: {
        "application/json": {
          schema: EducationResponseSchema,
        },
      },
    },
    404: {
      description: "Education not found",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/education",
  summary: "Create a new education record",
  description: "Add a new education record to the database",
  tags: ["Education"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateEducationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Education created successfully",
      content: {
        "application/json": {
          schema: EducationResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/education/{id}",
  summary: "Update an education record",
  description: "Update an existing education record in the database",
  tags: ["Education"],
  request: {
    params: EducationIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateEducationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Education updated successfully",
      content: {
        "application/json": {
          schema: EducationResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Education not found",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/education/{id}",
  summary: "Delete an education record",
  description: "Remove an education record from the database",
  tags: ["Education"],
  request: {
    params: EducationIdParamSchema,
  },
  responses: {
    200: {
      description: "Education deleted successfully",
      content: {
        "application/json": {
          schema: EducationResponseSchema,
        },
      },
    },
    404: {
      description: "Education not found",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: EducationErrorResponseSchema,
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
    description: "API for managing portfolio projects, testimonials, profile, experiences, and education",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
});
