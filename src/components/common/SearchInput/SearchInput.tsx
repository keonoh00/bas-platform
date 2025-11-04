"use client";

import { Search, X } from "lucide-react";
import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search...",
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    onSearch(value);
  };

  const clearInput = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-2 flex-1 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
      />
      {value && (
        <button onClick={clearInput} aria-label="Clear search">
          <X size={18} className="text-neutral-500" />
        </button>
      )}
      <button onClick={handleSearch} aria-label="Search">
        <Search size={18} className="text-neutral-400" />
      </button>
    </div>
  );
}
