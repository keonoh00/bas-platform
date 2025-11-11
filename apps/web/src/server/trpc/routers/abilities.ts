import { router, publicProcedure } from "../init";
import { paginationSchema, searchQuerySchema } from "../schemas/common";
import {
  paginatedAbilitiesResponseSchema,
  abilityStatisticsSchema,
} from "../schemas/responses";
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

  statistics: publicProcedure
    .output(abilityStatisticsSchema)
    .query(async () => {
      const totalCount = await prisma.ability.count();

      // Fetch all abilities with tactic, platform, and type in a single query
      const abilities = await prisma.ability.findMany({
        select: { tactic: true, platform: true, type: true },
      });
      // Aggregate tactics, platforms, and types in one pass
      const tacticCounts: Record<string, number> = {};
      const platformCounts: Record<string, number> = {};
      const typeCounts: Record<string, number> = {};
      abilities.forEach((item) => {
        const tactic = item.tactic || "Unknown";
        tacticCounts[tactic] = (tacticCounts[tactic] || 0) + 1;
        const platform = item.platform || "Unknown";
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        const type = item.type || "Unknown";
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });

      const byTactic = Object.entries(tacticCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

      const byPlatform = Object.entries(platformCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      const byType = Object.entries(typeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      return {
        totalCount,
        byTactic,
        byPlatform,
        byType,
      };
    }),
});
