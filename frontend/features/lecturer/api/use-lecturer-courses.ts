"use client";

import { useQuery } from "@tanstack/react-query";

import { getLecturerCourses } from "@/lib/api/lecturer";
import { queryKeys } from "@/lib/api/query-keys";

export function useLecturerCourses(staffNo: string) {
  return useQuery({
    queryKey: queryKeys.lecturer.courses(staffNo),
    queryFn: () => getLecturerCourses(staffNo),
    enabled: Boolean(staffNo),
  });
}
