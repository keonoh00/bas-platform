import { proxyFetch } from "..";
import { testedResults } from "../evaluate/data";
import { OutcomeType } from "../evaluate/types";

// -------------------- Types --------------------

export interface AttackStep {
  attack_id: string;
  index: string;
  attack_name: string;
  next_step: string[];
  findings: Record<string, string[]>;
  requirements: Record<string, unknown>;
  technique_id: string;
  technique_name: string;
  sub_index: string;
  sub_group: string;
  link_ids: string[];
  hosts: Record<string, boolean[]>;
  result: {
    passed: number;
    failed: number;
  };
}

export interface GraphFlattenBlock extends AttackStep {
  target: string;
  status: "Passed" | "Failed";
  outcome: OutcomeType;
  tags: string[];
  detectionTime: Date;
  role: string;
  phase: string;
}

export interface AttackRoleGroup {
  role: string;
  data: GraphFlattenBlock[];
}

export const convertTestResults = (): GraphFlattenBlock[] => {
  return testedResults.map((item, idx) => {
    const outcome = item.outcome as OutcomeType;

    return {
      attack_id: `${item.phase.replace(/\s+/g, "-")}-${idx}`,
      index: `${idx}`,
      attack_name: item.testCase,
      next_step: [],
      findings: {},
      requirements: {},
      technique_id: item.techniqueId,
      technique_name: item.technique,
      sub_index: "0",
      sub_group: item.tactic,
      link_ids: [],
      hosts: {},
      result: {
        passed: ["Alert", "Block"].includes(outcome) ? 1 : 0,
        failed: ["Logged", "None"].includes(outcome) ? 1 : 0,
      },
      target: item.target,
      status: ["Alert", "Block"].includes(outcome) ? "Passed" : "Failed",
      outcome,
      tags: ["Engineering"],
      detectionTime: new Date(),
      role: item.tactic,
      phase: item.phase,
    };
  });
};

// -------------------- Core Function --------------------

// Helper to get literal-typed status
function getStatus(passed: number): "Passed" | "Failed" {
  return passed > 0 ? "Passed" : "Failed";
}

export async function fetchAttackGraphConfiguration(
  graphId: string,
  log: boolean = false
): Promise<GraphFlattenBlock[]> {
  const useDummyData = true;

  const path = `/restapi/graph/configuration/${graphId}`;
  const headers: Record<string, string> = { Key: "ADMIN123" };

  const response = useDummyData
    ? convertTestResults() // ✅ Preserves testedResults order
    : await proxyFetch({
        path,
        method: "GET",
        headers,
      });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("→ Path:", path);
    console.log("→ Method:", "GET");
    console.log("→ Headers:", headers);
    console.log("← Response Data:", response);
  }

  // If dummy, it's already GraphFlattenBlock[]
  if (useDummyData) {
    return response as GraphFlattenBlock[];
  }

  // Otherwise, convert AttackRoleGroup[] into GraphFlattenBlock[]
  const result: GraphFlattenBlock[] = (response as AttackRoleGroup[]).flatMap(
    (group) =>
      group.data.map((step) => ({
        ...step,
        technique: step.attack_name,
        target: step.target,
        status: getStatus(step.result.passed), // ✅ typed
        outcome: step.outcome,
        tags: ["Engineering"],
        detectionTime: new Date(),
        role: group.role,
        phase: step.phase,
      }))
  );

  return result;
}
