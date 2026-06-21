"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentAcademicPeriod } from "@/lib/api/academic";

export function useCurrentAcademicPeriod() {
  return useQuery({
    queryKey: ["academic", "current-period"],
    queryFn: getCurrentAcademicPeriod,
    staleTime: 5 * 60 * 1000,
  });
}
