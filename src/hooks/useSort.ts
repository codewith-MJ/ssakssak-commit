import { useMemo, useState } from "react";
import { ReportListItem, SortField, SortOrder } from "@/types/report";
import { SORT_FIELDS, SORT_ORDERS } from "@/constants/report";

type UseSortProps = {
  data: ReportListItem[];
  initialField?: SortField;
  initialOrder?: SortOrder;
};

function useSort({
  data,
  initialField = SORT_FIELDS.CREATED_AT,
  initialOrder = SORT_ORDERS.DESC,
}: UseSortProps) {
  const [sortField, setSortField] = useState<SortField>(initialField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

  const sortedData = useMemo(() => {
    return [...data].sort((currentReport, nextReport) => {
      const currentValue = currentReport[sortField];
      const nextValue = nextReport[sortField];

      if (currentValue == null) return 1;
      if (nextValue == null) return -1;

      if (sortField === SORT_FIELDS.CREATED_AT) {
        const currentTime = new Date(currentValue).getTime();
        const nextTime = new Date(nextValue).getTime();
        return sortOrder === SORT_ORDERS.ASC
          ? currentTime - nextTime
          : nextTime - currentTime;
      }

      const currentString = String(currentValue).toLowerCase();
      const nextString = String(nextValue).toLowerCase();
      const comparison = currentString.localeCompare(nextString);
      return sortOrder === SORT_ORDERS.ASC ? comparison : -comparison;
    });
  }, [data, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC,
      );
    } else {
      setSortField(field);
      setSortOrder(SORT_ORDERS.DESC);
    }
  };

  return { sortedData, sortField, sortOrder, handleSort };
}

export default useSort;
