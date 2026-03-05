import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getProfile, upsertProfile } from "../queries/profileQueries";
import { UpsertProfileSchema } from "../schemas/profileSchema";
import { normalizeErrorData } from "../utils/error";

export const profileRoute = new Hono()
  .get("/", async (c) => {
    try {
      const profile = await getProfile();

      if (!profile) {
        return c.json(
          {
            success: false,
            message: "Profile not found",
          },
          404,
        );
      }

      return c.json({
        success: true,
        message: "Profile Fetched Successfully!",
        data: profile,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Profile Fetch Failed!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  })
  .put("/", zValidator("json", UpsertProfileSchema), async (c) => {
    const data = c.req.valid("json");

    try {
      const result = await upsertProfile(data);

      return c.json({
        success: true,
        message: "Profile Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to Update Profile!",
          data: normalizeErrorData(error),
        },
        500,
      );
    }
  });
