import type { AppRouter } from "~/server/trpc/routers/app";
import type { inferRouterOutputs } from "@trpc/server";

export type RouterOutputs = inferRouterOutputs<AppRouter>;
