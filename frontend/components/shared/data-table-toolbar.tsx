"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import { getTableColumn } from "@/lib/data-table/get-table-column";
import { cn } from "@/lib/utils";
import type { DataTableFilter } from "@/types/data-table";
import type { Table } from "@tanstack/react-table";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  filters?: readonly DataTableFilter[];
  hasActiveFilters: boolean;
  onReset: () => void;
};

function FilterSelects<TData>({
  filters,
  table,
  layout,
}: {
  filters: readonly DataTableFilter[];
  table: Table<TData>;
  layout: "inline" | "sheet";
}) {
  return (
    <>
      {filters.map((filter) => {
        const column = getTableColumn(table, filter.columnId);
        if (!column) return null;

        const allValue = filter.allValue ?? ALL_FILTER_VALUE;
        const currentValue =
          (column.getFilterValue() as string | undefined) ?? allValue;

        return (
          <div
            className={cn(layout === "sheet" && "space-y-2")}
            key={filter.columnId}
          >
            {layout === "sheet" ? (
              <Label className="text-muted-foreground text-xs font-medium">
                {filter.label}
              </Label>
            ) : null}
            <Select
              value={currentValue}
              onValueChange={(value) =>
                column.setFilterValue(value === allValue ? undefined : value)
              }
            >
              <SelectTrigger
                aria-label={filter.label}
                className={cn(
                  "h-9 w-full shadow-none",
                  layout === "inline" && "md:w-[180px]",
                )}
              >
                <SelectValue placeholder={filter.placeholder ?? filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={allValue}>
                  {filter.placeholder ?? `All ${filter.label.toLowerCase()}`}
                </SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </>
  );
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search records...",
  filters = [],
  hasActiveFilters,
  onReset,
}: DataTableToolbarProps<TData>) {
  const searchColumn = searchKey ? getTableColumn(table, searchKey) : null;
  const refineCount = filters.reduce((count, filter) => {
    const column = getTableColumn(table, filter.columnId);
    const allValue = filter.allValue ?? ALL_FILTER_VALUE;
    const value = column?.getFilterValue();
    return count + (value && value !== allValue ? 1 : 0);
  }, 0);

  const showToolbar = Boolean(searchColumn || filters.length > 0);

  if (!showToolbar) return null;

  return (
    <div className="border-border space-y-3 border-b px-4 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {searchColumn ? (
          <Input
            aria-label={searchPlaceholder}
            className="max-w-md"
            onChange={(event) =>
              searchColumn.setFilterValue(event.target.value)
            }
            placeholder={searchPlaceholder}
            value={(searchColumn.getFilterValue() as string) ?? ""}
          />
        ) : (
          <div />
        )}

        <div className="flex flex-wrap items-center gap-2">
          {filters.length > 0 ? (
            <>
              <div className="hidden flex-wrap items-center gap-2 md:flex">
                <FilterSelects
                  filters={filters}
                  layout="inline"
                  table={table}
                />
              </div>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      className="w-full gap-2"
                      type="button"
                      variant="outline"
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                      {refineCount > 0 ? (
                        <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                          {refineCount}
                        </span>
                      ) : null}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    className="flex flex-col gap-0 p-0"
                    side="bottom"
                  >
                    <SheetHeader className="border-border border-b p-4 text-left">
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow the list by department, status, or semester.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 overflow-y-auto p-4">
                      <FilterSelects
                        filters={filters}
                        layout="sheet"
                        table={table}
                      />
                    </div>
                    {hasActiveFilters ? (
                      <SheetFooter className="border-border border-t p-4">
                        <Button
                          className="w-full gap-2"
                          onClick={onReset}
                          type="button"
                          variant="outline"
                        >
                          <X className="size-4" />
                          Reset search and filters
                        </Button>
                      </SheetFooter>
                    ) : null}
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : null}

          {hasActiveFilters ? (
            <Button
              className="hidden gap-2 md:inline-flex"
              onClick={onReset}
              type="button"
              variant="ghost"
            >
              <X className="size-4" />
              Reset
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
