import ListHeader from "@/app/ui/reports-list/list-header";
import ReportsListSection from "@/app/ui/reports-list/list-section";
import { cookies } from "next/headers";

async function ReportsListPage() {
  const baseUrl = process.env.NEXTAUTH_URL;
  const cookieStore = await cookies();
  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not defined");
  }

  const response = await fetch(new URL("/api/reports", baseUrl), {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { items } = await response.json();

  return (
    <div className="mx-auto max-w-[1100px] py-1">
      <ListHeader />
      <ReportsListSection reports={items} />
    </div>
  );
}

export default ReportsListPage;
