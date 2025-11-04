"use client";

import { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import AbilityModal from "@/components/AbilityModal/AbilityModal";
import { AttackDataItem, AttackResponse } from "@/api/defend/defend";

interface DefendTableProps {
  data: AttackResponse;
}

export function DefendTable({ data }: DefendTableProps) {
  const [modalData, setModalData] = useState<AttackDataItem | null>(null);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    const timeout = setTimeout(() => setModalData(null), 500); // match animation duration
    return () => clearTimeout(timeout);
  };

  const onOpen = (newData: AttackDataItem) => {
    setModalData(newData);

    const timeout = setTimeout(() => setOpen(true), 100); // match animation duration
    return () => clearTimeout(timeout);
  };

  const columns: TableColumn<AttackDataItem>[] = [
    {
      label: "선택",
      className: "w-[5%] py-2 px-4 text-white text-lg font-bold",
      render: () => <input type="checkbox" />,
    },
    {
      label: "Name",
      render: (item) => (
        <span
          className="underline cursor-pointer hover:text-blue-400 transition-colors text-left link"
          onClick={() => onOpen(item)}
        >
          {item.name}
        </span>
      ),
    },
    {
      label: "Platform",
      render: (item) =>
        item.executors.map((item, index) => <p key={index}>{item.platform}</p>),
    },
    {
      label: "Plug In",
      render: (item) =>
        item.executors.map((item, index) => <p key={index}>{item.name}</p>),
    },
    {
      label: "ATT&CK Tactics",
      render: (item) => item.tactic,
    },
    {
      label: "Technique",
      render: (item) => (item.technique_id === "x" ? "-" : item.technique_id),
    },
    {
      label: "Last Updated",
      render: (item) => (
        <p>{new Date(item.last_modified).toISOString().split("T")[0]}</p>
      ),
    },
  ];

  return (
    <>
      {data.data ? (
        <Table data={data.data} columns={columns} striped />
      ) : (
        <span className="text-center">No Data Available</span>
      )}
      {modalData ? (
        <AbilityModal
          open={open}
          onClose={onClose}
          onSave={() => console.log("Save")}
          modalData={modalData}
        />
      ) : null}
    </>
  );
}
