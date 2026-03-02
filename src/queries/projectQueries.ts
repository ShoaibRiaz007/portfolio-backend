import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/db";
import type { InsertProject } from "../models/projectModel";

export const getAllProjects = async () => {
  return prisma.projects.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getProject = async (id: number) => {
  return prisma.projects.findFirst({
    where: { id },
  });
};

export const getProjectBySlug = async (slug: string) => {
  return prisma.projects.findUnique({
    where: { slug },
  });
};

export const postProject = async (data: InsertProject) => {
  return prisma.projects.create({
    data: {
      slug: data.slug,
      title: data.title,
      tagline: data.tagline,
      industry: data.industry ?? undefined,
      projectType: data.projectType ?? undefined,
      status: data.status ?? undefined,
      role: data.role,
      engagementModel: data.engagementModel ?? undefined,
      teamSize: data.teamSize ?? undefined,
      durationInMonths: data.durationInMonths ?? undefined,
      problem: data.problem,
      context: data.context ?? undefined,
      strategy: data.strategy,
      architecture: data.architecture,
      execution: data.execution,
      challenges: data.challenges ?? undefined,
      solution: data.solution,
      measurableImpact: data.measurableImpact,
      metrics: (data.metrics ?? undefined) as Prisma.InputJsonValue | undefined,
      techStack: data.techStack,
      infrastructure: data.infrastructure,
      integrations: data.integrations,
      coverImage: data.coverImage,
      galleryImages: data.galleryImages,
      demoUrl: data.demoUrl ?? undefined,
      repositoryUrl: data.repositoryUrl ?? undefined,
      seoTitle: data.seoTitle ?? undefined,
      seoDescription: data.seoDescription ?? undefined,
      keywords: data.keywords,
      featured: data.featured ?? false,
      published: data.published ?? false,
      updatedAt: data.updatedAt ?? new Date(),
    },
  });
};

export const deleteProject = async (id: number) => {
  return prisma.projects.delete({ where: { id } }).catch(() => null);
};

export const editProject = async (data: Record<string, unknown> & { id: number; updatedAt?: Date }) => {
  const id = data.id;
  const updateData: Record<string, unknown> = {};
  const allowed = [
    "slug",
    "title",
    "tagline",
    "industry",
    "projectType",
    "status",
    "role",
    "engagementModel",
    "teamSize",
    "durationInMonths",
    "problem",
    "context",
    "strategy",
    "architecture",
    "execution",
    "challenges",
    "solution",
    "measurableImpact",
    "metrics",
    "techStack",
    "infrastructure",
    "integrations",
    "coverImage",
    "galleryImages",
    "demoUrl",
    "repositoryUrl",
    "seoTitle",
    "seoDescription",
    "keywords",
    "featured",
    "published",
  ] as const;
  for (const key of allowed) {
    if (data[key] !== undefined) updateData[key] = data[key];
  }
  updateData["updatedAt"] = data.updatedAt ?? new Date();
  return prisma.projects
    .update({
      where: { id },
      data: updateData as Parameters<typeof prisma.projects.update>[0]["data"],
    })
    .catch(() => null);
};
