import { ReportListItem } from "@/types/report";
import ReportsTableRow from "./item-list-row";
import EmptyState from "./empty-state";

type ReportsTableProps = {
  data: ReportListItem[];
};

function ReportsTable({ data }: ReportsTableProps) {
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
                <th className="w-[40%] px-5 py-3 font-semibold">리포트 제목</th>
                <th className="w-[30%] px-3 py-3 font-semibold">저장소</th>
                <th className="w-[15%] px-3 py-3 font-semibold">브랜치</th>
                <th className="w-[15%] px-5 py-3 text-center font-semibold">
                  생성일
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
