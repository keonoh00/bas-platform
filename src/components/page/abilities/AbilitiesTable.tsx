import React, { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { Ability } from "@/prisma";
import AbilityModal from "./AbilityModal";

interface AbilityTableProps {
  data: Ability[];
}

const columns: TableColumn<Ability>[] = [
  {
    label: "Name",
    render: (item) => item.ability_name,
  },
  {
    label: "Platform",
    render: (item) => item.platform,
  },
  {
    label: "ATT&CK Tactics",
    render: (item) => item.tactic,
  },
  {
    label: "Technique",
    render: (item) => item.technique_id,
  },
  {
    label: "Plug In",
    render: (item) => item.command,
  },
  {
    label: "Payload",
    render: (item) => item.payload,
  },
];

export const AbilityTable: React.FC<AbilityTableProps> = ({ data }) => {
  const [modalData, setModalData] = useState<Ability | null>(null);
  const [open, setOpen] = useState(false);

  const onOpen = () => {
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
        <Table data={data} columns={columns} striped />
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
