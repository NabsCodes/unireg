"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { departmentFilter } from "@/content/data/table-filters";
import { useAdminLecturers } from "@/features/admin/api/use-admin-lists";
import { LecturerFormDialog } from "@/features/admin/components/admin-crud-dialogs";
import { createEditActionColumn } from "@/features/admin/components/admin-table-actions";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { LecturerRow } from "@/types/academic";

const baseColumns: ColumnDef<LecturerRow>[] = [
  {
    accessorKey: "staffNo",
    header: "Staff No.",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("staffNo")}</span>
    ),
  },
  {
    id: "name",
    header: "Name",
    accessorFn: (row) => `${row.title} ${row.name}`,
    cell: ({ row }) => (
      <span>
        {row.original.title} {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
];

export function AdminLecturersView() {
  const { data = [], isLoading, isError, error } = useAdminLecturers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<LecturerRow | null>(null);

  const columns = useMemo(
    () => [
      ...baseColumns,
      createEditActionColumn<LecturerRow>((row) => {
        setEditRow(row);
        setDialogOpen(true);
      }),
    ],
    [],
  );

  return (
    <PortalPage>
      <PageHeader
        actions={
          <Button
            onClick={() => {
              setEditRow(null);
              setDialogOpen(true);
            }}
          >
            <Plus />
            Add lecturer
          </Button>
        }
        description="Manage lecturer profiles, staff numbers, and department assignments."
        title="Lecturers"
      />
      <QueryState
        error={error}
        errorLabel="Could not load lecturer records."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading lecturer records..."
        variant="table"
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Lecturer profiles will appear here once staff records are added."
          emptyTitle="No lecturers"
          filters={[departmentFilter]}
          searchKey="name"
          searchPlaceholder="Search by name or staff number..."
        />
      </QueryState>
      <LecturerFormDialog
        initial={editRow}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </PortalPage>
  );
}
