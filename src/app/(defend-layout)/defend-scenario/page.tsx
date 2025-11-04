"use client";

import {
  EnrichedAdversary,
  fetchAdversariesWithAbilities,
} from "@/api/defend/scenario";
import Loading from "@/components/common/Loading/Loading";
import { ScenarioTable } from "@/components/ScenarioTable/ScenarioTable";
import { PlusIcon } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function DefendScenario() {
  const [data, setData] = useState<EnrichedAdversary[]>([]);
  const [dropdownOption, setDropdownOption] = useState<string>("");
  const [tableData, setTableData] = useState<EnrichedAdversary[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDropdownSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setDropdownOption(e.currentTarget.value);
  };

  useEffect(() => {
    const filtered = data.filter((val) => val.name === dropdownOption);
    setTableData(filtered);
  }, [data, dropdownOption]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const adverRes = await fetchAdversariesWithAbilities();
      const filtered = adverRes.filter(
        (element) => element.atomic_ordering.length > 0
      );
      setData(filtered);
      if (filtered.length > 0) {
        setDropdownOption(filtered[0].name);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Slight delay for better UX
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl h-full">
      <div className="justify-between flex w-full items-center">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[340px]">
            <select
              defaultValue={dropdownOption}
              className="w-full bg-base-800 border border-base-700 text-neutral-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              onChange={handleDropdownSelection}
            >
              {data.map((opt, index) => (
                <option key={index} value={opt.name}>
                  {opt.name}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Scenario Button */}
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded font-bold">
            신규 시나리오
          </button>
        </div>

        <button className="px-4 py-2 bg-purple-300 hover:bg-purple-400 flex flex-row rounded-4xl items-center">
          <PlusIcon size={20} color="white" />
          <p className="ml-1 font-bold">Defend 추가</p>
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : dropdownOption === "" ? (
          <div className="p-12">
            <p className="text-xl text-center">Please select your scenario</p>
          </div>
        ) : (
          <ScenarioTable data={tableData} />
        )}
      </div>
    </div>
  );
}
