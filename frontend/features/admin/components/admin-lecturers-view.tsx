"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { departmentFilter } from "@/content/table-filters";
import { useAdminLecturers } from "@/features/admin/api/use-admin-lists";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { LecturerRow } from "@/types/academic";

const columns: ColumnDef<LecturerRow>[] = [
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

  return (
    <PortalPage>
      <PageHeader
        title="Lecturers"
        description="Manage lecturer profiles, staff numbers, and department assignments."
      />
      <QueryState
        error={error}
        errorLabel="Could not load lecturer records."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading lecturer records..."
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
    </PortalPage>
  );
}
