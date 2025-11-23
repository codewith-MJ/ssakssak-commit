"use client";

import { ReportListItem } from "@/types/report";
import ReportsTable from "./report-table";
import { ReportsPagination } from "./reports-pagination";
import usePagination from "@/hooks/usePagination";
import { DEFAULT_PAGE_SIZE } from "@/constants/report";
import useSort from "@/hooks/useSort";

type ReportsListSectionProps = {
  reports: ReportListItem[];
};

function ReportsListSection({ reports }: ReportsListSectionProps) {
  const { sortedData, sortField, sortOrder, handleSort } = useSort({
    data: reports,
  });

  const { paginatedData, currentPage, totalPages, setCurrentPage } =
    usePagination({
      data: sortedData,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  return (
    <section className="mt-8">
      <ReportsTable
        data={paginatedData}
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
