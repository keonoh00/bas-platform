import { PrismaClient } from "~/prisma/client";
import seed from "./data.json";

const filterX = (data: string): string => {
  if (data === "x" || data === "X") {
    return "";
  }
  return data;
};

const prisma = new PrismaClient();
async function main() {
  await prisma.ability.createMany({
    data: seed.map((attack) => ({
      ability_id: attack.id,
      ability_name: attack.ability_name,
      tactic: filterX(attack.tactic),
      technique_id: filterX(attack.technique_id),
      technique_name: filterX(attack.technique_name),
      payload: filterX(attack.payloads),
      platform: filterX(attack.platform),
      command: filterX(attack.command),
      shell_type: filterX(attack.shell_type ?? ""),
      type: filterX(attack.type ?? ""),
      description: filterX(attack.description ?? ""),
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
