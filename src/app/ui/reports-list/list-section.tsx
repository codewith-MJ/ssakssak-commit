import { ReportListItem } from "@/types/report";
import { Pagination } from "../common/pagination";
import ReportsTable from "./report-table";

const MOCK_REPORTS: ReportListItem[] = [];

function ReportsListSection() {
  const data = MOCK_REPORTS;
  return (
    <section className="mt-8">
      <ReportsTable data={data} />

      <div className="mt-6 flex justify-center">
        <Pagination />
      </div>
    </section>
  );
}

export default ReportsListSection;
