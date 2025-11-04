"use client";

import { useEffect, useState, useCallback } from "react";
import { SaveIcon, Trash2 } from "lucide-react";
import SearchInput from "@/components/common/SearchInput/SearchInput";
import AssessmentTable, {
  AssessmentRunningState,
} from "@/components/AssessmentTable/AssessmentTable";
import { fetchOperations, OperationResponse } from "@/api/defend/assetssment";
import Loading from "@/components/common/Loading/Loading";

export default function Assessment() {
  const [data, setData] = useState<OperationResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchOperations();
      setData(
        response.map((item) => ({
          ...item,
          state: AssessmentRunningState.Ready,
          start: "",
        }))
      );
    } catch (err) {
      setError((err as Error).message || "Failed to load data.");
      setData([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  const handleSearch = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="justify-between flex w-full items-center">
        <div className="w-120">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="flex-row flex">
          <button className="p-2 bg-primary-300 flex flex-row rounded-sm">
            <SaveIcon color="white" />
            <p className="ml-1">등록</p>
          </button>
          <button className="p-2 bg-danger-500 flex flex-row rounded-sm ml-2">
            <Trash2 color="white" />
            <p className="ml-1">삭제</p>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center text-neutral-400 py-10">
            No assessments found.
          </div>
        ) : (
          <AssessmentTable data={data} />
        )}
      </div>
    </div>
  );
}
