"use client";

import {
  frameworkMap,
  getFieldTreeData,
  getMetricData,
  getProcessedTacticsData,
} from "@/api/evaluate";
import {
  EvaluationReportTypes,
  MetricItem,
  HeatmapEvaluationFramework,
  SortType,
  Tactic,
  FieldItem,
} from "@/api/evaluate/types";
import DrillDownTable from "@/components/DrilldownReportTable/DrilldownReportTable";
import FilterBar from "@/components/FilterBar/FilterBar";
import HeatmapBoard from "@/components/HeatmapBoard/HeatmapBoard";
import MetricsBoard from "@/components/MetricsBoard/MetricsBoard";
import ResilienceChart, {
  resilienceData,
} from "@/components/ResilienceChart/ResilienceChart";
import { useMemo, useState } from "react";

const DUMMY_ROUND_OPTIONS = [
  "All Selected (4)",
  "Penetration to C-ITS Center (1회차)",
  "Penetration to C-ITS Center (2회차)",
  "Penetration to C-ITS Center (3회차)",
  "Penetration to C-ITS Center (4회차)",
];

export default function Evaluate() {
  const [framework, setFramework] = useState<HeatmapEvaluationFramework>(
    HeatmapEvaluationFramework.ENTERPRISE
  );
  const [sortType] = useState<SortType>("IMPACT");
  const tacticOptions = [
    { name: `All Selected (${frameworkMap[framework].length})` },
    ...frameworkMap[framework],
  ].map((option) => option.name);
  const [reportType, setReportType] = useState<EvaluationReportTypes>(
    EvaluationReportTypes.RESILIENCETRENDING
  );
  const [round, setRound] = useState<string>(
    DUMMY_ROUND_OPTIONS[DUMMY_ROUND_OPTIONS.length - 1]
  );

  const [selectedTactic, setSelectedTactic] = useState(tacticOptions[0]);

  const tacticsData: Tactic[] = useMemo(() => {
    return getProcessedTacticsData(round, framework, sortType, selectedTactic);
  }, [framework, round, sortType, selectedTactic]);

  const metricesData: MetricItem[] = useMemo(() => {
    return getMetricData(round);
  }, [round]);

  const fieldTreeData: FieldItem[] = useMemo(() => {
    return getFieldTreeData(round);
  }, [round]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl">Penetration to C-ITS Center</h1>
        <div className="flex flex-row gap-3">
          <span className="text-gray-400 text-sm">{"Evaluate"}</span>
        </div>
      </div>
      {/* FilterBar */}
      <FilterBar
        reportOptions={Object.values(EvaluationReportTypes)}
        reportType={reportType}
        setReportType={setReportType}
        roundOptions={Object.values(DUMMY_ROUND_OPTIONS)}
        round={round}
        setRound={setRound}
        tactics={selectedTactic}
        tacticOptions={tacticOptions}
        setTactics={setSelectedTactic}
        framework={framework}
        setFramework={setFramework}
      />
      <div className="flex flex-col gap-4 p-6 bg-base-900">
        {/* Main Content */}
        {reportType === "Heat Map" && (
          <HeatmapBoard sortedAndFilteredTactics={tacticsData} />
        )}

        {reportType === "Resilience Trending" && <ResilienceChart />}

        {reportType === "Metrics" && (
          <MetricsBoard
            score={
              resilienceData.find((val) => val.round === round)?.score || 0
            }
            fieldTreeData={fieldTreeData}
            metriciesData={metricesData}
          />
        )}

        {reportType === "Drilldown Report" && <DrillDownTable round={round} />}
      </div>
    </div>
  );
}
