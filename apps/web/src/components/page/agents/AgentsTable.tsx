import React from "react";
import { AgentsListResponse } from "~/app/agents/page";
import { Table, TableColumn } from "~/components/common/Table/Table";

interface AgentsTableProps {
  data: AgentsListResponse;
}

export const AgentsTable: React.FC<AgentsTableProps> = ({ data }) => {
  const columns: TableColumn<AgentsListResponse[number]>[] = [
    {
      label: "ID (Paw)",
      render: (item) => item.paw,
    },
    {
      label: "Host",
      render: (item) => item.host,
    },
    {
      label: "Group",
      render: (item) => item.group,
    },
    {
      label: "Platform",
      render: (item) => item.platform,
    },
    {
      label: "Contact",
      render: (item) => item.contact,
    },
    {
      label: "PID",
      render: (item) => item.pid,
    },
    {
      label: "Privilege",
      render: (item) => item.privilege,
    },
    // {
    //   label: "Status",
    //   render: (item) => item.,
    // },
    {
      label: "Last Seen",
      render: (item) => item.last_seen,
    },
  ];

  return (
    <>
      {data ? (
        <Table data={data} columns={columns} />
      ) : (
        <span className="text-center">No Data Available</span>
      )}
    </>
  );
};
