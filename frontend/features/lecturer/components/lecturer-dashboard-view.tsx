"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { lecturerProfile } from "@/content/demo-data/lecturer";
import { currentAcademicPeriod } from "@/content/portal";
import { useLecturerCourses } from "@/features/lecturer/api/use-lecturer-courses";
import { LecturerCourseCard } from "@/features/lecturer/components/lecturer-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
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
    header: "Students",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("registeredStudents")}</span>
    ),
  },
  {
    id: "results",
    header: "Results",
    cell: ({ row }) => {
      const uploaded = row.original.resultsUploaded;
      const total = row.original.registeredStudents;
      const complete = uploaded >= total && total > 0;
      return (
        <StatusBadge
          label={complete ? "Complete" : "Pending"}
          tone={complete ? "completed" : "pending"}
        />
      );
    },
  },
];

export function LecturerDashboardView() {
  const { data = [], isLoading, isError, error } = useLecturerCourses(
    lecturerProfile.staffNo,
  );
  const assigned = data.length;
  const registeredStudents = data.reduce(
    (sum, course) => sum + course.registeredStudents,
    0,
  );
  const pendingResults = data.filter(
    (course) => course.resultsUploaded < course.registeredStudents,
  ).length;

  return (
    <PortalPage>
      <PageHeader
        title="Lecturer Dashboard"
        description={`Welcome back, ${lecturerProfile.name}. Review assigned offerings and result upload status for ${currentAcademicPeriod.label}.`}
      />

      <QueryState
        error={error}
        errorLabel="Could not load lecturer dashboard."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading lecturer dashboard..."
      >
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Assigned Courses"
            value={String(assigned)}
            helper={currentAcademicPeriod.session}
          />
          <StatCard
            label="Registered Students"
            value={String(registeredStudents)}
            helper="Across assigned offerings"
          />
          <StatCard
            label="Pending Results"
            value={String(pendingResults)}
            helper="Offerings awaiting upload"
          />
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-base font-semibold">Assigned Courses</h2>
            <p className="text-muted-foreground text-sm">
              Course offerings assigned to you for the current academic period.
            </p>
          </div>
          <DataTable
            columns={columns}
            data={data}
            emptyDescription="No course offerings are assigned to your profile yet."
            emptyTitle="No assigned courses"
            initialPageSize={5}
            renderMobileCard={(row) => (
              <LecturerCourseCard course={row.original} />
            )}
            searchKey="course"
            searchPlaceholder="Search by course code or title..."
          />
        </section>
      </QueryState>
    </PortalPage>
  );
}
