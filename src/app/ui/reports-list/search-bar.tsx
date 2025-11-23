"use client";

import { SearchIcon, XIcon } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function SearchBar({
  value,
  onChange,
  placeholder = "리포트 제목, 저장소, 브랜치로 검색...",
}: SearchBarProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-10 text-[16px] placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="검색어 지우기"
        >
          <XIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
