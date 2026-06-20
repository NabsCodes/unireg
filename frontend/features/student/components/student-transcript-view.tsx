"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentProfile, transcriptSummary } from "@/content/demo-data/student";
import { currentAcademicPeriod } from "@/content/portal";
import { useStudentTranscript } from "@/features/student/api/use-student-transcript";
import { TranscriptRecordCard } from "@/features/student/components/student-list-cards";
import { TranscriptExportMenu } from "@/features/student/components/transcript-export-menu";
import { TranscriptPreviewSheet } from "@/features/student/components/transcript-preview-sheet";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { TranscriptExportMeta } from "@/lib/exports/types";
import type { StudentResultRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

const columns: ColumnDef<StudentResultRow>[] = [
  {
    accessorKey: "session",
    header: "Session",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
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
    accessorKey: "creditUnits",
    header: "Credits",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("creditUnits")}</span>
    ),
  },
  {
    accessorKey: "totalScore",
    header: "Score",
    cell: ({ row }) => (
      <span className="tabular-nums">
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
    accessorKey: "gradePoint",
    header: "GPA",
    cell: ({ row }) => {
      const gpa = row.getValue("gradePoint") as number | null;
      return (
        <span className="tabular-nums">
          {gpa === null ? "—" : gpa.toFixed(1)}
        </span>
      );
    },
  },
];

export function StudentTranscriptView() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data = [], isLoading, isError, error } = useStudentTranscript(
    studentProfile.matricNo,
  );

  const exportMeta = useMemo<TranscriptExportMeta>(
    () => ({
      name: transcriptSummary.name,
      matricNo: transcriptSummary.matricNo,
      department: transcriptSummary.department,
      level: transcriptSummary.level,
      cgpa: transcriptSummary.cgpa,
      totalCreditUnits: transcriptSummary.totalCreditUnits,
      sessionLabel: currentAcademicPeriod.label,
    }),
    [],
  );

  return (
    <PortalPage>
      <PageHeader
        title="Transcript"
        description="Academic transcript with cumulative GPA summary."
        actions={
          <>
            <Button
              disabled={data.length === 0}
              onClick={() => setPreviewOpen(true)}
              type="button"
              variant="outline"
            >
              <Eye />
              Preview
            </Button>
            <TranscriptExportMenu meta={exportMeta} rows={data} />
          </>
        }
      />

      <TranscriptPreviewSheet
        meta={exportMeta}
        onOpenChange={setPreviewOpen}
        open={previewOpen}
        rows={data}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{transcriptSummary.name}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {transcriptSummary.matricNo} · {transcriptSummary.department} ·
            Level {transcriptSummary.level}
          </p>
        </CardHeader>
        <CardContent>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="CGPA"
              value={transcriptSummary.cgpa}
              helper="Cumulative grade point average"
            />
            <StatCard
              label="Credit Units"
              value={String(transcriptSummary.totalCreditUnits)}
              helper={currentAcademicPeriod.label}
            />
            <StatCard
              label="Courses Passed"
              value={String(transcriptSummary.coursesPassed)}
              helper="With published grades"
            />
            <StatCard
              label="In Progress"
              value={String(transcriptSummary.coursesInProgress)}
              helper="Registered, results pending"
            />
          </section>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold">Academic Record</h2>
          <p className="text-muted-foreground text-sm">
            Course history for {studentProfile.name} across registered sessions.
          </p>
        </div>
        <QueryState
          error={error}
          errorLabel="Could not load transcript records."
          isError={isError}
          isLoading={isLoading}
          loadingLabel="Loading transcript records..."
        >
          <DataTable
            columns={columns}
            data={data}
            emptyDescription="Transcript rows will appear as results are published each semester."
            emptyTitle="No transcript records"
            renderMobileCard={(row) => (
              <TranscriptRecordCard result={row.original} />
            )}
            searchKey="course"
            searchPlaceholder="Search by course code or title..."
          />
        </QueryState>
      </section>
    </PortalPage>
  );
}
