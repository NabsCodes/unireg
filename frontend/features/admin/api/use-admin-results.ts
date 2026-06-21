"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAdminOfferingResults,
  getAdminGradeScale,
  updateAdminResult,
} from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";
import type { UploadResultInput } from "@/types/api";

export function useAdminOfferingResults(offeringId: number | null) {
  return useQuery({
    queryKey: queryKeys.admin.results(offeringId ?? 0),
    queryFn: () => getAdminOfferingResults(offeringId!),
    enabled: Boolean(offeringId),
  });
}

export function useAdminUpdateResult(offeringId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadResultInput) => updateAdminResult(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admin.results(offeringId),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.admin.auditLogs(),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.student.all,
      });
    },
  });
}

export function useAdminGradeScale() {
  return useQuery({
    queryKey: queryKeys.admin.gradeScale(),
    queryFn: getAdminGradeScale,
  });
}
