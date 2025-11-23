import { ReportListItem, SortField, SortOrder } from "@/types/report";
import ReportsTableRow from "./item-list-row";
import EmptyState from "./empty-state";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

type ReportsTableProps = {
  data: ReportListItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
};

function ReportsTable({
  data,
  sortField,
  sortOrder,
  onSort,
}: ReportsTableProps) {
  const isEmpty = data.length === 0;

  const SortIcon = ({ field }: { field: SortField }) => {
    const isActive = sortField === field;

    if (!isActive) return null;

    return sortOrder === "asc" ? (
      <ChevronUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="divide-y rounded-lg border bg-white">
      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full table-fixed border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-left text-[18px] text-gray-700">
                <th className="w-[35%] px-5 py-3 font-semibold">
                  <button
                    onClick={() => onSort("reportTitle")}
                    className="flex items-center transition-colors hover:text-gray-900"
                  >
                    리포트 제목
                    <SortIcon field="reportTitle" />
                  </button>
                </th>
                <th className="w-[30%] px-3 py-3 font-semibold">
                  <button
                    onClick={() => onSort("repositoryName")}
                    className="flex items-center transition-colors hover:text-gray-900"
                  >
                    저장소
                    <SortIcon field="repositoryName" />
                  </button>
                </th>
                <th className="w-[20%] px-3 py-3 font-semibold">
                  <button
                    onClick={() => onSort("branch")}
                    className="flex items-center transition-colors hover:text-gray-900"
                  >
                    브랜치
                    <SortIcon field="branch" />
                  </button>
                </th>
                <th className="w-[15%] px-5 py-3 font-semibold">
                  <button
                    onClick={() => onSort("createdAt")}
                    className="flex items-center justify-center transition-colors hover:text-gray-900"
                  >
                    생성일
                    <SortIcon field="createdAt" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <ReportsTableRow key={item.reportId} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReportsTable;
