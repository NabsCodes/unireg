"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lecturerProfile } from "@/content/demo-data/lecturer";
import { currentAcademicPeriod } from "@/content/portal";
import { useLecturerCourseResults } from "@/features/lecturer/api/use-upload-result";
import { ResultUploadCard } from "@/features/lecturer/components/lecturer-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { ResultUploadRow } from "@/types/academic";

const courseCode = "CSC384";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

const columns: ColumnDef<ResultUploadRow>[] = [
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
      <span className="tabular-nums font-medium">
        {formatScore(row.getValue("totalScore"))}
      </span>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const grade = row.getValue("grade") as string | null;
      return grade ?? "—";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
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
];

export function LecturerResultsView() {
  const { data = [], isLoading, isError, error } = useLecturerCourseResults(
    lecturerProfile.staffNo,
    courseCode,
  );

  return (
    <PortalPage>
      <PageHeader
        title="Result Upload"
        description="Upload CA and exam scores for registered students in assigned offerings."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">CSC384 · Database Systems</CardTitle>
          <p className="text-muted-foreground text-sm">
            {currentAcademicPeriod.label} · Lecturer: {lecturerProfile.name} ·{" "}
            {data.length} registered students
          </p>
        </CardHeader>
        <CardContent>
          <QueryState
            error={error}
            errorLabel="Could not load registered students."
            isError={isError}
            isLoading={isLoading}
            loadingLabel="Loading registered students..."
          >
            <DataTable
              columns={columns}
              data={data}
              emptyDescription="Registered students will appear here once the offering is active."
              emptyTitle="No registered students"
              renderMobileCard={(row) => <ResultUploadCard row={row.original} />}
              searchKey="studentName"
              searchPlaceholder="Search by student name..."
              showSerialNumber={false}
            />
          </QueryState>
        </CardContent>
      </Card>
    </PortalPage>
  );
}
