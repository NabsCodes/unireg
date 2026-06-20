import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { adminNavigation } from "@/content/navigation";

const stats = [
  { label: "Students", value: "245", helper: "Active academic records" },
  { label: "Courses", value: "48", helper: "Across all departments" },
  { label: "Registrations", value: "1,120", helper: "Current semester" },
  {
    label: "Results Uploaded",
    value: "780",
    helper: "Awaiting transcript view",
  },
];

export default function AdminDashboardPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage academic setup, course offerings, registrations, and result
            oversight.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>CSC384 results uploaded by Dr. Gabriel Ayem.</p>
            <p>Batul Hassan registered CSC384 for First Semester.</p>
            <p>New course offering created for Database Systems.</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
