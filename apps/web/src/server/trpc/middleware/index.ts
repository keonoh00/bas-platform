// import { TRPCError } from "@trpc/server";
// import { t } from "../init";

/**
 * Example: Authentication middleware
 * Uncomment and customize when you add auth to your Context
 */
// export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
//   if (!ctx.userId) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next({
//     ctx: {
//       ...ctx,
//       userId: ctx.userId, // Now TypeScript knows userId is defined
//     },
//   });
// });

/**
 * Example: Admin-only middleware
 */
// export const isAdmin = t.middleware(async ({ ctx, next }) => {
//   if (!ctx.userId) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   // Check if user is admin (implement your logic here)
//   // if (!ctx.isAdmin) {
//   //   throw new TRPCError({ code: "FORBIDDEN" });
//   // }
//   return next({ ctx });
// });

/**
 * Example: Logging middleware
 */
// export const logger = t.middleware(async ({ path, type, next }) => {
//   const start = Date.now();
//   const result = await next();
//   const duration = Date.now() - start;
//   console.log(`[tRPC] ${type} ${path} - ${duration}ms`);
//   return result;
// });
