import ListHeader from "@/app/ui/reports-list/list-header";
import ReportsListSection from "@/app/ui/reports-list/list-section";

function ReportsListPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12">
      <ListHeader />
      <ReportsListSection />
    </div>
  );
}

export default ReportsListPage;
