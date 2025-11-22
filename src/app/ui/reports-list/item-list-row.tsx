import { ReportListItem } from "@/types/report";
import Link from "next/link";

type ReportsTableRowProps = {
  item: ReportListItem;
};

function ReportsTableRow({ item }: ReportsTableRowProps) {
  return (
    <tr className="cursor-pointer text-base text-gray-700 transition-colors hover:bg-gray-50">
      <td className="px-5 py-3 align-middle">
        <Link href={`/reports/${item.reportId}`} className="block">
          <div className="truncate whitespace-nowrap" title={item.reportTitle}>
            <span className="text-[15px] font-medium text-gray-500">
              {item.reportTitle}
            </span>
          </div>
        </Link>
      </td>

      <td className="px-3 py-3 align-middle">
        <div
          className="truncate whitespace-nowrap text-gray-500"
          title={`${item.owner} / ${item.repositoryName}`}
        >
          {item.owner} / {item.repositoryName}
        </div>
      </td>

      <td className="px-3 py-3 align-middle">
        <div
          className="truncate whitespace-nowrap text-gray-500"
          title={item.branch}
        >
          {item.branch}
        </div>
      </td>

      <td className="px-5 py-3 text-center align-middle">
        <span className="text-sm whitespace-nowrap text-gray-500">
          {item.createdAt}
        </span>
      </td>
    </tr>
  );
}

export default ReportsTableRow;
