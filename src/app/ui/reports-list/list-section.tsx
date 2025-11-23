"use client";

import { ReportListItem, SortField, SortOrder } from "@/types/report";
import ReportsTable from "./report-table";
import { ReportsPagination } from "./reports-pagination";
import { useState, useMemo } from "react";

type ReportsListSectionProps = {
  reports: ReportListItem[];
};

function ReportsListSection({ reports }: ReportsListSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const PAGE_SIZE = 10;

  const sortedReports = useMemo(() => {
    const sorted = [...reports].sort((currentReport, nextReport) => {
      const currentValue = currentReport[sortField];
      const nextValue = nextReport[sortField];

      if (currentValue == null) return 1;
      if (nextValue == null) return -1;

      if (sortField === "createdAt") {
        const currentTime = new Date(currentValue).getTime();
        const nextTime = new Date(nextValue).getTime();
        return sortOrder === "asc"
          ? currentTime - nextTime
          : nextTime - currentTime;
      }

      const currentString = String(currentValue).toLowerCase();
      const nextString = String(nextValue).toLowerCase();
      const comparison = currentString.localeCompare(nextString);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [reports, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedReports.length / PAGE_SIZE));

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedReports.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedReports, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
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
