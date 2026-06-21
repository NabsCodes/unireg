"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminOfferings } from "@/features/admin/api/use-admin-lists";
import { useAdminOfferingResults } from "@/features/admin/api/use-admin-results";
import { AdminResultEditAction } from "@/features/admin/components/admin-result-edit-dialog";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { ResultUploadRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

export function AdminResultsView() {
  const { data: offerings = [], isLoading: offeringsLoading } =
    useAdminOfferings();

  const [selectedOfferingId, setSelectedOfferingId] = useState<number | null>(
    null,
  );

  const activeOfferingId =
    selectedOfferingId ?? (offerings[0] ? Number(offerings[0].id) : null);

  const selectedOffering =
    offerings.find((offering) => Number(offering.id) === activeOfferingId) ??
    offerings[0] ??
    null;

  const {
    data = [],
    isLoading: resultsLoading,
    isError,
    error,
  } = useAdminOfferingResults(activeOfferingId);

  const columns = useMemo<ColumnDef<ResultUploadRow>[]>(
    () => [
      {
        accessorKey: "matricNo",
        header: "Matric No.",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("matricNo")}</span>
        ),
      },
      {
        accessorKey: "studentName",
        header: "Student",
      },
      {
        accessorKey: "caScore",
        header: "CA",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatScore(row.getValue("caScore"))}
          </span>
        ),
      },
      {
        accessorKey: "examScore",
        header: "Exam",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatScore(row.getValue("examScore"))}
          </span>
        ),
      },
      {
        accessorKey: "totalScore",
        header: "Total",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">
            {formatScore(row.getValue("totalScore"))}
          </span>
        ),
      },
      {
        accessorKey: "grade",
        header: "Grade",
        cell: ({ row }) => {
          const grade = row.getValue("grade") as string | null;
          return grade ? <StatusBadge label={grade} tone="completed" /> : "—";
        },
      },
      {
        accessorKey: "status",
        header: "Result status",
        cell: ({ row }) => {
          const status = row.getValue("status") as ResultUploadRow["status"];
          return (
            <StatusBadge
              label={status}
              tone={status === "Uploaded" ? "completed" : "pending"}
            />
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) =>
          activeOfferingId ? (
            <AdminResultEditAction
              offeringId={activeOfferingId}
              row={row.original}
            />
          ) : null,
      },
    ],
    [activeOfferingId],
  );

  return (
    <PortalPage>
      <PageHeader
        description="Review and correct student scores for any offering. Grade and GPA recompute through PostgreSQL."
        title="Result Oversight"
      />

      <Card>
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">
              {selectedOffering
                ? `${selectedOffering.courseCode} · ${selectedOffering.courseTitle}`
                : "Select a course offering"}
            </CardTitle>
            {selectedOffering ? (
              <p className="text-muted-foreground text-sm">
                {selectedOffering.session} · {selectedOffering.semester}
              </p>
            ) : null}
          </div>
          {offerings.length > 0 ? (
            <Select
              onValueChange={(value) => setSelectedOfferingId(Number(value))}
              value={activeOfferingId ? String(activeOfferingId) : undefined}
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Select offering" />
              </SelectTrigger>
              <SelectContent>
                {offerings.map((offering) => (
                  <SelectItem key={offering.id} value={offering.id}>
                    {offering.courseCode} · {offering.semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </CardHeader>
        <CardContent>
          <QueryState
            error={error}
            errorLabel="Could not load registered students."
            isError={isError}
            isLoading={offeringsLoading || resultsLoading}
            loadingLabel="Loading result roster..."
            variant="panel"
            rows={5}
          >
            {offerings.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Create course offerings first, then registered students will
                appear here for score entry or correction.
              </p>
            ) : (
              <DataTable
                columns={columns}
                data={data}
                emptyDescription="Students appear here once they register for this offering."
                emptyTitle="No registered students"
                searchKey="studentName"
                searchPlaceholder="Search by student name or matric..."
                showSerialNumber={false}
              />
            )}
          </QueryState>
        </CardContent>
      </Card>
    </PortalPage>
  );
}
