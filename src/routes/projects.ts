import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteProject, editProject, getAllProjects, getProject, postProject } from "../queries/projectQueries";
import { CreateProjectSchema, IdParamSchema, UpdateProjectSchema } from "../schemas/projectSchema";
import { normalizeErrorData } from "../utils/error";

export const projectsRoute = new Hono()
  .get("/", async (c) => {
    try {
      const projects = await getAllProjects();

      return c.json({
        success: true,
        message: "Projects Fetched Successfully!",
        data: projects,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Projects Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .get("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const project = await getProject(id);

      if (!project) {
        return c.json(
          {
            success: false,
            message: "Project not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Project Fetched Successfully!",
        data: project,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Project Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", CreateProjectSchema), async (c) => {
    const project = c.req.valid("json");

    try {
      const result = await postProject({
        ...project,
        updatedAt: project.updatedAt ?? new Date(),
      });

      return c.json(
        {
          success: true,
          message: "Project Added Successfully!",
          data: result,
        },
        201,
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Add Project!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .put("/:id", zValidator("param", IdParamSchema), zValidator("json", UpdateProjectSchema), async (c) => {
    const project = c.req.valid("json");
    const { id } = c.req.valid("param");

    try {
      const result = await editProject({
        id,
        ...project,
        updatedAt: new Date(),
      } as never);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Project not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Project Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Update Project!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .delete("/:id", zValidator("param", IdParamSchema), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const result = await deleteProject(id);

      if (!result) {
        return c.json(
          {
            success: false,
            message: "Project not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Project Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Delete Project!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  });
