"use client";

import type { PortalUser } from "@/content/portal";
import { usesMockData } from "@/lib/api/config";
import { authUserToPortalUser } from "@/lib/auth/portal-user";
import { getCurrentUser } from "@/lib/auth/session";

export function usePortalUser(fallback: PortalUser): PortalUser {
  if (usesMockData()) {
    return fallback;
  }

  const authUser = getCurrentUser();
  return authUser ? authUserToPortalUser(authUser) : fallback;
}

export function useStudentScope(fallbackMatric: string): string {
  if (usesMockData()) {
    return fallbackMatric;
  }

  const authUser = getCurrentUser();
  return authUser?.matric_no ?? "me";
}

export function useLecturerScope(fallbackStaffNo: string): string {
  if (usesMockData()) {
    return fallbackStaffNo;
  }

  const authUser = getCurrentUser();
  return authUser?.staff_no ?? "me";
}
