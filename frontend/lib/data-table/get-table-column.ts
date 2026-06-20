import type { Column, Table } from "@tanstack/react-table";

export function getTableColumn<TData>(
  table: Table<TData>,
  columnId: string,
): Column<TData, unknown> | undefined {
  return table.getAllLeafColumns().find((column) => column.id === columnId);
}
