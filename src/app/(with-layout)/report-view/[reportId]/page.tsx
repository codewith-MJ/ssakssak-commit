import { ReportData } from "@/types/report";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import Header from "@/app/ui/report-view/header/header";
import MainSection from "@/app/ui/report-view/main-area/main-section";
import AsideSection from "@/app/ui/report-view/aside-area/aside-section";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

async function ReportViewPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;

  let response: Response;
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const cookieStore = await cookies();

    response = await fetch(`${baseUrl}/api/reports/${reportId}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  } catch {
    throw new Error(SYSTEM_ERROR_MESSAGES.SERVER);
  }

  // notFound() and redirect() throw; keep them outside try so Next.js can handle them.
  if (response.status === 404) {
    notFound();
  }

  if (response.status === 401) {
    redirect(
      `/access-denied?callbackUrl=${encodeURIComponent(`/report-view/${reportId}`)}`,
    );
  }

  if (!response.ok) {
    throw new Error(SYSTEM_ERROR_MESSAGES.SERVER);
  }

  let reportData: ReportData;
  try {
    const body = await response.json();
    reportData = body.report;
  } catch {
    throw new Error(SYSTEM_ERROR_MESSAGES.SERVER);
  }

  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth px-[10%] font-sans break-words break-keep whitespace-normal print:px-4">
      <div className="mt-8 mb-8 flex w-full flex-col">
        <Header report={reportData} />
        <div className="flex flex-grow flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
          <MainSection
            reportSummary={reportData.reportSummary}
            commits={reportData.commits}
          />
          <AsideSection commits={reportData.commits} />
        </div>
      </div>
    </div>
  );
}

export default ReportViewPage;
