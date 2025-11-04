"use client";

import EvaluationuationAssessmentTable from "@/components/EvaluationAssessmentTable/EvaluationAssessmentTable";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import SearchInput from "@/components/common/SearchInput/SearchInput";
import { PlusIcon } from "lucide-react";

export default function EvaluationAssessment() {
  const onSearchClick = () => {
    console.log("Search clicked");
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-xl">감내 수준 평가 시스템</h1>
        <span className="text-gray-400 text-sm">Assessment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_minmax(600px,_3fr)] gap-4 mt-4">
        <div className="flex">
          <SearchInput onSearch={(q) => console.log(q)} />
        </div>
        <div className="flex flex-row items-center justify-end">
          <button className="px-4 py-2 bg-purple-300 hover:bg-purple-400 flex flex-row rounded-4xl items-center">
            <PlusIcon size={20} color="white" />
            <p className="ml-1 font-bold">Create Scenario</p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_minmax(400px,_3fr)] gap-4 mt-4">
        <div className="space-y-5 w-full">
          <FilterSidebar onChange={onSearchClick} />
        </div>

        <div className="space-y-5 w-full">
          <EvaluationuationAssessmentTable />
        </div>
      </div>
    </div>
  );
}
