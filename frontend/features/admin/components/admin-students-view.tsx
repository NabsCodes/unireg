"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { students } from "@/content/demo-data/admin";
import {
  departmentFilter,
} from "@/content/table-filters";
import { PortalPage } from "@/features/portal/components/portal-page";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import type { StudentRow } from "@/types/academic";

const columns: ColumnDef<StudentRow>[] = [
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
  const statusTabs = useMemo(
    () => ({
      columnId: "status",
      ariaLabel: "Filter students by status",
      options: [
        { value: ALL_FILTER_VALUE, label: "All", count: students.length },
        {
          value: "active",
          label: "Active",
          count: students.filter((student) => student.status === "active")
            .length,
        },
        {
          value: "graduated",
          label: "Graduated",
          count: students.filter((student) => student.status === "graduated")
            .length,
        },
        {
          value: "suspended",
          label: "Suspended",
          count: students.filter((student) => student.status === "suspended")
            .length,
        },
      ],
    }),
    [],
  );

  return (
    <PortalPage>
      <PageHeader
        title="Students"
        description="Manage student biodata, matric numbers, department, level, and academic status."
      />
      <DataTable
        columns={columns}
        data={students}
        emptyDescription="Student records will appear here once profiles are created."
        emptyTitle="No students"
        filterTabs={statusTabs}
        filters={[departmentFilter]}
        searchKey="name"
        searchPlaceholder="Search by name or matric number..."
      />
    </PortalPage>
  );
}
