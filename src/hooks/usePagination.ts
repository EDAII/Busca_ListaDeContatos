import type { Contact } from "@/types/Contact";
import { useState, useMemo } from "react";

export const usePagination = (data: Contact[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const nextPage = () =>
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  const prevPage = () =>
    setCurrentPage((p) => (p > 1 ? p - 1 : p));

  return {
    currentPage,
    totalPages,
    paginatedData,
    setPage: setCurrentPage,
    nextPage,
    prevPage,
  };
};
