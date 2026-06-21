"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { useAdminDepartments } from "@/features/admin/api/use-admin-lists";
import { DepartmentFormDialog } from "@/features/admin/components/admin-crud-dialogs";
import { createEditActionColumn } from "@/features/admin/components/admin-table-actions";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { DepartmentRow } from "@/types/academic";

const baseColumns: ColumnDef<DepartmentRow>[] = [
  {
    accessorKey: "name",
    header: "Department",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "headOfDepartment",
    header: "Head of Department",
  },
  {
    accessorKey: "studentCount",
    header: "Students",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("studentCount")}</span>
    ),
  },
];

export function AdminDepartmentsView() {
  const { data = [], isLoading, isError, error } = useAdminDepartments();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<DepartmentRow | null>(null);

  const columns = useMemo(
    () => [
      ...baseColumns,
      createEditActionColumn<DepartmentRow>((row) => {
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
            Add department
          </Button>
        }
        description="Create and maintain academic departments used across courses and student records."
        title="Departments"
      />
      <QueryState
        error={error}
        errorLabel="Could not load departments."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading departments..."
        variant="table"
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Departments will appear here once they are configured."
          emptyTitle="No departments"
          searchKey="name"
          searchPlaceholder="Search departments..."
        />
      </QueryState>
      <DepartmentFormDialog
        initial={editRow}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </PortalPage>
  );
}
