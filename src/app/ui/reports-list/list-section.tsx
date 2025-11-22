import { ReportListItem } from "@/types/report";
import { Pagination } from "../common/pagination";
import ReportsTable from "./report-table";

function ReportsListSection({ reports }: { reports: ReportListItem[] }) {
  return (
    <section className="mt-8">
      <ReportsTable data={reports} />

      <div className="mt-6 flex justify-center">
        <Pagination />
      </div>
    </section>
  );
}

export default ReportsListSection;
