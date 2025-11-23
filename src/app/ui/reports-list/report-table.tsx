import { ReportListItem, SortField, SortOrder } from "@/types/report";
import ReportsTableRow from "./item-list-row";
import EmptyState from "./empty-state";
import ReportsTableHeader from "./item-list-header";
import { SORT_FIELDS } from "@/constants/report";

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

  return (
    <div className="divide-y rounded-lg border bg-white">
      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full table-fixed border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr className="text-left text-[18px] text-gray-700">
                <ReportsTableHeader
                  field={SORT_FIELDS.TITLE}
                  currentSortField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="w-[35%] px-5 py-3 font-semibold"
                >
                  리포트 제목
                </ReportsTableHeader>

                <ReportsTableHeader
                  field={SORT_FIELDS.REPOSITORY}
                  currentSortField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="w-[30%] px-3 py-3 font-semibold"
                >
                  저장소
                </ReportsTableHeader>

                <ReportsTableHeader
                  field={SORT_FIELDS.BRANCH}
                  currentSortField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="w-[20%] px-3 py-3 font-semibold"
                >
                  브랜치
                </ReportsTableHeader>

                <ReportsTableHeader
                  field={SORT_FIELDS.CREATED_AT}
                  currentSortField={sortField}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="w-[15%] px-5 py-3 font-semibold"
                >
                  생성일
                </ReportsTableHeader>
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
