"use client";

import React, { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table"; // Assuming you placed it like this
import SearchInput from "../common/SearchInput/SearchInput";
import { TAG_COLOR_MAP, Tag } from "../common/Tag/Tag";
import { testedResults, TestResultItem } from "@/api/evaluate/data";
import { Pagination } from "../common/Pagination/Pagination";

const uniqueTactics = [...new Set(testedResults.map((it) => it.tactic))].sort();

const TACTIC_COLOR_MAP: Record<string, string> = {};
const TAG_COLOR_KEYS = Object.keys(
  TAG_COLOR_MAP
) as (keyof typeof TAG_COLOR_MAP)[];

uniqueTactics.forEach((tactic, index) => {
  TACTIC_COLOR_MAP[tactic] = TAG_COLOR_KEYS[index % TAG_COLOR_KEYS.length];
});

const OUTCOME_COLOR_MAP: Record<string, keyof typeof TAG_COLOR_MAP> = {
  Alert: "green",
  Blocked: "blue",
  None: "red",
  Logged: "orange",
};
interface DrillDownTableProps {
  round: string;
}

export default function DrillDownTable({ round }: DrillDownTableProps) {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const filteredData = testedResults
    .filter((item) => item.testCase.toLowerCase().includes(query.toLowerCase()))
    .filter((item) =>
      round.startsWith("All Selected") ? true : item.phase === round
    );
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: TableColumn<TestResultItem>[] = [
    {
      label: "Test case",
      render: (item) => item.testCase,
    },
    {
      label: "Phase",
      render: (item) => item.phase,
    },
    {
      label: "Technique ID",
      render: (item) => <span className="font-bold">{item.techniqueId}</span>,
    },
    {
      label: "Technique",
      render: (item) => item.technique,
    },

    {
      label: "Tactic",
      render: (item, index) => (
        <Tag
          label={item.tactic}
          key={index}
          color={TACTIC_COLOR_MAP[item.tactic] as keyof typeof TAG_COLOR_MAP}
        />
      ),
    },
    {
      label: "Outcome",
      render: (item, index) => (
        <Tag
          label={item.outcome}
          key={index}
          color={OUTCOME_COLOR_MAP[item.outcome] ?? "gray"}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="w-120">
        <SearchInput onSearch={setQuery} />
      </div>

      <Table<TestResultItem> data={paginatedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
