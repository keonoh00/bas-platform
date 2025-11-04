import React from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { Agent } from "@/api/defend/assets";
import { Tag } from "../common/Tag/Tag";

const assetColumns: TableColumn<Agent>[] = [
  {
    label: "Group",
    render: (item) => item.group,
  },
  {
    label: "Hostname",
    render: (item) => (
      <a href="#" className="text-blue-400 underline">
        {item.host}
      </a>
    ),
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
    label: "IP Address",
    render: (item) =>
      item.host_ip_addrs.map((ip, index) => <p key={index}>{ip}</p>),
  },
  {
    label: "Privileges",
    render: (item) => item.privilege,
  },
  {
    label: "Last Seen",
    render: (item) => (
      <>{new Date(item.last_seen).toISOString().replace("T", " ")}</>
    ),
  },
  {
    label: "Status",
    render: (item) => (
      <Tag
        label={item.deadman_enabled ? "Alive" : "Disconnected"}
        color={item.deadman_enabled ? "green" : "red"}
      />
    ),
  },
];

interface AssetListTableProps {
  data: Agent[];
}

const AssetListTable: React.FC<AssetListTableProps> = ({ data }) => {
  return (
    <div className="p-6">
      <Table data={data} columns={assetColumns} />
    </div>
  );
};

export default AssetListTable;
