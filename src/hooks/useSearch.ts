import { useMemo, useState } from "react";
import { ReportListItem } from "@/types/report";

type UseSearchProps = {
  data: ReportListItem[];
  searchFields: readonly (keyof ReportListItem)[];
};

function useSearch({ data, searchFields }: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const searchLower = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchQuery, searchFields]);

  return { filteredData, searchQuery, setSearchQuery };
}

export default useSearch;
