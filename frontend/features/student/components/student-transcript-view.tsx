"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentAcademicPeriod, portalUsers } from "@/content/data/portal";
import { useStudentTranscript } from "@/features/student/api/use-student-transcript";
import { useStudentDashboard } from "@/features/student/api/use-student-dashboard";
import { TranscriptAcademicRecord } from "@/features/student/components/transcript-academic-record";
import { TranscriptExportMenu } from "@/features/student/components/transcript-export-menu";
import { TranscriptPreviewSheet } from "@/features/student/components/transcript-preview-sheet";
import { PortalPage } from "@/features/portal/components/portal-page";
import { usePortalUser, useStudentScope } from "@/hooks/use-portal-user";
import { formatGradePoint } from "@/lib/format/academic";
import type { TranscriptExportMeta } from "@/lib/exports/types";
import type { StudentResultRow } from "@/types/academic";

function buildTranscriptSummary(
  rows: StudentResultRow[],
  userDepartment?: string,
) {
  const publishedRows = rows.filter((row) => row.gradePoint !== null);
  const cgpa = rows.find((row) => row.cgpa !== null)?.cgpa ?? null;

  return {
    department:
      rows.find((row) => row.department)?.department ??
      userDepartment ??
      "Department not available",
    cgpa,
    totalCreditUnits: rows.reduce((sum, row) => sum + row.creditUnits, 0),
    coursesPassed: publishedRows.filter((row) => (row.gradePoint ?? 0) > 0)
      .length,
    coursesInProgress: rows.filter((row) => row.grade === null).length,
  };
}

export function StudentTranscriptView() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const user = usePortalUser(portalUsers.student);
  const matricNo = useStudentScope(
    portalUsers.student.identifier ?? "A00025332",
  );
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useStudentTranscript(matricNo);
  const { data: dashboard } = useStudentDashboard();
  const displayLevel = user.level ?? dashboard?.level ?? "—";
  const summary = useMemo(
    () =>
      buildTranscriptSummary(data, user.department ?? dashboard?.department),
    [dashboard?.department, data, user.department],
  );

  const exportMeta = useMemo<TranscriptExportMeta>(
    () => ({
      name: user.name,
      matricNo: user.identifier ?? matricNo,
      department: summary.department,
      level: displayLevel,
      cgpa: formatGradePoint(summary.cgpa),
      totalCreditUnits: summary.totalCreditUnits,
      sessionLabel: currentAcademicPeriod.label,
    }),
    [
      matricNo,
      summary.cgpa,
      summary.department,
      summary.totalCreditUnits,
      displayLevel,
      user.identifier,
      user.name,
    ],
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
          <CardTitle className="text-base">{user.name}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {user.identifier ?? matricNo} · {summary.department} · Level{" "}
            {displayLevel}
          </p>
        </CardHeader>
        <CardContent>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="CGPA"
              value={formatGradePoint(summary.cgpa)}
              helper="Cumulative grade point average"
            />
            <StatCard
              label="Credit Units"
              value={String(summary.totalCreditUnits)}
              helper={currentAcademicPeriod.label}
            />
            <StatCard
              label="Courses Passed"
              value={String(summary.coursesPassed)}
              helper="With published grades"
            />
            <StatCard
              label="In Progress"
              value={String(summary.coursesInProgress)}
              helper="Registered, results pending"
            />
          </section>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold">Academic Record</h2>
          <p className="text-muted-foreground text-sm">
            Browse courses by session and semester. Expand a term to see your
            registered courses and grades.
          </p>
        </div>
        <QueryState
          error={error}
          errorLabel="Could not load transcript records."
          isError={isError}
          isLoading={isLoading}
          loadingLabel="Loading transcript records..."
        >
          <TranscriptAcademicRecord rows={data} />
        </QueryState>
      </section>
    </PortalPage>
  );
}
