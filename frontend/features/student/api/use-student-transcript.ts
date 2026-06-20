"use client";

import { useQuery } from "@tanstack/react-query";

import { getStudentTranscript } from "@/lib/api/student";
import { queryKeys } from "@/lib/api/query-keys";

export function useStudentTranscript(matricNo: string) {
  return useQuery({
    queryKey: queryKeys.student.transcript(matricNo),
    queryFn: () => getStudentTranscript(matricNo),
    enabled: Boolean(matricNo),
  });
}
