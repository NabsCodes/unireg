"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { OfferingCard } from "@/features/admin/components/admin-list-cards";
import { useAdminOfferings } from "@/features/admin/api/use-admin-lists";
import {
  offeringStatusFilter,
  semesterFilter,
} from "@/content/table-filters";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { OfferingRow } from "@/types/academic";

const columns: ColumnDef<OfferingRow>[] = [
  {
    id: "course",
    header: "Course",
    accessorFn: (row) => `${row.courseCode} ${row.courseTitle}`,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.courseCode}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.courseTitle}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "session",
    header: "Session",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "lecturer",
    header: "Lecturer",
  },
  {
    id: "enrollment",
    header: "Enrollment",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.registered}/{row.original.capacity}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OfferingRow["status"];
      return (
        <StatusBadge
          label={status === "open" ? "Open" : "Closed"}
          tone={status === "open" ? "active" : "draft"}
        />
      );
    },
  },
];

export function AdminOfferingsView() {
  const { data = [], isLoading, isError, error } = useAdminOfferings();

  return (
    <PortalPage>
      <PageHeader
        title="Course Offerings"
        description="Configure course offerings per session and semester, including capacity and lecturer assignment."
      />
      <QueryState
        error={error}
        errorLabel="Could not load course offerings."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading course offerings..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Course offerings will appear here once they are published for a session."
          emptyTitle="No offerings"
          filters={[semesterFilter, offeringStatusFilter]}
          renderMobileCard={(row) => <OfferingCard offering={row.original} />}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
