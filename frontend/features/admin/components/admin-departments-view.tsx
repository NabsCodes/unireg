"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { useAdminDepartments } from "@/features/admin/api/use-admin-lists";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { DepartmentRow } from "@/types/academic";

const columns: ColumnDef<DepartmentRow>[] = [
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

  return (
    <PortalPage>
      <PageHeader
        title="Departments"
        description="Create and maintain academic departments used across courses and student records."
      />
      <QueryState
        error={error}
        errorLabel="Could not load departments."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading departments..."
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
    </PortalPage>
  );
}
