"use client";

import { ReportListItem, SortField, SortOrder } from "@/types/report";
import ReportsTable from "./report-table";
import { ReportsPagination } from "./reports-pagination";
import { useState, useMemo } from "react";
import {
  SORT_FIELDS,
  SORT_ORDERS,
  DEFAULT_PAGE_SIZE,
} from "@/constants/report";

type ReportsListSectionProps = {
  reports: ReportListItem[];
};

function ReportsListSection({ reports }: ReportsListSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(SORT_FIELDS.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDERS.DESC);

  const sortedReports = useMemo(() => {
    const sorted = [...reports].sort((currentReport, nextReport) => {
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

    return sorted;
  }, [reports, sortField, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedReports.length / DEFAULT_PAGE_SIZE),
  );

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    return sortedReports.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);
  }, [sortedReports, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC,
      );
    } else {
      setSortField(field);
      setSortOrder(SORT_ORDERS.DESC);
    }
    setCurrentPage(1);
  };

  return (
    <section className="mt-8">
      <ReportsTable
        data={paginatedReports}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <div className="mt-6 flex justify-center">
        <ReportsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default ReportsListSection;
