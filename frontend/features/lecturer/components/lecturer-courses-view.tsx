"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { lecturerProfile } from "@/content/demo-data/lecturer";
import { currentAcademicPeriod } from "@/content/portal";
import { useLecturerCourses } from "@/features/lecturer/api/use-lecturer-courses";
import { LecturerCourseCard } from "@/features/lecturer/components/lecturer-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import { useLecturerScope } from "@/hooks/use-portal-user";
import type { LecturerCourseRow } from "@/types/academic";

const columns: ColumnDef<LecturerCourseRow>[] = [
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
    accessorKey: "registeredStudents",
    header: "Registered",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("registeredStudents")}</span>
    ),
  },
  {
    id: "uploads",
    header: "Results uploaded",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.resultsUploaded}/{row.original.registeredStudents}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const complete =
        row.original.resultsUploaded >= row.original.registeredStudents &&
        row.original.registeredStudents > 0;
      return (
        <StatusBadge
          label={complete ? "Complete" : "Pending uploads"}
          tone={complete ? "completed" : "pending"}
        />
      );
    },
  },
];

export function LecturerCoursesView() {
  const staffNo = useLecturerScope(lecturerProfile.staffNo);
  const { data = [], isLoading, isError, error } = useLecturerCourses(
    staffNo,
  );

  return (
    <PortalPage>
      <PageHeader
        title="Assigned Courses"
        description={`Course offerings assigned to you for ${currentAcademicPeriod.label}.`}
      />
      <QueryState
        error={error}
        errorLabel="Could not load assigned courses."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading assigned courses..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="No course offerings are assigned to your profile yet."
          emptyTitle="No assigned courses"
          renderMobileCard={(row) => (
            <LecturerCourseCard course={row.original} />
          )}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
