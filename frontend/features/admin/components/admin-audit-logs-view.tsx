"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { auditActionFilter } from "@/content/data/table-filters";
import { useAdminAuditLogs } from "@/features/admin/api/use-admin-lists";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { AuditLogRow } from "@/types/academic";

const columns: ColumnDef<AuditLogRow>[] = [
  {
    accessorKey: "timestamp",
    header: "When",
    size: 140,
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs whitespace-nowrap">
        {row.getValue("timestamp")}
      </span>
    ),
  },
  {
    accessorKey: "actor",
    header: "Who",
    size: 180,
    cell: ({ row }) => (
      <span className="font-medium whitespace-nowrap">
        {row.getValue("actor")}
      </span>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 150,
    cell: ({ row }) => {
      const action = row.getValue("action") as string;
      const tone = action === "Result updated" ? "pending" : "completed";
      return <StatusBadge label={action} tone={tone} />;
    },
  },
  {
    accessorKey: "summary",
    header: "What changed",
    cell: ({ row }) => (
      <p className="text-sm leading-relaxed">{row.getValue("summary")}</p>
    ),
  },
  {
    accessorKey: "searchText",
    header: "Search",
    enableHiding: true,
  },
];

export function AdminAuditLogsView() {
  const { data = [], isLoading, isError, error } = useAdminAuditLogs();

  return (
    <PortalPage>
      <PageHeader
        title="Audit Logs"
        description="Readable history of result uploads and registry corrections."
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
          emptyDescription="Audit entries will appear here when lecturers upload scores or registry corrections are applied."
          emptyTitle="No audit entries"
          filters={[auditActionFilter]}
          searchKey="searchText"
          searchPlaceholder="Search by student, course, or actor..."
          hiddenColumnIds={["searchText"]}
          showSerialNumber={false}
        />
      </QueryState>
    </PortalPage>
  );
}
