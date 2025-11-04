"use client";

import { useEffect, useState, useCallback } from "react";
import { SaveIcon, Trash2 } from "lucide-react";
import { DefendTable } from "@/components/DefendTable/DefendTable";
import { AttackResponse, fetchAttacks } from "@/api/defend/defend";
import SearchInput from "@/components/common/SearchInput/SearchInput";
import { Pagination } from "../common/Pagination/Pagination";
import Loading from "../common/Loading/Loading";

interface DefendClientComponentProps {
  initialData?: AttackResponse;
}

export function DefendClientComponent({
  initialData,
}: DefendClientComponentProps) {
  const [data, setData] = useState<AttackResponse | undefined>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  const totalPages = data
    ? Math.ceil(
        Number(data.pagenation?.total_items) /
          Number(data.pagenation?.items_per_page)
      )
    : 1;

  const fetchData = useCallback(async (page = 1, search = "") => {
    setIsLoading(true);
    try {
      const response = await fetchAttacks({ page, query: search });
      setData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Slight delay for better UX
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1); // Reset to page 1 when searching
    await fetchData(1, searchQuery);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData(currentPage, query);
  }, [currentPage, query, fetchData]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      {/* Top Controls */}
      <div className="flex justify-between w-full items-center">
        <SearchInput onSearch={handleSearch} />

        <div className="flex space-x-2">
          <button className="p-2 bg-primary-300 flex items-center rounded-sm hover:bg-primary-400 transition">
            <SaveIcon color="white" className="w-4 h-4" />
            <span className="ml-1 text-sm text-white">등록</span>
          </button>
          <button className="p-2 bg-danger-500 flex items-center rounded-sm hover:bg-danger-600 transition">
            <Trash2 color="white" className="w-4 h-4" />
            <span className="ml-1 text-sm text-white">삭제</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-4 flex flex-col space-y-6">
        {isLoading ? (
          <Loading />
        ) : data ? (
          <>
            <DefendTable data={data} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No Data Available
          </div>
        )}
      </div>
    </div>
  );
}
