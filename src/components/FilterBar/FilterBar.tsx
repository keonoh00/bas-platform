"use client";

import {
  EvaluationReportTypes,
  HeatmapEvaluationFramework,
  HeatmapEvaluationFrameworkKeyType,
} from "@/api/evaluate/types";
import React from "react";

interface FilterBarProps {
  reportOptions: EvaluationReportTypes[];
  reportType: EvaluationReportTypes;
  setReportType: (value: EvaluationReportTypes) => void;
  roundOptions: string[];
  round: string;
  setRound: (value: string) => void;
  tactics: string;
  tacticOptions: string[];
  setTactics: (value: string) => void;
  framework: HeatmapEvaluationFramework;
  setFramework: (value: HeatmapEvaluationFramework) => void;
}

export default function FilterBar({
  reportOptions,
  reportType,
  setReportType,
  roundOptions,
  round,
  setRound,
  tactics,
  tacticOptions,
  setTactics,
  framework,
  setFramework,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-start gap-6 p-2 rounded-md w-full">
      <div>
        {/* Report Type */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <label className="text-sm font-bold text-orange-500">
            Report Type
          </label>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value as EvaluationReportTypes)
            }
          >
            {reportOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Round */}
      {reportType !== EvaluationReportTypes.RESILIENCETRENDING && (
        <div className="flex items-center gap-2 min-w-[200px]">
          <label className="text-sm text-neutral-400">Round</label>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={round}
            onChange={(e) => setRound(e.target.value)}
          >
            {roundOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      )}

      {/* Tactics & Framework */}
      {reportType === EvaluationReportTypes.HEATMAP && (
        <div className="flex flex-wrap gap-6 min-w-[500px]">
          <div className="flex items-center gap-2 min-w-[200px]">
            <label className="text-sm text-neutral-400">Tactics</label>
            <select
              className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
              value={tactics}
              onChange={(e) => setTactics(e.target.value)}
            >
              {tacticOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 min-w-[200px]">
            <label className="text-sm text-neutral-400">Framework</label>
            <select
              className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
              value={framework}
              onChange={(e) =>
                setFramework(e.target.value as HeatmapEvaluationFramework)
              }
            >
              {Object.keys(HeatmapEvaluationFramework).map((key) => (
                <option
                  key={key}
                  value={
                    HeatmapEvaluationFramework[
                      key as HeatmapEvaluationFrameworkKeyType
                    ]
                  }
                >
                  {
                    HeatmapEvaluationFramework[
                      key as HeatmapEvaluationFrameworkKeyType
                    ]
                  }
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
