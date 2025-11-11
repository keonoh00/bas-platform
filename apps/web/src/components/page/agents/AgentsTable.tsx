import React from "react";
import { AgentsListResponse } from "~/app/agents/page";
import { Table, TableColumn } from "~/components/common/Table/Table";
import { Tag } from "~/components/common/Tag/Tag";

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
    {
      label: "Status",
      render: (item) =>
        item.trusted ? (
          <Tag label="Trusted" color="green" />
        ) : (
          <Tag label="Untrusted" color="red" />
        ),
    },
    {
      label: "Last Seen",
      render: (item) => item.last_seen,
      className: "w-1/4",
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
