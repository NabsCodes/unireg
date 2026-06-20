import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  registeredCourses,
  studentProfile,
} from "@/content/demo-data/student";
import { currentAcademicPeriod } from "@/content/portal";
import { PortalPage } from "@/features/portal/components/portal-page";

export function StudentDashboardView() {
  return (
    <PortalPage>
      <PageHeader
        title="Student Dashboard"
        description={`${studentProfile.name} · ${studentProfile.department} · Level ${studentProfile.level}`}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Registered Courses"
          value={String(studentProfile.registeredCourses)}
          helper={currentAcademicPeriod.label}
        />
        <StatCard
          label="Semester GPA"
          value={studentProfile.semesterGpa}
          helper="Based on published results"
        />
        <StatCard
          label="CGPA"
          value={studentProfile.cgpa}
          helper="Cumulative grade point average"
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Registration Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {registeredCourses.map((course) => (
            <div
              className="border-border flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
              key={course.id}
            >
              <div>
                <p className="text-foreground font-medium">
                  {course.code} · {course.title}
                </p>
                <p className="text-muted-foreground text-xs">
                  {course.creditUnits} credit units
                </p>
              </div>
              <StatusBadge label={course.status} tone="active" />
            </div>
          ))}
        </CardContent>
      </Card>
    </PortalPage>
  );
}
