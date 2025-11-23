import { useMemo, useState } from "react";
import { ReportListItem } from "@/types/report";

type UseSearchProps = {
  data: ReportListItem[];
  searchFields: (keyof ReportListItem)[];
};

function useSearch({ data, searchFields }: UseSearchProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const searchLower = search.toLowerCase().trim();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, search, searchFields]);

  return { filteredData, search, setSearch };
}

export default useSearch;
