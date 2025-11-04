"use client";

import { AbilityDetail, EnrichedAdversary } from "@/api/defend/scenario";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface ScenarioTableProps {
  data: EnrichedAdversary[];
}

export const ScenarioTable: React.FC<ScenarioTableProps> = ({ data }) => {
  const columns: TableColumn<AbilityDetail>[] = [
    {
      label: "Order",
      render: (_item, index) => index + 1,
    },
    {
      label: "Name",
      render: (item) => item.name,
    },
    {
      label: "Defend Type",
      render: (item) => item.tactic,
    },
    {
      label: "TTP",
      render: (item) => item.technique_name,
    },

    {
      label: "Pre-Con Requires",
      render: (item, index) =>
        item.requirements && item.requirements.length > 0 ? (
          <button
            key={index}
            className="bg-black w-[24px] h-[24px] rounded relative"
          >
            <Image
              src={"/assets/lock.svg"}
              alt="lock"
              className="p-[4px]"
              fill
            />
          </button>
        ) : null,
    },
    {
      label: "Unlock",
      render: (item, index) =>
        item.plugin ? (
          <button
            key={index}
            className="bg-black w-[24px] h-[24px] rounded relative"
          >
            <Image
              src={"/assets/unlock.svg"}
              alt="lock"
              className="p-[4px]"
              fill
            />
          </button>
        ) : null,
    },
    {
      label: "삭제",
      render: () => (
        <button className="rounded">
          <XIcon size={18} color="red" />
        </button>
      ),
    },
  ];

  return data.length > 0 ? (
    <Table data={data.flatMap((i) => i.atomic_ordering)} columns={columns} />
  ) : (
    <div className="flex justify-center py-20">
      <span className="text-2xl">No data available</span>
    </div>
  );
};
