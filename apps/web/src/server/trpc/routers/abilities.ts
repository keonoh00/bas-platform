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

      // Use findMany with select to get only the fields we need, then aggregate in memory
      // This is more efficient than fetching all records
      const [tactics, platforms, types] = await Promise.all([
        prisma.ability.findMany({
          select: { tactic: true },
        }),
        prisma.ability.findMany({
          select: { platform: true },
        }),
        prisma.ability.findMany({
          select: { type: true },
        }),
      ]);

      // Aggregate tactics
      const tacticCounts: Record<string, number> = {};
      tactics.forEach((item) => {
        const tactic = item.tactic || "Unknown";
        tacticCounts[tactic] = (tacticCounts[tactic] || 0) + 1;
      });
      const byTactic = Object.entries(tacticCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

      // Aggregate platforms
      const platformCounts: Record<string, number> = {};
      platforms.forEach((item) => {
        const platform = item.platform || "Unknown";
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      });
      const byPlatform = Object.entries(platformCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      // Aggregate types
      const typeCounts: Record<string, number> = {};
      types.forEach((item) => {
        const type = item.type || "Unknown";
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
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
