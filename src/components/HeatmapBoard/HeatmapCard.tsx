"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { SeverityEnum, Technique } from "@/api/evaluate/types";

const CustomStyle = {
  [SeverityEnum.NoTestCoverage]:
    "bg-neutral-700 border-dashed border-white text-gray-300",
  [SeverityEnum.Weakest]: "bg-red-500 border-gray-500",
  [SeverityEnum.Minimal]: "bg-orange-400 border-gray-500",
  [SeverityEnum.Lower]: "bg-yellow-400 border-gray-500",
  [SeverityEnum.Moderate]: "bg-green-400 border-gray-500",
  [SeverityEnum.Strong]: "bg-green-600 border-gray-500",
};

interface HeatmapCardProps {
  technique: Technique;
}

export default function HeatmapCard({ technique }: HeatmapCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasSubtechniques =
    Array.isArray(technique.subtechniques) &&
    technique.subtechniques.length > 0;

  const toggleExpand = () => {
    if (hasSubtechniques) setExpanded((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        "rounded-md border overflow-hidden  w-full min-w-0 flex flex-col",
        CustomStyle[technique.severity],
        hasSubtechniques ? "cursor-pointer" : "cursor-default"
      )}
      onClick={toggleExpand}
    >
      {/* Top Part */}
      <div className="flex">
        {/* Left Toggle Bar */}
        {hasSubtechniques && (
          <div className="flex flex-col items-center w-3 shrink-0 bg-gray-300 rounded-l">
            <span className="text-black text-[8px] mt-1 font-extrabold">
              {expanded ? "v" : ">"}
            </span>
          </div>
        )}

        {/* Main Header */}
        <div className="flex flex-col flex-grow p-1 min-w-0">
          <div className="flex justify-between items-start w-full min-w-0">
            {/* Technique Name */}
            <div className="text-[10px] font-semibold leading-tight min-w-0">
              {technique.name}
            </div>

            {/* Top and Bottom Counters */}
            <div className="flex flex-col items-center shrink-0 ml-1 gap-0.5">
              <div className="bg-white text-black rounded px-1 text-[10px] leading-none">
                {technique.topCount}
              </div>
              <div className="bg-white text-black rounded px-1 text-[10px] leading-none">
                {technique.bottomCount}
              </div>
            </div>
          </div>

          {/* Technique ID */}
          <div className="text-[10px] text-ellipsis overflow-hidden whitespace-nowrap mt-1">
            {technique.id}
          </div>
        </div>
      </div>

      {/* Subtechniques if expanded */}
      {expanded && hasSubtechniques && (
        <div className="flex flex-col gap-1 mt-2 pl-5 pr-1 pb-2">
          {technique.subtechniques?.map((sub, idx) => (
            <div key={idx} className="text-[9px] text-white font-bold">
              • {sub.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
