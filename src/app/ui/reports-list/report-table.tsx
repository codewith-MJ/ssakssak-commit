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
        data.map((item) => <ReportsTableRow key={item.reportId} item={item} />)
      )}
    </div>
  );
}

export default ReportsTable;
