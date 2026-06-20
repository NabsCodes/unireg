"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState, type ReactNode } from "react";

import { DataTableEmpty } from "@/components/shared/data-table-empty";
import { DataTableFilterTabs } from "@/components/shared/data-table-filter-tabs";
import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildFilteredColumns } from "@/lib/data-table/build-filtered-columns";
import {
  ALL_FILTER_VALUE,
  isActiveFilterValue,
} from "@/lib/data-table/column-filters";
import { createSerialNumberColumn } from "@/lib/data-table/serial-number-column";
import { getTableColumn } from "@/lib/data-table/get-table-column";
import { cn } from "@/lib/utils";
import type { DataTableFilter, DataTableFilterTabs as FilterTabsConfig } from "@/types/data-table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  filters?: readonly DataTableFilter[];
  filterTabs?: FilterTabsConfig;
  emptyTitle?: string;
  emptyDescription?: string;
  initialPageSize?: number;
  showSerialNumber?: boolean;
  hiddenColumnIds?: string[];
  renderMobileCard?: (row: Row<TData>) => ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search records...",
  filters = [],
  filterTabs,
  emptyTitle,
  emptyDescription,
  initialPageSize = 10,
  showSerialNumber = true,
  hiddenColumnIds = [],
  renderMobileCard,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const allTabValue = filterTabs?.allValue ?? ALL_FILTER_VALUE;
  const [activeTab, setActiveTab] = useState(allTabValue);

  const filteredColumns = useMemo(
    () => buildFilteredColumns(columns, filters),
    [columns, filters],
  );

  const tableColumns = useMemo(() => {
    if (!showSerialNumber) return filteredColumns;
    return [createSerialNumberColumn<TData>(), ...filteredColumns];
  }, [filteredColumns, showSerialNumber]);

  // TanStack Table returns unstable function references; React Compiler skips this hook by design.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
      columnVisibility: hiddenColumnIds.reduce<Record<string, boolean>>(
        (visibility, columnId) => {
          visibility[columnId] = false;
          return visibility;
        },
        {},
      ),
    },
  });

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      if (!filterTabs) return;

      const column = getTableColumn(table, filterTabs.columnId);
      column?.setFilterValue(
        value === allTabValue ? undefined : value,
      );
    },
    [allTabValue, filterTabs, table],
  );

  const handleReset = useCallback(() => {
    table.resetColumnFilters();
    setActiveTab(allTabValue);
  }, [allTabValue, table]);

  const hasActiveFilters = useMemo(() => {
    const searchValue = searchKey
      ? getTableColumn(table, searchKey)?.getFilterValue()
      : undefined;

    const hasSearch = isActiveFilterValue(searchValue);
    const hasColumnFilters = columnFilters.some((filter) =>
      isActiveFilterValue(filter.value, allTabValue),
    );
    const hasTabFilter = activeTab !== allTabValue;

    return hasSearch || hasColumnFilters || hasTabFilter;
  }, [activeTab, allTabValue, columnFilters, searchKey, table]);

  const showToolbar = Boolean(searchKey || filters.length > 0);
  const showFilterTabs = Boolean(filterTabs);
  const rows = table.getRowModel().rows;

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border">
      {showFilterTabs && filterTabs ? (
        <div className="border-border border-b px-4 py-3">
          <DataTableFilterTabs
            ariaLabel={filterTabs.ariaLabel}
            onValueChange={handleTabChange}
            options={filterTabs.options}
            value={activeTab}
          />
        </div>
      ) : null}

      {showToolbar ? (
        <DataTableToolbar
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onReset={handleReset}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          table={table}
        />
      ) : null}

      {renderMobileCard ? (
        <div className="divide-border divide-y md:hidden">
          {rows.length ? (
            rows.map((row) => (
              <div className="px-4 py-4" key={row.id}>
                {renderMobileCard(row)}
              </div>
            ))
          ) : (
            <DataTableEmpty
              description={emptyDescription}
              title={emptyTitle}
            />
          )}
        </div>
      ) : null}

      <div className={cn("overflow-x-auto", renderMobileCard && "hidden md:block")}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/40 hover:bg-muted/40"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground h-10 px-4 text-xs font-semibold tracking-wide uppercase"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="p-0">
                  <DataTableEmpty
                    description={emptyDescription}
                    title={emptyTitle}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
