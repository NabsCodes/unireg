"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { OfferingCard } from "@/features/admin/components/admin-list-cards";
import { useAdminOfferings } from "@/features/admin/api/use-admin-lists";
import { OfferingFormDialog } from "@/features/admin/components/admin-crud-dialogs";
import { createEditActionColumn } from "@/features/admin/components/admin-table-actions";
import {
  offeringStatusFilter,
  semesterFilter,
} from "@/content/table-filters";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { OfferingRow } from "@/types/academic";

function offeringStatusLabel(status: OfferingRow["status"]): string {
  if (status === "open") return "Open";
  if (status === "archived") return "Archived";
  return "Closed";
}

function offeringStatusTone(
  status: OfferingRow["status"],
): "active" | "draft" | "completed" {
  if (status === "open") return "active";
  if (status === "archived") return "completed";
  return "draft";
}

const baseColumns: ColumnDef<OfferingRow>[] = [
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
          label={offeringStatusLabel(status)}
          tone={offeringStatusTone(status)}
        />
      );
    },
  },
];

export function AdminOfferingsView() {
  const { data = [], isLoading, isError, error } = useAdminOfferings();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<OfferingRow | null>(null);

  const columns = useMemo(
    () => [
      ...baseColumns,
      createEditActionColumn<OfferingRow>((row) => {
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
            Add offering
          </Button>
        }
        description="Configure course offerings per session and semester, including capacity and lecturer assignment."
        title="Course Offerings"
      />
      <QueryState
        error={error}
        errorLabel="Could not load course offerings."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading course offerings..."
        variant="table"
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
      <OfferingFormDialog
        initial={editRow}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </PortalPage>
  );
}
