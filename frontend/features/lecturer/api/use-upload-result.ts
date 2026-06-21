"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getLecturerCourseResults, uploadResult } from "@/lib/api/lecturer";
import { queryKeys } from "@/lib/api/query-keys";
import type { UploadResultInput } from "@/types/api";

export function useLecturerCourseResults(staffNo: string, courseCode: string) {
  return useQuery({
    queryKey: queryKeys.lecturer.results(staffNo, courseCode),
    queryFn: () => getLecturerCourseResults(staffNo, courseCode),
    enabled: Boolean(staffNo && courseCode),
  });
}

export function useUploadResult(staffNo: string, courseCode = "CSC384") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadResultInput) => uploadResult(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.lecturer.root(staffNo),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.lecturer.results(staffNo, courseCode),
      });
    },
  });
}
