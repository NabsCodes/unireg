import Link from "next/link";
import type { Route } from "next";

const demoAccounts: Array<{
  role: string;
  href: Route;
  identifier: string;
}> = [
  { role: "Admin", href: "/admin/dashboard", identifier: "admin@unireg.test" },
  {
    role: "Lecturer",
    href: "/lecturer/dashboard",
    identifier: "ayem@unireg.test",
  },
  {
    role: "Student",
    href: "/student/dashboard",
    identifier: "A00025332",
  },
];

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-medium text-teal-700">UniReg</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">
            University course registration
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in as admin, lecturer, or student to continue.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Email, matric number, or staff number
            </span>
            <input
              className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm ring-teal-600 transition outline-none focus:ring-2"
              placeholder="A00025332"
              type="text"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm ring-teal-600 transition outline-none focus:ring-2"
              placeholder="Enter password"
              type="password"
            />
          </label>

          <button
            className="h-10 w-full rounded-md bg-blue-900 px-4 text-sm font-medium text-white transition hover:bg-blue-950"
            type="button"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Demo shortcuts
          </p>
          <div className="mt-3 grid gap-2">
            {demoAccounts.map((account) => (
              <Link
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition hover:border-teal-600 hover:text-teal-700"
                href={account.href}
                key={account.role}
              >
                <span className="font-medium">{account.role}</span>
                <span className="text-xs text-slate-500">
                  {account.identifier}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
