import { SortField, SortOrder } from "@/types/report";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type ReportsTableHeaderProps = {
  field: SortField;
  currentSortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
  className?: string;
};

function ReportsTableHeader({
  field,
  currentSortField,
  sortOrder,
  onSort,
  children,
  className = "",
}: ReportsTableHeaderProps) {
  const isActive = currentSortField === field;

  return (
    <th className={className}>
      <button
        onClick={() => onSort(field)}
        className="flex items-center transition-colors hover:text-gray-900"
      >
        {children}
        {isActive && (
          <>
            {sortOrder === "asc" ? (
              <ChevronUpIcon className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            )}
          </>
        )}
      </button>
    </th>
  );
}

export default ReportsTableHeader;
