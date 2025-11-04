// -------------------- Types --------------------
export interface MetricItem {
  name: string;
  Block: number;
  Alert: number;
  Logged: number;
  None: number;
}

export interface FieldItem {
  title: string;
  count: number;
  children?: FieldItem[];
}

export interface SubTechnique {
  name: string;
  id: string;
  severity: SeverityEnum;
  description: string;
}

export interface Technique {
  id: string;
  name: string;
  resilienceScore: number;
  severity: SeverityEnum;
  topCount: number;
  bottomCount: number;
  subtechniques: SubTechnique[];
}

export interface Tactic {
  name: string;
  techniques: Technique[];
}

export enum SeverityEnum {
  NoTestCoverage = "No Test Coverage",
  Weakest = "Weakest",
  Minimal = "Minimal",
  Lower = "Lower",
  Moderate = "Moderate",
  Strong = "Strong",
}

export enum HeatmapEvaluationFramework {
  ENTERPRISE = "Enterprise",
  MOBILE = "Mobile",
  ICS = "ICS",
}

export enum EvaluationReportTypes {
  RESILIENCETRENDING = "Resilience Trending",
  HEATMAP = "Heat Map",
  DRILLDOWNREPORT = "Drilldown Report",
  METRICS = "Metrics",
}

export type HeatmapEvaluationFrameworkKeyType =
  keyof typeof HeatmapEvaluationFramework;

export type OutcomeType = "Block" | "Alert" | "Logged" | "None";
export const OUTCOME_TYPES: OutcomeType[] = [
  "Block",
  "Alert",
  "Logged",
  "None",
];

export type SortType = "ALPHABETICAL" | "IMPACT";
