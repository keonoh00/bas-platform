"use client";

import React, { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal } from "./InfoModal";
import { GraphFlattenBlock } from "@/api/defend/graph";
import { Pagination } from "../common/Pagination/Pagination";
import { Tag } from "../common/Tag/Tag";

const columns: TableColumn<GraphFlattenBlock & { onClick: () => void }>[] = [
  {
    label: "Attack Name",
    className: "py-5",
    render: (item) => <span>{item.attack_name}</span>,
  },
  {
    label: "Target",
    render: (item) => <span>{item.target}</span>,
  },
  {
    label: "Outcome",
    render: (item) => (
      <Tag
        label={item.outcome}
        color={
          item.outcome === "Alert"
            ? "green"
            : item.outcome === "Logged"
            ? "orange"
            : item.outcome === "Block"
            ? "blue"
            : item.outcome === "None"
            ? "red"
            : "gray"
        }
      />
    ),
  },
  {
    label: "Tags",
    render: (item) => {
      return <Tag label={item.tags[0]} color={"gray"} />;
    },
  },
  {
    label: "Info",
    render: (item) => (
      <button onClick={item.onClick}>
        <div className="flex p-3 bg-base-900 rounded hover:bg-neutral-500 cursor-pointer">
          <ArrowUpRight size={20} className="text-white" />
        </div>
      </button>
    ),
  },
];

interface PropertiesTechniqueTableProps {
  graphData: GraphFlattenBlock[];
}

const PropertiesTechniqueTable: React.FC<PropertiesTechniqueTableProps> = ({
  graphData,
}) => {
  const onClickPopulatedData = graphData.map((val) => {
    return {
      ...val,
      onClick: () => {
        setInfoModalData(val);
        setIsOpen(true);
      },
    };
  });
  const [infoModalData, setInfoModalData] = useState<GraphFlattenBlock | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const totalPages = Math.ceil(onClickPopulatedData.length / pageSize);
  const paginatedData = onClickPopulatedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table data={paginatedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isOpen && infoModalData && (
        <InfoModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={() => console.log("saved")}
          modalData={infoModalData}
        />
      )}
    </div>
  );
};

export default PropertiesTechniqueTable;
