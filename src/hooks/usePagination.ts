import { useMemo, useState, useEffect } from "react";

type UsePaginationProps<T> = {
  data: T[];
  pageSize: number;
};

function usePagination<T>({ data, pageSize }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return { paginatedData, currentPage, totalPages, setCurrentPage };
}

export default usePagination;
