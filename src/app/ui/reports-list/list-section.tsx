"use client";

import { ReportListItem } from "@/types/report";
import ReportsTable from "./report-table";
import ReportsPagination from "./reports-pagination";
import { DEFAULT_PAGE_SIZE, SEARCH_FIELDS } from "@/constants/report";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import useSearch from "@/hooks/useSearch";
import SearchBar from "./search-bar";
import SearchEmptyState from "./search-empty-state";

type ReportsListSectionProps = {
  reports: ReportListItem[];
};

function ReportsListSection({ reports }: ReportsListSectionProps) {
  const { filteredData, searchQuery, setSearchQuery } = useSearch({
    data: reports,
    searchFields: SEARCH_FIELDS,
  });

  const { sortedData, sortField, sortOrder, handleSort } = useSort({
    data: filteredData,
  });

  const { paginatedData, currentPage, totalPages, setCurrentPage } =
    usePagination({
      data: sortedData,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  const hasNoSearchResults = reports.length > 0 && filteredData.length === 0;

  return (
    <section className="mt-6">
      <div className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      {hasNoSearchResults ? (
        <SearchEmptyState
          searchTerm={searchQuery}
          onClear={() => setSearchQuery("")}
        />
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}

export default ReportsListSection;
