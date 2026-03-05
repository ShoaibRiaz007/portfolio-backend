import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/db";

export const getProfile = async () => {
  return prisma.profile.findFirst();
};

export const upsertProfile = async (data: Prisma.profileCreateInput) => {
  return prisma.profile.upsert({
    where: { id: 1 },
    create: { ...data, id: 1 },
    update: data,
  });
};
