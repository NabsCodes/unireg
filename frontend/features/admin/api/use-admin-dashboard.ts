"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminDashboardSummary } from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard(),
    queryFn: getAdminDashboardSummary,
  });
}
