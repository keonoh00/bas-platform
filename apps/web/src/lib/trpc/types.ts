import type { AppRouter } from "~/server/trpc/routers/app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { TRPCClientError } from "@trpc/client";

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type RouterInputs = inferRouterInputs<AppRouter>;

export type TRPCError = TRPCClientError<AppRouter>;

export type InferProcedureOutput<
  TRouter extends keyof RouterOutputs,
  TProcedure extends keyof RouterOutputs[TRouter]
> = RouterOutputs[TRouter][TProcedure];

export type InferProcedureInput<
  TRouter extends keyof RouterInputs,
  TProcedure extends keyof RouterInputs[TRouter]
> = RouterInputs[TRouter][TProcedure];
