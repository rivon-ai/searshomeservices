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

export default function BlogPagination() {
  return (
    <div className="mt-12 mb-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="hover:bg-gray-100" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-blue-600"
            >
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" className="hover:bg-gray-100">
              2
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" className="hover:bg-gray-100">
              3
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" className="hover:bg-gray-100" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
