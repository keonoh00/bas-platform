"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Table, TableColumn } from "@/components/common/Table/Table";
import clsx from "clsx";
import { Tag } from "../common/Tag/Tag";

export interface EvaluationRoundItem {
  assessmentName: string;
  score: number;
  lastActivity: Date;
  status: "평가 완료" | "평가 진행중";
  round: number;
  reportLink: string;
}

export const scenarioData: EvaluationRoundItem[] = [
  // {
  //   assessmentName: "Brute-force attack For Server",
  //   score: 29.58,
  //   lastActivity: new Date("2024-07-05 14:25:31"),
  //   status: "평가 완료",
  //   round: 2,
  //   reportLink: "/round",
  // },
  {
    assessmentName: "Penetration to C-ITS Center",
    score: -Infinity,
    lastActivity: new Date("2024-08-05 14:25:31"),
    status: "평가 완료",
    round: 4,
    reportLink: "/round",
  },
  // {
  //   assessmentName: "Command Execute to RSU",
  //   score: 58.52,
  //   lastActivity: new Date("2024-07-05 16:17:28"),
  //   status: "평가 완료",
  //   round: 2,
  //   reportLink: "/round",
  // },
  // {
  //   assessmentName: "APT28",
  //   score: 78.63,
  //   lastActivity: new Date("2024-08-03 14:25:42"),
  //   status: "평가 완료",
  //   round: 2,
  //   reportLink: "/round",
  // },
];

const columns: TableColumn<EvaluationRoundItem>[] = [
  {
    label: "Assessment Name",
    className: "py-5",
    render: (item: EvaluationRoundItem) => (
      <Link
        href={item.reportLink}
        className="underline text-blue-400 hover:text-blue-300"
      >
        {item.assessmentName}
      </Link>
    ),
  },
  {
    label: "Score",
    render: (item: EvaluationRoundItem) => (
      <span>{item.score === -Infinity ? "-" : `${item.score}%`}</span>
    ),
  },
  {
    label: "Last Activity",
    render: (item: EvaluationRoundItem) => (
      <span>
        {item.lastActivity.toISOString().replace("T", " ").split(".")[0]}
      </span>
    ),
  },
  {
    label: "Status",
    render: (item: EvaluationRoundItem) => (
      <Tag
        label={item.status}
        color={item.status === "평가 완료" ? "green" : "gray"}
      />
    ),
  },
  {
    label: "Round",
    render: (item: EvaluationRoundItem) => <span>{item.round}</span>,
  },
  {
    label: "Report",
    render: (item: EvaluationRoundItem) => (
      <Link href={item.reportLink} className="flex items-center justify-center">
        <ArrowUpRight size={20} className="text-neutral-400" />
      </Link>
    ),
  },
];

export default function EvaluationRoundTable() {
  return (
    <div className={clsx("w-full bg-base-800 rounded-lg p-4 overflow-auto")}>
      <Table data={scenarioData} columns={columns} />
    </div>
  );
}
