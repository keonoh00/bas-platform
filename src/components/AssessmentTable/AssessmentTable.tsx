"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/common/Table/Table";
import Link from "next/link";
import { OperationItem, OperationResponse } from "@/api/defend/assetssment";

export enum AssessmentRunningState {
  Running = "Running",
  Complete = "Complete",
  Ready = "Ready",
}
export interface AssessmentTableProps {
  data: OperationResponse;
}

export default function AssessmentTable({ data }: AssessmentTableProps) {
  const columns: TableColumn<OperationItem>[] = [
    {
      label: "Assessment Name",
      render: (item) => (
        <Link
          href={`/assessment/${item.id}`}
          className="underline cursor-pointer hover:text-blue-400 transition-colors"
        >
          {item.name || `ID: ${item.id}`}
        </Link>
      ),
    },
    {
      label: "Defend Scenario",
      render: (item) => item.adversary.name,
    },
    {
      label: "Assets",
      render: (item) => item.host_group.length,
    },
    {
      label: "Live Status",
      render: (item) => (
        <span
          className={clsx(
            "px-2 py-1 rounded text-xs font-semibold",
            item.state === AssessmentRunningState.Ready
              ? "bg-gray-300 text-black"
              : item.state === AssessmentRunningState.Complete
              ? "bg-blue-500 text-white"
              : item.state === AssessmentRunningState.Running
              ? "bg-green-500 text-white"
              : ""
          )}
        >
          {item.state}
        </span>
      ),
    },
    {
      label: "Last Activity",
      render: (item) => item.start,
    },
  ];

  return (
    <div className="w-full bg-base-800 rounded-lg">
      <Table data={data} columns={columns} />
    </div>
  );
}
