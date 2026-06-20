import {
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const portalHighlights = [
  {
    label: "Course registration",
    detail: "Session and semester aware",
    icon: ClipboardCheck,
  },
  {
    label: "Result management",
    detail: "CA, exam, grade, and audit trail",
    icon: ShieldCheck,
  },
  {
    label: "Transcript generation",
    detail: "4.0 CGPA scale from SQL views",
    icon: FileText,
  },
] as const;

export function LoginBrandPanel() {
  return (
    <aside className="bg-unireg-shell-gradient relative hidden min-h-screen overflow-hidden lg:flex">
      <div className="relative z-10 flex w-full flex-col px-10 py-9 xl:px-14 xl:py-12">
        <div className="flex items-center gap-3">
          <div className="text-primary flex size-12 items-center justify-center rounded-lg bg-white">
            <GraduationCap className="size-7" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">UniReg</p>
            <p className="text-xs font-medium tracking-wide text-white/65 uppercase">
              CSC 384 · Group 1
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center py-12">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/80">
              <Database className="size-4" />
              PostgreSQL-backed academic records
            </div>

            <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight text-white xl:text-5xl">
              University course registration and results management.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/78">
              A role-based portal for administrators, lecturers, and students,
              built around normalized records, result auditability, and
              transcript-ready calculations.
            </p>

            <div className="mt-9 grid max-w-2xl gap-3 xl:grid-cols-3">
              {portalHighlights.map((item) => (
                <div
                  className="rounded-lg border border-white/12 bg-white/8 p-4"
                  key={item.label}
                >
                  <item.icon className="mb-4 size-5 text-white" />
                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/65">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-white/12 pt-5 text-xs text-white/65">
          <span>Admin · Lecturer · Student</span>
          <span>4.0 CGPA scale</span>
        </div>
      </div>
    </aside>
  );
}
