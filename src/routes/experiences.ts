import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from "../queries/experienceQueries";
import { CreateExperienceSchema, IdParamSchema, UpdateExperienceSchema } from "../schemas/experienceSchema";
import { normalizeErrorData } from "../utils/error";

export const experiencesRoute = new Hono()
  .get("/", async (c) => {
    try {
      const experiences = await getAllExperiences();

      return c.json({
        success: true,
        message: "Experiences Fetched Successfully!",
        data: experiences,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Experiences Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .get("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const experience = await getExperienceById(id);

      if (!experience) {
        return c.json(
          {
            success: false,
            message: "Experience not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Experience Fetched Successfully!",
        data: experience,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Experience Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", CreateExperienceSchema), async (c) => {
    const data = c.req.valid("json");

    try {
      const result = await createExperience(data);

      return c.json(
        {
          success: true,
          message: "Experience Added Successfully!",
          data: result,
        },
        201,
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Add Experience!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .put("/:id", zValidator("param", IdParamSchema), zValidator("json", UpdateExperienceSchema), async (c) => {
    const data = c.req.valid("json");
    const { id } = c.req.valid("param");

    try {
      const result = await updateExperience(id, data);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Experience not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Experience Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Update Experience!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .delete("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const result = await deleteExperience(id);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Experience not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Experience Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Delete Experience!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  });
