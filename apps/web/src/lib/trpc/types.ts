import type { AppRouter } from "~/server/trpc/routers/app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { TRPCClientError } from "@trpc/client";

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type RouterInputs = inferRouterInputs<AppRouter>;

export type TRPCError = TRPCClientError<AppRouter>;
