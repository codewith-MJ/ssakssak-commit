"use client";

import { useMemo, useState } from "react";
import { ReportListItem } from "@/types/report";
import ReportsTable from "./report-table";
import { ReportsPagination } from "./reports-pagination";

function ReportsListSection({ reports }: { reports: ReportListItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return reports.slice(startIndex, startIndex + PAGE_SIZE);
  }, [reports, currentPage]);

  return (
    <section className="mt-8">
      <ReportsTable data={paginatedReports} />

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
