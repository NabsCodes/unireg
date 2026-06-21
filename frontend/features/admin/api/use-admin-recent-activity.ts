"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminRecentActivity } from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";

export function useAdminRecentActivity() {
  return useQuery({
    queryKey: queryKeys.admin.recentActivity(),
    queryFn: getAdminRecentActivity,
  });
}
