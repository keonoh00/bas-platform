import { PrismaClient } from "@/prisma/client";
import seed from "./data.json";

const prisma = new PrismaClient();
async function main() {
  await prisma.ability.createMany({
    data: seed.map((attack) => ({
      ability_id: attack.id,
      ability_name: attack.ability_name,
      tactic: attack.tactic,
      technique_id: attack.technique_id,
      technique_name: attack.technique_name,
      payload: attack.payloads,
      platform: attack.platform,
      command: attack.command,
      shell_type: attack.shell_type,
      type: attack.type,
      description: attack.description ?? "",
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
