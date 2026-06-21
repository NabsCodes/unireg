"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { departmentFilter } from "@/content/table-filters";
import { useAdminCourses } from "@/features/admin/api/use-admin-lists";
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
  const { data = [], isLoading, isError, error } = useAdminCourses();

  return (
    <PortalPage>
      <PageHeader
        title="Courses"
        description="Maintain course catalogue entries, credit units, and department ownership."
      />
      <QueryState
        error={error}
        errorLabel="Could not load courses."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading courses..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Course catalogue entries will appear here once they are defined."
          emptyTitle="No courses"
          filters={[departmentFilter]}
          searchKey="code"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
