import type { Route } from "next";

import type { PortalUser } from "@/content/data/portal";
import type { StoredAuthUser } from "@/lib/auth/session";

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  student: "Student",
  lecturer: "Lecturer",
};

export function authUserToPortalUser(user: StoredAuthUser): PortalUser {
  return {
    name: user.name ?? user.email,
    role: roleLabels[user.role] ?? user.role,
    email: user.email,
    identifier: user.matric_no ?? user.staff_no ?? undefined,
    department: user.department ?? undefined,
    level: user.level ?? undefined,
    status: "active",
  };
}

export function roleToDashboardRoute(role: string): Route {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "lecturer":
      return "/lecturer/dashboard";
    case "student":
      return "/student/dashboard";
    default:
      return "/login";
  }
}
