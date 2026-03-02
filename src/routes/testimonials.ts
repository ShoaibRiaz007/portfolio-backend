import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  deleteTestimonial,
  editTestimonial,
  getAllTestimonials,
  getTestimonial,
  postTestimonial,
} from "../queries/testimonialQueries";
import { CreateTestimonialSchema, IdParamSchema, UpdateTestimonialSchema } from "../schemas/testimonialSchema";
import { normalizeErrorData } from "../utils/error";

export const testimonialsRoute = new Hono()
  .get("/", async (c) => {
    try {
      const testimonials = await getAllTestimonials();

      return c.json({
        success: true,
        message: "Testimonials Fetched Successfully!",
        data: testimonials,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Testimonials Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .get("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const testimonial = await getTestimonial(id);

      if (!testimonial) {
        return c.json(
          {
            success: false,
            message: "Testimonial not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Testimonial Fetched Successfully!",
        data: testimonial,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Testimonial Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", CreateTestimonialSchema), async (c) => {
    const testimonial = c.req.valid("json");

    try {
      const result = await postTestimonial(testimonial);

      return c.json(
        {
          success: true,
          message: "Testimonial Added Successfully!",
          data: result,
        },
        201,
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Add Testimonial!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .put("/:id", zValidator("param", IdParamSchema), zValidator("json", UpdateTestimonialSchema), async (c) => {
    const testimonial = c.req.valid("json");
    const { id } = c.req.valid("param");

    try {
      const result = await editTestimonial({
        id,
        ...testimonial,
      });

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Testimonial not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Testimonial Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Update Testimonial!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .delete("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const result = await deleteTestimonial(id);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Testimonial not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Testimonial Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Delete Testimonial!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  });
