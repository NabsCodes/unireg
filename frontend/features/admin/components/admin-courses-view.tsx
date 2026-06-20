"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { courses } from "@/content/demo-data/admin";
import { departmentFilter } from "@/content/table-filters";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { CourseRow } from "@/types/academic";

const columns: ColumnDef<CourseRow>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("code")}</span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "creditUnits",
    header: "Credits",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("creditUnits")}</span>
    ),
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
];

export function AdminCoursesView() {
  return (
    <PortalPage>
      <PageHeader
        title="Courses"
        description="Maintain course catalogue entries, credit units, and department ownership."
      />
      <DataTable
        columns={columns}
        data={courses}
        emptyDescription="Course catalogue entries will appear here once they are defined."
        emptyTitle="No courses"
        filters={[departmentFilter]}
        searchKey="code"
        searchPlaceholder="Search by course code or title..."
      />
    </PortalPage>
  );
}
