"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { departmentFilter } from "@/content/table-filters";
import { useAdminStudents } from "@/features/admin/api/use-admin-lists";
import { StudentFormDialog } from "@/features/admin/components/admin-crud-dialogs";
import { createEditActionColumn } from "@/features/admin/components/admin-table-actions";
import { PortalPage } from "@/features/portal/components/portal-page";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import type { StudentRow } from "@/types/academic";

const baseColumns: ColumnDef<StudentRow>[] = [
  {
    accessorKey: "matricNo",
    header: "Matric No.",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("matricNo")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as StudentRow["status"];
      return (
        <StatusBadge
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          tone={status === "active" ? "active" : "draft"}
        />
      );
    },
  },
];

export function AdminStudentsView() {
  const { data = [], isLoading, isError, error } = useAdminStudents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<StudentRow | null>(null);

  const columns = useMemo(
    () => [
      ...baseColumns,
      createEditActionColumn<StudentRow>((row) => {
        setEditRow(row);
        setDialogOpen(true);
      }),
    ],
    [],
  );

  const statusTabs = useMemo(
    () => ({
      columnId: "status",
      ariaLabel: "Filter students by status",
      options: [
        { value: ALL_FILTER_VALUE, label: "All", count: data.length },
        {
          value: "active",
          label: "Active",
          count: data.filter((student) => student.status === "active").length,
        },
        {
          value: "graduated",
          label: "Graduated",
          count: data.filter((student) => student.status === "graduated")
            .length,
        },
        {
          value: "suspended",
          label: "Suspended",
          count: data.filter((student) => student.status === "suspended")
            .length,
        },
      ],
    }),
    [data],
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
            Add student
          </Button>
        }
        description="Manage student biodata, matric numbers, department, level, and academic status."
        title="Students"
      />
      <QueryState
        error={error}
        errorLabel="Could not load student records."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading student records..."
        variant="table"
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Student records will appear here once profiles are created."
          emptyTitle="No students"
          filterTabs={statusTabs}
          filters={[departmentFilter]}
          searchKey="name"
          searchPlaceholder="Search by name or matric number..."
        />
      </QueryState>
      <StudentFormDialog
        initial={editRow}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </PortalPage>
  );
}
