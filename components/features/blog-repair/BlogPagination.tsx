import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getPageUrl } from "@/utils/blogUtils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  baseUrl,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = generatePagination();

  return (
    <div className="mt-12 mb-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious href={getPageUrl(baseUrl, currentPage - 1)} className="hover:bg-gray-100" />
            ) : (
              <PaginationPrevious href="#" className="pointer-events-none opacity-50" aria-disabled="true" />
            )}
          </PaginationItem>

          {pages.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getPageUrl(baseUrl, page as number)}
                  isActive={page === currentPage}
                  className={
                    page === currentPage
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext href={getPageUrl(baseUrl, currentPage + 1)} className="hover:bg-gray-100" />
            ) : (
              <PaginationNext href="#" className="pointer-events-none opacity-50" aria-disabled="true" />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
