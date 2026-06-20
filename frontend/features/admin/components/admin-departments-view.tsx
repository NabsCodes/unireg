"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { departments } from "@/content/demo-data/admin";
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
  return (
    <PortalPage>
      <PageHeader
        title="Departments"
        description="Create and maintain academic departments used across courses and student records."
      />
      <DataTable
        columns={columns}
        data={departments}
        emptyDescription="Departments will appear here once they are configured."
        emptyTitle="No departments"
        searchKey="name"
        searchPlaceholder="Search departments..."
      />
    </PortalPage>
  );
}
