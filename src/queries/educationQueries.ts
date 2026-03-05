import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/db";

export const getAllEducation = async () => {
  return prisma.education.findMany({
    orderBy: { order: "asc" },
  });
};

export const getEducationById = async (id: number) => {
  return prisma.education.findUnique({
    where: { id },
  });
};

export const createEducation = async (data: Prisma.educationCreateInput) => {
  return prisma.education.create({ data });
};

export const updateEducation = async (id: number, data: Prisma.educationUpdateInput) => {
  return prisma.education.update({ where: { id }, data }).catch(() => null);
};

export const deleteEducation = async (id: number) => {
  return prisma.education.delete({ where: { id } }).catch(() => null);
};
