import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/db";

export const getAllExperiences = async () => {
  return prisma.experiences.findMany({
    orderBy: { order: "asc" },
  });
};

export const getExperienceById = async (id: number) => {
  return prisma.experiences.findUnique({
    where: { id },
  });
};

export const createExperience = async (data: Prisma.experiencesCreateInput) => {
  return prisma.experiences.create({ data });
};

export const updateExperience = async (id: number, data: Prisma.experiencesUpdateInput) => {
  return prisma.experiences.update({ where: { id }, data }).catch(() => null);
};

export const deleteExperience = async (id: number) => {
  return prisma.experiences.delete({ where: { id } }).catch(() => null);
};
