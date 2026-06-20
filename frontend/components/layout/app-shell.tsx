import Link from "next/link";
import type { Route } from "next";
import type { ComponentType, ReactNode } from "react";

type NavItem = {
  label: string;
  href: Route;
  icon: ComponentType<{ className?: string }>;
};

type AppShellProps = {
  children: ReactNode;
  navItems: NavItem[];
  roleLabel: string;
  userName: string;
};

export function AppShell({
  children,
  navItems,
  roleLabel,
  userName,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-r lg:border-b-0">
        <div className="flex h-16 items-center border-b border-slate-200 px-5">
          <div>
            <p className="text-lg font-semibold text-blue-950">UniReg</p>
            <p className="text-xs text-slate-500">{roleLabel} Portal</p>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className="flex min-w-max items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-950 lg:min-w-0"
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div>
        <header className="flex min-h-16 flex-col justify-center gap-1 border-b border-slate-200 bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-950">
              2025/2026 First Semester
            </p>
            <p className="text-xs text-slate-500">Current academic period</p>
          </div>
          <div className="text-sm text-slate-600">{userName}</div>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
