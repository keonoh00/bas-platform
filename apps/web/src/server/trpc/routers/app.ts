import { router } from "../init";
import { abilitiesRouter } from "./abilities";
import { agentsRouter } from "./agents";

export const appRouter = router({
  abilities: abilitiesRouter,
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
