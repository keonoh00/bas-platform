import { z } from "zod";

export const paginationSchema = z
  .object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().max(100).default(10),
  })
  .optional();

export const searchQuerySchema = z.object({
  query: z.string().min(1),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
});
