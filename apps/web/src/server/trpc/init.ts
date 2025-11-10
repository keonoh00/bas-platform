import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

export type Context = {
  // Add auth/session, db, etc. Example:
  // userId?: string | null
};

export const createContext = async (): Promise<Context> => {
  // Inject auth, db, headers, etc. for each request
  return {};
};

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      zod: error.cause instanceof ZodError ? error.cause.flatten() : null,
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
// For auth, make middlewares: const protectedProcedure = t.procedure.use(authMiddleware)
