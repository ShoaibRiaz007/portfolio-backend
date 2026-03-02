import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ApiErrorDataSchema } from "./common";

extendZodWithOpenApi(z);

export const TestimonialSchema = z.object({
  id: z.number(),
  image: z.string().nullable(),
  company: z.string(),
  content: z.string(),
  designation: z.string(),
  client_name: z.string(),
});

export const CreateTestimonialSchema = TestimonialSchema.omit({ id: true })
  .extend({ image: z.string().optional() })
  .refine((d) => d.company.length >= 3, { message: "Company Name Must be atleast 3 characters!", path: ["company"] })
  .refine((d) => d.content.length >= 10, { message: "Content Must be atleast 10 characters!", path: ["content"] })
  .refine((d) => d.designation.length >= 3, {
    message: "Designation Must be atleast 3 characters!",
    path: ["designation"],
  })
  .refine((d) => d.client_name.length >= 3, {
    message: "Client Name Must be atleast 3 characters!",
    path: ["client_name"],
  });
export const UpdateTestimonialSchema = TestimonialSchema.omit({ id: true })
  .extend({ image: z.string().optional() })
  .partial();

export const TestimonialResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: TestimonialSchema,
});

export const TestimonialsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(TestimonialSchema),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ApiErrorDataSchema.optional(),
});

export const IdParamSchema = z.object({
  id: z.string().transform(Number),
});

export const getAllTestimonialsRoute = {
  method: "get" as const,
  path: "/",
  tags: ["Testimonials"],
  summary: "Get all testimonials",
  description: "Retrieve a list of all testimonials",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TestimonialsResponseSchema,
        },
      },
      description: "List of testimonials",
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

export const getTestimonialRoute = {
  method: "get" as const,
  path: "/{id}",
  tags: ["Testimonials"],
  summary: "Get testimonial by ID",
  description: "Retrieve a specific testimonial by its ID",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
      description: "Testimonial details",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Testimonial not found",
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

export const createTestimonialRoute = {
  method: "post" as const,
  path: "/",
  tags: ["Testimonials"],
  summary: "Create a new testimonial",
  description: "Add a new testimonial to the database",
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
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
      description: "Testimonial created successfully",
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

export const updateTestimonialRoute = {
  method: "put" as const,
  path: "/{id}",
  tags: ["Testimonials"],
  summary: "Update a testimonial",
  description: "Update an existing testimonial in the database",
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
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
      description: "Testimonial updated successfully",
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
      description: "Testimonial not found",
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

export const deleteTestimonialRoute = {
  method: "delete" as const,
  path: "/{id}",
  tags: ["Testimonials"],
  summary: "Delete a testimonial",
  description: "Remove a testimonial from the database",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TestimonialResponseSchema,
        },
      },
      description: "Testimonial deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Testimonial not found",
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
