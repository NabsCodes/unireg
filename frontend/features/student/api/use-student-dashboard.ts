"use client";

import { useQuery } from "@tanstack/react-query";

import { getStudentDashboard } from "@/lib/api/student";
import { queryKeys } from "@/lib/api/query-keys";

export function useStudentDashboard() {
  return useQuery({
    queryKey: queryKeys.student.dashboard(),
    queryFn: getStudentDashboard,
  });
}
