import type { z } from "zod";
import { prisma } from "../lib/db";
import type { InsertTestimonial } from "../models/testimonialModel";
import { UpdateTestimonialSchema } from "../schemas/testimonialSchema";

export const getAllTestimonials = async () => {
  return prisma.testimonials.findMany();
};

export const getTestimonial = async (id: number) => {
  return prisma.testimonials.findFirst({ where: { id } });
};

export const postTestimonial = async (data: InsertTestimonial) => {
  return prisma.testimonials.create({
    data: {
      company: data.company,
      content: data.content,
      designation: data.designation,
      client_name: data.client_name,
      image: data.image ?? null,
    },
  });
};

export const deleteTestimonial = async (id: number) => {
  return prisma.testimonials.delete({ where: { id } }).catch(() => null);
};

export const editTestimonial = async (data: { id: number } & z.infer<typeof UpdateTestimonialSchema>) => {
  const { id, ...rest } = data;
  const updateData: Record<string, unknown> = {};
  if (rest["client_name"] !== undefined) updateData["client_name"] = rest["client_name"];
  if (rest["company"] !== undefined) updateData["company"] = rest["company"];
  if (rest["content"] !== undefined) updateData["content"] = rest["content"];
  if (rest["designation"] !== undefined) updateData["designation"] = rest["designation"];
  if (rest["image"] !== undefined) updateData["image"] = rest["image"];
  return prisma.testimonials
    .update({
      where: { id },
      data: updateData as Parameters<typeof prisma.testimonials.update>[0]["data"],
    })
    .catch(() => null);
};
