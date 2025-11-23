"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/app/ui/common/pagination";

type ReportsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ReportsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReportsPaginationProps) {
  if (totalPages < 1) return null;

  const MAX_VISIBLE = 5;

  const blockIndex = Math.floor((currentPage - 1) / MAX_VISIBLE);
  const startPage = blockIndex * MAX_VISIBLE + 1;
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1);

  const pages: number[] = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }

  const prevPage = startPage > 1 ? startPage - MAX_VISIBLE : null;
  const nextPage = endPage < totalPages ? endPage + 1 : null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevPage ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (prevPage) onPageChange(prevPage);
            }}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={page === currentPage ? undefined : "#"}
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={nextPage ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (nextPage) onPageChange(nextPage);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ReportsPagination;
