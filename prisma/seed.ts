import { PrismaClient } from "@/prisma/client";
import seed from "./seed.json";

const prisma = new PrismaClient();
async function main() {
  for (const attack of seed) {
    await prisma.attack.create({
      data: {
        name: attack.name,
        tactic: attack.tactic,
        technique_id: attack.technique_id,
        technique_name: attack.technique_name,
        payload: attack.payloads,
        platform: attack.platform,
        command: attack.command,
        description: "",
      },
    });
  }
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
