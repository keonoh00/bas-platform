import { testedResults } from "@/api/evaluate/data";
import { RawTactic, tacticsDataEnterprise } from "./enterprise/enterpriseData";
import { tacticsDataMobile } from "./mobile/mobileData";
import { tacticsDataICS } from "./ics/icsData";
import {
  FieldItem,
  HeatmapEvaluationFramework,
  MetricItem,
  OutcomeType,
  SeverityEnum,
  SortType,
  SubTechnique,
  Tactic,
  Technique,
} from "./types";

// -------------------- Constants --------------------
const IMPACT_ORDER: Record<SeverityEnum, number> = {
  [SeverityEnum.Weakest]: 5,
  [SeverityEnum.Minimal]: 4,
  [SeverityEnum.Lower]: 3,
  [SeverityEnum.Moderate]: 2,
  [SeverityEnum.Strong]: 1,
  [SeverityEnum.NoTestCoverage]: 0,
};

const PASSED_OUTCOMES = new Set(["blocked", "alert"]);

export const frameworkMap: Record<HeatmapEvaluationFramework, RawTactic[]> = {
  [HeatmapEvaluationFramework.ENTERPRISE]: tacticsDataEnterprise,
  [HeatmapEvaluationFramework.MOBILE]: tacticsDataMobile,
  [HeatmapEvaluationFramework.ICS]: tacticsDataICS,
};

// -------------------- Helpers --------------------
const getFilteredResultsByRound = (round: string) =>
  round.startsWith("All")
    ? testedResults
    : testedResults.filter((item) => item.phase === round);

const normalizeTacticLabel = (label: string) =>
  label.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const extractTechniqueId = (techniqueId: string) => techniqueId.split(".")[0];

const isPassedOutcome = (outcome: string): boolean =>
  PASSED_OUTCOMES.has(outcome.toLowerCase());

const normalizeOutcome = (outcome: string): OutcomeType => {
  const normalized = outcome.toLowerCase();
  if (normalized === "blocked" || normalized === "block") return "Block";
  if (normalized === "alert" || normalized === "alerted") return "Alert";
  if (normalized === "logged") return "Logged";
  return "None";
};

const mapOutcomeToSeverity = (outcome: string): SeverityEnum => {
  switch (normalizeOutcome(outcome)) {
    case "Block":
    case "Alert":
      return SeverityEnum.Strong;
    case "Logged":
      return SeverityEnum.Minimal;
    case "None":
    default:
      return SeverityEnum.Weakest;
  }
};

const mapPassPercentageToSeverity = (
  percentage: number,
  total: number
): SeverityEnum => {
  if (total === 0) return SeverityEnum.NoTestCoverage;
  if (percentage <= 20) return SeverityEnum.Weakest;
  if (percentage <= 40) return SeverityEnum.Minimal;
  if (percentage <= 60) return SeverityEnum.Lower;
  if (percentage <= 80) return SeverityEnum.Moderate;
  return SeverityEnum.Strong;
};

// -------------------- Tactic Evaluation --------------------
const getTacticTree = (round: string): Tactic[] => {
  const filteredResults = getFilteredResultsByRound(round);

  const tacticGroupMap = new Map<
    string,
    Map<
      string,
      {
        name: string;
        passed: number;
        total: number;
        subtechniques: SubTechnique[];
      }
    >
  >();

  for (const item of filteredResults) {
    const tacticName = normalizeTacticLabel(item.tactic);
    const fullTechniqueId = item.techniqueId;
    const rootTechniqueId = extractTechniqueId(fullTechniqueId);
    const passed = isPassedOutcome(item.outcome) ? 1 : 0;
    const severity = mapOutcomeToSeverity(item.outcome);

    if (!tacticGroupMap.has(tacticName)) {
      tacticGroupMap.set(tacticName, new Map());
    }

    const techniqueMap = tacticGroupMap.get(tacticName)!;
    if (!techniqueMap.has(rootTechniqueId)) {
      techniqueMap.set(rootTechniqueId, {
        name: item.technique,
        passed: 0,
        total: 0,
        subtechniques: [],
      });
    }

    const technique = techniqueMap.get(rootTechniqueId)!;
    technique.passed += passed;
    technique.total += 1;
    technique.subtechniques.push({
      id: `${fullTechniqueId}-${technique.subtechniques.length}`,
      name: item.testCase,
      severity,
      description: item.testCase,
    });
  }

  return Array.from(tacticGroupMap.entries()).map(
    ([tacticName, techniqueMap]) => ({
      name: tacticName,
      techniques: Array.from(techniqueMap.entries()).map(([techId, data]) => {
        const score =
          data.total > 0 ? +((data.passed / data.total) * 100).toFixed(1) : 0;
        return {
          id: techId,
          name: data.name,
          resilienceScore: score,
          severity: mapPassPercentageToSeverity(score, data.total),
          topCount: data.passed,
          bottomCount: data.total,
          subtechniques: data.subtechniques,
        };
      }),
    })
  );
};

