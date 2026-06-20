import type { ColumnDef, FilterFn } from "@tanstack/react-table";

import type { DataTableFilter } from "@/types/data-table";

export const equalsFilter: FilterFn<unknown> = (row, columnId, filterValue) => {
  if (
    filterValue === undefined ||
    filterValue === null ||
    filterValue === "" ||
    filterValue === "all"
  ) {
    return true;
  }

  return String(row.getValue(columnId)) === String(filterValue);
};

function getColumnId<TData, TValue>(column: ColumnDef<TData, TValue>) {
  if (column.id) return column.id;
  if ("accessorKey" in column && typeof column.accessorKey === "string") {
    return column.accessorKey;
  }
  return undefined;
}

export function buildFilteredColumns<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  filters: readonly DataTableFilter[] = [],
): ColumnDef<TData, TValue>[] {
  if (!filters.length) return columns;

  const filterColumnIds = new Set(filters.map((filter) => filter.columnId));

  return columns.map((column) => {
    const columnId = getColumnId(column);
    if (!columnId || !filterColumnIds.has(columnId)) return column;

    return {
      ...column,
      filterFn: column.filterFn ?? (equalsFilter as FilterFn<TData>),
    };
  });
}
