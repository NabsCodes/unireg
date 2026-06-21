"use client";

import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { DashboardSuggestions } from "@/components/shared/dashboard-suggestions";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentDashboard } from "@/features/student/api/use-student-dashboard";
import { PortalPage } from "@/features/portal/components/portal-page";
import { buildStudentDashboardSuggestions } from "@/lib/dashboard/student-suggestions";
import { formatGradePoint } from "@/lib/format/academic";

function academicPeriodLabel(session: string, semester: string | null): string {
  return semester ? `${session} · ${semester}` : session;
}

export function StudentDashboardView() {
  const { data, isLoading, isError, error } = useStudentDashboard();

  return (
    <PortalPage>
      <QueryState
        error={error}
        errorLabel="Could not load your dashboard."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading dashboard..."
        variant="dashboard"
      >
        {data ? (
          <>
            <PageHeader
              title="Student Dashboard"
              description={`${data.name} · ${data.department} · Level ${data.level}`}
            />

            <section className="grid gap-4 md:grid-cols-3">
              <StatCard
                label="Registered Courses"
                value={String(data.registeredCount)}
                helper={academicPeriodLabel(data.session, data.semester)}
              />
              <StatCard
                label="Semester GPA"
                value={formatGradePoint(data.semesterGpa)}
                helper={
                  data.semester
                    ? `${data.semester} · published results`
                    : "Based on published results"
                }
              />
              <StatCard
                label="CGPA"
                value={formatGradePoint(data.cgpa)}
                helper="Cumulative grade point average"
              />
            </section>

            <DashboardSuggestions
              suggestions={buildStudentDashboardSuggestions(data)}
            />

            <Card>
              <CardHeader>
                <CardTitle>
                  Registration Status
                  {data.semester ? (
                    <span className="text-muted-foreground block text-sm font-normal">
                      {academicPeriodLabel(data.session, data.semester)}
                    </span>
                  ) : null}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.registeredCourses.length === 0 ? (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      No courses registered for{" "}
                      {data.semester
                        ? `${data.semester.toLowerCase()} yet`
                        : "the current session yet"}
                      .
                    </p>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/student/registration">
                        Browse available courses
                      </Link>
                    </Button>
                  </div>
                ) : (
                  data.registeredCourses.map((course) => (
                    <div
                      className="border-border flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                      key={course.id}
                    >
                      <div>
                        <p className="text-foreground font-medium">
                          {course.courseCode} · {course.courseTitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {course.creditUnits} credit units · {course.semester}
                        </p>
                      </div>
                      <StatusBadge
                        label={
                          course.status === "registered"
                            ? "Registered"
                            : course.status
                        }
                        tone="active"
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        ) : null}
      </QueryState>
    </PortalPage>
  );
}
