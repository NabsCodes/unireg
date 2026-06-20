import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { studentNavigation } from "@/content/navigation";

export default function StudentDashboardPage() {
  return (
    <AppShell
      navItems={studentNavigation}
      roleLabel="Student"
      userName="Batul Hassan"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Welcome, Batul Hassan
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Computer Science, 300 level, matric number A00025332.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Registered Units"
            value="18"
            helper="Current semester"
          />
          <StatCard
            label="Semester GPA"
            value="4.25"
            helper="Latest result set"
          />
          <StatCard label="CGPA" value="4.12" helper="Cumulative standing" />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Current Registration
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>CSC384 Database Systems - Registered</p>
            <p>CSC302 Operating Systems - Registered</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
