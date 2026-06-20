"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { lecturers } from "@/content/demo-data/admin";
import { departmentFilter } from "@/content/table-filters";
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
  return (
    <PortalPage>
      <PageHeader
        title="Lecturers"
        description="Manage lecturer profiles, staff numbers, and department assignments."
      />
      <DataTable
        columns={columns}
        data={lecturers}
        emptyDescription="Lecturer profiles will appear here once staff records are added."
        emptyTitle="No lecturers"
        filters={[departmentFilter]}
        searchKey="name"
        searchPlaceholder="Search by name or staff number..."
      />
    </PortalPage>
  );
}
