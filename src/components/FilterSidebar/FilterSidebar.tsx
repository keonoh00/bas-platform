"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface SelectedFilter {
  label: string;
  value: string;
}

interface FilterSideBarProps {
  onChange: (filters: {
    searchQuery: string;
    startDate: string | null;
    endDate: string | null;
    assessment: string;
    selectedFilters: SelectedFilter[];
  }) => void;
}

export default function FilterSidebar({ onChange }: FilterSideBarProps) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [assessment, setAssessment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const updateFilter = (label: string, value: string | null) => {
    setSelectedFilters((prev) => {
      const without = prev.filter((f) => f.label !== label);
      return value ? [...without, { label, value }] : without;
    });
  };

  const handleRemoveFilter = (filterLabel: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.label !== filterLabel));
    if (filterLabel === "Assessment") setAssessment("");
    if (filterLabel === "Start Date") setStartDate(null);
    if (filterLabel === "End Date") setEndDate(null);
    if (filterLabel === "Search") setSearchQuery("");
  };

  useEffect(() => {
    if (startDate && endDate) {
      const formatted = `${startDate.slice(5)} ~ ${endDate.slice(5)}`;
      updateFilter("Last Activity", formatted);
    } else {
      handleRemoveFilter("Last Activity");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    updateFilter("Assessment", assessment);
  }, [assessment]);

  useEffect(() => {
    updateFilter("Search", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    onChange({
      searchQuery,
      startDate,
      endDate,
      assessment,
      selectedFilters,
    });
  }, [searchQuery, startDate, endDate, assessment, selectedFilters, onChange]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col bg-base-900 p-6 text-white rounded-md w-full h-full">
        {selectedFilters.length > 0 && (
          <div className="flex flex-col gap-2 rounded mb-4">
            {selectedFilters.map((filter, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-base-700 p-2 rounded"
              >
                <span className="text-sm text-neutral-300">
                  {filter.label} : {filter.value}
                </span>
                <button onClick={() => handleRemoveFilter(filter.label)}>
                  <X size={14} className="text-neutral-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-4">
          <span className="text-neutral-400">Last Activity</span>
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200 w-full"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="text-neutral-200">~</span>
            <input
              type="date"
              className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200 w-full"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-400">Assessment</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200"
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Carbanak APT">Carbanak APT</option>
            <option value="APT28">APT28</option>
            <option value="Lazarus Group">Lazarus Group</option>
          </select>
        </div>
      </div>
    </div>
  );
}
