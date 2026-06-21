"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { auditActionFilter } from "@/content/table-filters";
import { useAdminAuditLogs } from "@/features/admin/api/use-admin-lists";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { AuditLogRow } from "@/types/academic";

const columns: ColumnDef<AuditLogRow>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <span className="text-muted-foreground whitespace-nowrap text-xs">
        {row.getValue("timestamp")}
      </span>
    ),
  },
  {
    accessorKey: "actor",
    header: "Actor",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("actor")}</span>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "entity",
    header: "Entity",
  },
  {
    accessorKey: "detail",
    header: "Detail",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-md text-sm">
        {row.getValue("detail")}
      </span>
    ),
  },
];

export function AdminAuditLogsView() {
  const { data = [], isLoading, isError, error } = useAdminAuditLogs();

  return (
    <PortalPage>
      <PageHeader
        title="Audit Logs"
        description="Review audit entries for result changes, registration actions, and admin updates."
      />
      <QueryState
        error={error}
        errorLabel="Could not load audit logs."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading audit logs..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Audit entries will appear here as users perform registration and result actions."
          emptyTitle="No audit entries"
          filters={[auditActionFilter]}
          searchKey="actor"
          searchPlaceholder="Search by actor or action..."
        />
      </QueryState>
    </PortalPage>
  );
}
