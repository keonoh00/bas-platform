import { router, publicProcedure } from "../init";
import { paginationSchema, searchQuerySchema } from "../schemas/common";
import prisma from "~/lib/prisma";

export const abilitiesRouter = router({
  list: publicProcedure.input(paginationSchema).query(async ({ input }) => {
    const pageNumber = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;
    const [abilities, count] = await prisma.$transaction([
      prisma.ability.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      }),
      prisma.ability.count(),
    ]);

    return { abilities, count };
  }),

  search: publicProcedure.input(searchQuerySchema).query(async ({ input }) => {
    const pageNumber = input?.page ?? 1;
    const pageSize = input?.pageSize ?? 10;
    const query = input?.query ?? "";
    const [abilities, count] = await prisma.$transaction([
      prisma.ability.findMany({
        where: {
          OR: [
            { ability_name: { contains: query } },
            { ability_id: { contains: query } },
            { tactic: { contains: query } },
            { technique_name: { contains: query } },
          ],
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      }),
      prisma.ability.count({
        where: {
          OR: [
            { ability_name: { contains: query } },
            { ability_id: { contains: query } },
            { tactic: { contains: query } },
            { technique_name: { contains: query } },
          ],
        },
      }),
    ]);

    return { abilities, count };
  }),
});
