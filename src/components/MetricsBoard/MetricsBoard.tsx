"use client";

import React from "react";
import ThreatPieChart from "./ThreatPieChart";
import DefenseScenarioBarChart from "./DefenseScenarioBarChart";
import FieldTree from "./FieldTree";
import { FieldItem, MetricItem } from "@/api/evaluate/types";

interface MetricsBoardProps {
  score: number;
  metriciesData: MetricItem[];
  fieldTreeData: FieldItem[];
}

const MetricsBoard: React.FC<MetricsBoardProps> = ({
  score,
  metriciesData,
  fieldTreeData,
}) => {
  return (
    <div className="flex flex-col gap-6 text-lg">
      {/* Top Section */}
      <div className="flex flex-wrap gap-6">
        {/* Left: Field Tree */}
        <div className="bg-base-800 p-4 rounded-md flex-1 min-w-[300px]">
          <div className="bg-base-800 p-4 rounded-md flex-1 min-w-[300px] space-y-5">
            <div className="font-bold text-white mb-4">Field</div>
            <FieldTree data={fieldTreeData} />
          </div>
        </div>

        {/* Right: Pie Chart */}
        <div className="bg-base-800 p-4 rounded-md flex-1 min-w-[300px] space-y-5">
          <h1 className="font-bold">
            Threat Resillence Metric (Score: {score})
          </h1>
          <ThreatPieChart data={metriciesData} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-base-800 p-4 rounded-md space-y-5">
        <div>
          <h1 className="font-bold">Statistics by Defense</h1>
          <p className="text-neutral-400 text-md">
            Scenario Blocked and detected test case for Defense Scenario
          </p>
        </div>
        <DefenseScenarioBarChart data={metriciesData} />
      </div>
    </div>
  );
};

export default MetricsBoard;
