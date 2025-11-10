import { defineConfig, env } from "prisma/config";

import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: "migrations",
    seed: "tsx seed.ts",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
