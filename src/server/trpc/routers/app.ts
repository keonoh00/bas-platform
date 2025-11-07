import { router, publicProcedure } from "../init";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => ({ greeting: `Hello, ${input.name}!` })),

  add: publicProcedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .mutation(({ input }) => ({ sum: input.a + input.b })),

  abilities: router({
    list: publicProcedure
      .input(
        z
          .object({
            page: z.number().int().positive().default(1),
            pageSize: z.number().int().positive().max(100).default(10),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const pageNumber = input?.page ?? 1;
        const pageSize = input?.pageSize ?? 10;
        const abilities = await prisma.ability.findMany({
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
        return abilities;
      }),
    count: publicProcedure.query(async () => {
      const count = await prisma.ability.count();
      return count;
    }),
  }),

  agents: router({
    list: publicProcedure.query(async () => {
      const baseUrl = process.env.DEFEND_API_URL;
      const apiKey = process.env.DEFEND_API_KEY;
      if (!apiKey) {
        throw new Error("DEFEND_API_KEY is not set");
      }
      if (!baseUrl) {
        throw new Error("DEFEND_API_URL is not set");
      }
      const trimmed = baseUrl.trim();
      const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed);
      const candidateBase = hasScheme ? trimmed : `https://${trimmed}`;
      let endpoint: URL;
      try {
        endpoint = new URL("/api/v2/agents", candidateBase);
      } catch (err) {
        throw new Error(
          "DEFEND_API_URL is invalid after normalization. Ensure it is a valid absolute URL, e.g. https://api.example.com"
        );
      }

      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Key: apiKey,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch agents: ${response.status} ${text}`);
      }
      const data = await response.json();
      return data;
    }),
  }),
});

export type AppRouter = typeof appRouter;
