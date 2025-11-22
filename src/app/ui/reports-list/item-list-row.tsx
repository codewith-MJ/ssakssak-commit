"use client";

import formatDate from "@/lib/util/date-formatter";
import { ReportListItem } from "@/types/report";
import { useRouter } from "next/navigation";

type ReportsTableRowProps = {
  item: ReportListItem;
};

function ReportsTableRow({ item }: ReportsTableRowProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/report-view/${item.reportId}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="cursor-pointer text-base text-gray-700 transition-colors hover:bg-gray-50"
    >
      <td className="truncate px-5 py-3 align-middle whitespace-nowrap">
        <span className="text-[15px] font-medium text-gray-500">
          {item.reportTitle}
        </span>
      </td>

      <td className="truncate px-3 py-3 align-middle whitespace-nowrap text-gray-500">
        {item.owner} / {item.repositoryName}
      </td>

      <td className="truncate px-3 py-3 align-middle whitespace-nowrap text-gray-500">
        {item.branch}
      </td>

      <td className="px-5 py-3 text-center align-middle text-sm whitespace-nowrap text-gray-500">
        {formatDate(item.createdAt)}
      </td>
    </tr>
  );
}

export default ReportsTableRow;
