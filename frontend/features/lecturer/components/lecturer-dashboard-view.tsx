"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  lecturerAssignedCourses,
  lecturerProfile,
} from "@/content/demo-data/lecturer";
import { currentAcademicPeriod } from "@/content/portal";
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
  const assigned = lecturerAssignedCourses.length;
  const registeredStudents = lecturerAssignedCourses.reduce(
    (sum, course) => sum + course.registeredStudents,
    0,
  );
  const pendingResults = lecturerAssignedCourses.filter(
    (course) => course.resultsUploaded < course.registeredStudents,
  ).length;

  return (
    <PortalPage>
      <PageHeader
        title="Lecturer Dashboard"
        description={`Welcome back, ${lecturerProfile.name}. Review assigned offerings and result upload status for ${currentAcademicPeriod.label}.`}
      />

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
          data={lecturerAssignedCourses}
          emptyDescription="No course offerings are assigned to your profile yet."
          emptyTitle="No assigned courses"
          initialPageSize={5}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </section>
    </PortalPage>
  );
}
