import type { Route } from "next";

const loginRoutes: Record<string, Route> = {
  "admin@unireg.test": "/admin/dashboard",
  "gabriel.ayem@unireg.test": "/lecturer/dashboard",
  "batul.hassan@unireg.test": "/student/dashboard",
  A00025332: "/student/dashboard",
};

export function resolveLoginRoute(identifier: string): Route | null {
  const normalized = identifier.trim().toLowerCase();
  const matric = identifier.trim().toUpperCase();

  return loginRoutes[normalized] ?? loginRoutes[matric] ?? null;
}
