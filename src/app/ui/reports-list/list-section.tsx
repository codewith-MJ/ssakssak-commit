import { ReportListItem } from "@/types/report";
import ReportsTable from "./report-table";
import { ReportsPagination } from "./reports-pagination";

type ReportsListSectionProps = {
  reports: ReportListItem[];
  pagination: {
    page: number;
    totalPages: number;
  };
};

function ReportsListSection({ reports, pagination }: ReportsListSectionProps) {
  return (
    <section className="mt-8">
      <ReportsTable data={reports} />

      <div className="mt-6 flex justify-center">
        <ReportsPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
      </div>
    </section>
  );
}

export default ReportsListSection;
