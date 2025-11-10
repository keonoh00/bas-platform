import { router, publicProcedure } from "../init";
import { env } from "~/config/env";
import { agentsListResponseSchema } from "../schemas/responses";

export const agentsRouter = router({
  list: publicProcedure.output(agentsListResponseSchema).query(async () => {
    const endpoint = new URL("/api/v2/agents", env.DEFEND_API_URL);

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Key: env.DEFEND_API_KEY,
      },
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch agents: ${response.status} ${text}`);
    }
    const data = await response.json();
    // Validate and parse the response
    return agentsListResponseSchema.parse(data);
  }),
});
