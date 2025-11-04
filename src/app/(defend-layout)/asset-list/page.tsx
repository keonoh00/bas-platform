"use client";

import { useEffect, useState } from "react";
import { Agent, fetchAgents } from "@/api/defend/assets";
import AssetListTable from "@/components/AssetListTable/AssetListTable";
import Loading from "@/components/common/Loading/Loading";

export default function AssetsList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await fetchAgents(true); // pass `true` if you want logging
        setAgents(data);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    dataFetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl items-center justify-center min-h-[200px]">
        <p className="text-neutral-400 text-lg">Failed to load assets.</p>
      </div>
    );
  }

  if (!agents.length) {
    return (
      <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl items-center justify-center min-h-[200px]">
        <p className="text-neutral-400 text-lg">No agents found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <AssetListTable data={agents} />
    </div>
  );
}
