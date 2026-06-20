import type { ColumnDef } from "@tanstack/react-table";

export function createSerialNumberColumn<TData>(): ColumnDef<TData> {
  return {
    id: "sn",
    header: "S/N",
    enableSorting: false,
    enableHiding: false,
    size: 56,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const index = pageIndex * pageSize + row.index + 1;
      return (
        <span className="text-muted-foreground tabular-nums">{index}</span>
      );
    },
  };
}
