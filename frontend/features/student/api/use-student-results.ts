"use client";

import { useQuery } from "@tanstack/react-query";

import { getStudentResults } from "@/lib/api/student";
import { queryKeys } from "@/lib/api/query-keys";

export function useStudentResults(matricNo: string) {
  return useQuery({
    queryKey: queryKeys.student.results(matricNo),
    queryFn: () => getStudentResults(matricNo),
    enabled: Boolean(matricNo),
  });
}
