"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { useAdminGradeScale } from "@/features/admin/api/use-admin-results";
import { PortalPage } from "@/features/portal/components/portal-page";
import { formatGradePoint } from "@/lib/format/academic";
import type { GradeScaleRow } from "@/types/academic";

const columns: ColumnDef<GradeScaleRow>[] = [
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("grade")}</span>
    ),
  },
  {
    id: "range",
    header: "Score range",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.minScore} – {row.original.maxScore}
      </span>
    ),
  },
  {
    accessorKey: "gradePoint",
    header: "Grade point",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatGradePoint(row.getValue("gradePoint") as number)}
      </span>
    ),
  },
  {
    accessorKey: "remark",
    header: "Remark",
  },
];

export function AdminGradeScaleView() {
  const { data = [], isLoading, isError, error } = useAdminGradeScale();
  const sorted = useMemo(
    () => [...data].sort((a, b) => b.minScore - a.minScore),
    [data],
  );

  return (
    <PortalPage>
      <PageHeader
        description="Read-only 4.0 grading table used by triggers when CA and exam scores are saved."
        title="Grade Scale"
      />

      <QueryState
        error={error}
        errorLabel="Could not load grade scale."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading grade scale..."
        variant="table"
        rows={10}
      >
        <DataTable
          columns={columns}
          data={sorted}
          emptyDescription="Grade scale rows should be seeded in PostgreSQL."
          emptyTitle="No grade scale configured"
          showSerialNumber={false}
        />
      </QueryState>
    </PortalPage>
  );
}
