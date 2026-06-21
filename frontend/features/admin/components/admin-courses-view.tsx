"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { departmentFilter } from "@/content/data/table-filters";
import { useAdminCourses } from "@/features/admin/api/use-admin-lists";
import { CourseFormDialog } from "@/features/admin/components/admin-crud-dialogs";
import { createEditActionColumn } from "@/features/admin/components/admin-table-actions";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { CourseRow } from "@/types/academic";

const baseColumns: ColumnDef<CourseRow>[] = [
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<CourseRow | null>(null);

  const columns = useMemo(
    () => [
      ...baseColumns,
      createEditActionColumn<CourseRow>((row) => {
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
            Add course
          </Button>
        }
        description="Maintain course catalogue entries, credit units, and department ownership."
        title="Courses"
      />
      <QueryState
        error={error}
        errorLabel="Could not load courses."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading courses..."
        variant="table"
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
      <CourseFormDialog
        initial={editRow}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </PortalPage>
  );
}
