"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Table, TableColumn } from "../common/Table/Table";
import { Tag } from "../common/Tag/Tag";

export interface RoundItem {
  assessmentName: string;
  defense: string;
  progress: number;
  tag: string;
  link: string;
}

const roundMeta = [
  { tag: "1회차", defense: "Detection, Hunt, Response" },
  { tag: "2회차", defense: "Detection, Hunt, Response" },
  { tag: "3회차", defense: "Detection, Hunt, Response" },
  { tag: "4회차", defense: "Detection, Hunt, Response" },
];

const data: RoundItem[] = roundMeta.map(({ tag, defense }) => {
  const assessmentName = `Penetration to C-ITS Center (${tag})`;

  return {
    assessmentName,
    defense,
    progress: 100,
    tag,
    link: `/properties/${encodeURIComponent(assessmentName)}`,
  };
});

const columns: TableColumn<RoundItem>[] = [
  {
    label: "Assessment Name",
    className: "py-5",
    render: (item: RoundItem) => (
      <Link
        href={item.link}
        className="underline text-blue-400 hover:text-blue-300"
      >
        <p>{item.assessmentName}</p>
      </Link>
    ),
  },
  {
    label: "Defense",
    render: (item: RoundItem) => <div>{item.defense}</div>,
  },
  {
    label: "Outcome",
    render: (item: RoundItem) => (
      <div className="flex items-center justify-center gap-1">
        <div className="w-24 h-4 bg-base-700 rounded overflow-hidden flex">
          <div
            className={item.progress > 0 ? "bg-blue-400" : "bg-neutral-500"}
            style={{ width: `${item.progress}%` }}
          />
          {item.progress > 0 && (
            <div
              className="bg-blue-600"
              style={{ width: `${100 - item.progress}%` }}
            />
          )}
        </div>
        <span className="text-xs text-neutral-400">{item.progress}%</span>
      </div>
    ),
  },
  {
    label: "Tags",
    render: (item: RoundItem) => <Tag label={item.tag} color={"sky"} />,
  },
  {
    label: "Evaluate",
    render: () => (
      <Link href={"/evaluate"} className="flex items-center justify-center">
        <ArrowUpRight size={20} className="text-neutral-400" />
      </Link>
    ),
  },
];

export default function RoundTable() {
  return (
    <div className="flex-3 bg-base-700 rounded p-4">
      <Table data={data} columns={columns} />
    </div>
  );
}
