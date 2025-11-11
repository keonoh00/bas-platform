import { router, publicProcedure } from "../init";
import { paginationSchema, searchQuerySchema } from "../schemas/common";
import { paginatedAbilitiesResponseSchema } from "../schemas/responses";
import prisma from "~/lib/prisma";

export const abilitiesRouter = router({
  list: publicProcedure
    .input(paginationSchema)
    .output(paginatedAbilitiesResponseSchema)
    .query(async ({ input }) => {
      const pageNumber = input?.page ?? 1;
      const pageSize = input?.pageSize ?? 10;
      const [abilities, count] = await prisma.$transaction([
        prisma.ability.findMany({
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        }),
        prisma.ability.count(),
      ]);

      const transformedAbilities = abilities.map((ability) => ({
        ...ability,
        createdAt: ability.createdAt.toISOString(),
        updatedAt: ability.updatedAt.toISOString(),
      }));

      return { abilities: transformedAbilities, count };
    }),

  search: publicProcedure
    .input(searchQuerySchema)
    .output(paginatedAbilitiesResponseSchema)
    .query(async ({ input }) => {
      const pageNumber = input.page;
      const pageSize = input.pageSize;
      const query = input.query;
      const whereClause = {
        OR: [
          { ability_name: { contains: query } },
          { ability_id: { contains: query } },
          { tactic: { contains: query } },
          { technique_name: { contains: query } },
        ],
      };
      const [abilities, count] = await prisma.$transaction([
        prisma.ability.findMany({
          where: whereClause,
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        }),
        prisma.ability.count({
          where: whereClause,
        }),
      ]);

      const transformedAbilities = abilities.map((ability) => ({
        ...ability,
        createdAt: ability.createdAt.toISOString(),
        updatedAt: ability.updatedAt.toISOString(),
      }));

      return { abilities: transformedAbilities, count };
    }),
});
