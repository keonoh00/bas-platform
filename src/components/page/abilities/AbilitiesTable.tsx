import React, { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { Ability } from "@/prisma";
import AbilityModal from "./AbilityModal";

interface AbilityTableProps {
  data: Ability[];
}

export const AbilityTable: React.FC<AbilityTableProps> = ({ data }) => {
  const [modalData, setModalData] = useState<Ability | null>(null);
  const [open, setOpen] = useState(false);

  const columns: TableColumn<Ability>[] = [
    {
      label: "Ability Name",
      render: (item) => (
        <button onClick={() => onOpen(item)}>{item.ability_name}</button>
      ),
    },
    {
      label: "Tactics",
      render: (item) => item.tactic,
    },
    {
      label: "Technique ID",
      render: (item) => item.technique_id,
    },
    {
      label: "Technique Name",
      render: (item) => item.technique_name,
    },
    {
      label: "Type",
      render: (item) => item.type,
    },
  ];

  const onOpen = (item: Ability) => {
    setModalData(item);
    const timeout = setTimeout(() => setOpen(true), 100); // match animation duration
    return () => clearTimeout(timeout);
  };

  const onClose = () => {
    setOpen(false);
    const timeout = setTimeout(() => setModalData(null), 500); // match animation duration
    return () => clearTimeout(timeout);
  };

  return (
    <>
      {data ? (
        <Table data={data} columns={columns} />
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
};
