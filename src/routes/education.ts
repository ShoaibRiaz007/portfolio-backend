import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createEducation,
  deleteEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
} from "../queries/educationQueries";
import { CreateEducationSchema, IdParamSchema, UpdateEducationSchema } from "../schemas/educationSchema";
import { normalizeErrorData } from "../utils/error";

export const educationRoute = new Hono()
  .get("/", async (c) => {
    try {
      const education = await getAllEducation();

      return c.json({
        success: true,
        message: "Education Fetched Successfully!",
        data: education,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Education Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .get("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const education = await getEducationById(id);

      if (!education) {
        return c.json(
          {
            success: false,
            message: "Education not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Education Fetched Successfully!",
        data: education,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Education Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", CreateEducationSchema), async (c) => {
    const data = c.req.valid("json");

    try {
      const result = await createEducation(data);

      return c.json(
        {
          success: true,
          message: "Education Added Successfully!",
          data: result,
        },
        201,
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Add Education!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .put("/:id", zValidator("param", IdParamSchema), zValidator("json", UpdateEducationSchema), async (c) => {
    const data = c.req.valid("json");
    const { id } = c.req.valid("param");

    try {
      const result = await updateEducation(id, data);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Education not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Education Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Update Education!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .delete("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const result = await deleteEducation(id);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Education not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Education Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Delete Education!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  });