// -------------------- Replacement Mapping --------------------
function extractTechniqueReplacements(
  evaluated: Tactic[]
): { id: string; newTechnique: Partial<Technique> }[] {
  return evaluated.flatMap((tactic) =>
    tactic.techniques.map((tech) => ({
      id: tech.id,
      newTechnique: {
        id: tech.id,
        severity: tech.severity,
        topCount: tech.topCount,
        bottomCount: tech.bottomCount,
      },
    }))
  );
}

function applyTechniqueReplacements(
  baseFramework: RawTactic[],
  replacements: { id: string; newTechnique: Partial<Technique> }[]
): RawTactic[] {
  if (!replacements.length) return baseFramework;
  const map = new Map(replacements.map((r) => [r.id, r.newTechnique]));

  return baseFramework.map((tactic) => ({
    ...tactic,
    techniques: tactic.techniques.map((tech) => {
      const replacement = map.get(tech.id);
      return replacement
        ? {
            ...tech,
            ...replacement,
            subtechniques: tech.subtechniques ?? [],
          }
        : tech;
    }),
  }));
}

// -------------------- Exported Functions --------------------

export function getProcessedTacticsData(
  round: string,
  framework: HeatmapEvaluationFramework,
  sortType: SortType,
  selectedTactic: string
): Tactic[] {
  const baseFramework = frameworkMap[framework] ?? [];
  const evaluatedTree = getTacticTree(round);
  const replacements = extractTechniqueReplacements(evaluatedTree);
  const updatedFramework = applyTechniqueReplacements(
    baseFramework,
    replacements
  );

  const relevantTactics = selectedTactic.startsWith("All")
    ? updatedFramework
    : updatedFramework.filter((t) => t.name === selectedTactic);

  return relevantTactics.map((t) => {
    const sortedTechniques = [...t.techniques].sort((a, b) => {
      if (sortType === "ALPHABETICAL") {
        return a.name.localeCompare(b.name);
      }
      const aImpact =
        IMPACT_ORDER[a.severity ?? SeverityEnum.NoTestCoverage] ?? 0;
      const bImpact =
        IMPACT_ORDER[b.severity ?? SeverityEnum.NoTestCoverage] ?? 0;
      return bImpact - aImpact;
    });

    return {
      name: t.name,
      techniques: sortedTechniques.map((tech) => ({
        id: tech.id,
        name: tech.name,
        resilienceScore: Math.round((tech.topCount / tech.bottomCount) * 100),
        severity: tech.severity ?? SeverityEnum.NoTestCoverage,
        topCount: tech.topCount ?? 0,
        bottomCount: tech.bottomCount ?? 0,
        subtechniques: tech.subtechniques ?? [],
      })),
    };
  });
}

export function getMetricData(round: string): MetricItem[] {
  const filtered = getFilteredResultsByRound(round);
  const tacticMetrics = new Map<string, MetricItem>();

  for (const item of filtered) {
    const tactic = item.tactic;
    const outcome = normalizeOutcome(item.outcome);

    if (!tacticMetrics.has(tactic)) {
      tacticMetrics.set(tactic, {
        name: tactic,
        Block: 0,
        Alert: 0,
        Logged: 0,
        None: 0,
      });
    }

    tacticMetrics.get(tactic)![outcome]++;
  }

  return Array.from(tacticMetrics.values());
}

export function getFieldTreeData(round: string): FieldItem[] {
  const filtered = getFilteredResultsByRound(round);
  let blocked = 0,
    alert = 0,
    logged = 0,
    none = 0;

  for (const item of filtered) {
    const outcome = normalizeOutcome(item.outcome);
    switch (outcome) {
      case "Block":
        blocked++;
        break;
      case "Alert":
        alert++;
        break;
      case "Logged":
        logged++;
        break;
      case "None":
        none++;
        break;
    }
  }

  const total = blocked + alert + logged + none;

  return [
    { title: "Campaigns", count: total },
    {
      title: "Passed",
      count: blocked + alert,
      children: [
        { title: "Blocked", count: blocked },
        { title: "Alert", count: alert },
      ],
    },
    {
      title: "Failed",
      count: logged + none,
      children: [
        { title: "Logged", count: logged },
        { title: "None", count: none },
      ],
    },
  ];
}
