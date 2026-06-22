"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  pageSizeOptions?: number[];
};

function formatResultCount(count: number): string {
  return count === 1 ? "1 result" : `${count} results`;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 50],
}: DataTablePaginationProps<TData>) {
  const totalRows = table.getFilteredRowModel().rows.length;

  if (totalRows === 0) {
    return null;
  }

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const fitsOnOnePage = totalRows <= pageSize;

  if (fitsOnOnePage) {
    return (
      <div className="border-border border-t px-4 py-3">
        <p className="text-muted-foreground text-sm">
          {formatResultCount(totalRows)}
        </p>
      </div>
    );
  }

  const pageCount = table.getPageCount();
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="border-border flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        Showing{" "}
        <span className="text-foreground font-medium">
          {start}–{end}
        </span>{" "}
        of <span className="text-foreground font-medium">{totalRows}</span>
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-16" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm font-medium whitespace-nowrap">
          Page {pageIndex + 1} of {pageCount}
        </p>

        <div className="flex items-center gap-1">
          <Button
            aria-label="Go to first page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            size="icon-sm"
            variant="outline"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            aria-label="Go to previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon-sm"
            variant="outline"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            aria-label="Go to next page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon-sm"
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            aria-label="Go to last page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(pageCount - 1)}
            size="icon-sm"
            variant="outline"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
