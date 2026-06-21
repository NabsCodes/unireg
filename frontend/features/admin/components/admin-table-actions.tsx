"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

export function createEditActionColumn<T>(
  onEdit: (row: T) => void,
): ColumnDef<T> {
  return {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button onClick={() => onEdit(row.original)} size="sm" variant="ghost">
        Edit
      </Button>
    ),
  };
}
