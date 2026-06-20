import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { lecturerNavigation } from "@/content/navigation";

export default function LecturerDashboardPage() {
  return (
    <AppShell
      navItems={lecturerNavigation}
      roleLabel="Lecturer"
      userName="Dr. Gabriel Ayem"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Lecturer Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            View assigned course offerings and upload student results.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Assigned Courses"
            value="2"
            helper="Current semester"
          />
          <StatCard
            label="Registered Students"
            value="80"
            helper="Across courses"
          />
          <StatCard
            label="Pending Results"
            value="1"
            helper="One course outstanding"
          />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Assigned Courses
          </h2>
          <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-3 py-2">Course</th>
                  <th className="px-3 py-2">Semester</th>
                  <th className="px-3 py-2">Students</th>
                  <th className="px-3 py-2">Results</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">CSC384 Database Systems</td>
                  <td className="px-3 py-2">First Semester</td>
                  <td className="px-3 py-2">42</td>
                  <td className="px-3 py-2">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
