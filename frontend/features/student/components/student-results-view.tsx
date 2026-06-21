"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { currentAcademicPeriod, portalUsers } from "@/content/data/portal";
import { semesterFilter } from "@/content/data/table-filters";
import { useStudentResults } from "@/features/student/api/use-student-results";
import { StudentResultCard } from "@/features/student/components/student-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import { usePortalUser, useStudentScope } from "@/hooks/use-portal-user";
import { formatGradePoint, formatScore } from "@/lib/format/academic";
import type { StudentResultRow } from "@/types/academic";

const columns: ColumnDef<StudentResultRow>[] = [
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
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "creditUnits",
    header: "Credits",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("creditUnits")}</span>
    ),
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
      if (!grade) return "—";
      return <StatusBadge label={grade} tone="completed" />;
    },
  },
  {
    accessorKey: "gradePoint",
    header: "GPA",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatGradePoint(row.getValue("gradePoint") as number | null)}
      </span>
    ),
  },
];

export function StudentResultsView() {
  const user = usePortalUser(portalUsers.student);
  const matricNo = useStudentScope(
    portalUsers.student.identifier ?? "A00025332",
  );
  const { data = [], isLoading, isError, error } = useStudentResults(matricNo);

  return (
    <PortalPage>
      <PageHeader
        title="Results"
        description={`Semester results for ${user.name} · ${currentAcademicPeriod.label}`}
      />
      <QueryState
        error={error}
        errorLabel="Could not load semester results."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading semester results..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="Published results will appear here once scores are uploaded by lecturers."
          emptyTitle="No results published"
          filters={[semesterFilter]}
          renderMobileCard={(row) => (
            <StudentResultCard result={row.original} />
          )}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
