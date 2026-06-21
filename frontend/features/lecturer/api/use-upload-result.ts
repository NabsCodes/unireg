"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getLecturerOfferingResults,
  uploadResult,
} from "@/lib/api/lecturer";
import { queryKeys } from "@/lib/api/query-keys";
import type { UploadResultInput } from "@/types/api";

export function useLecturerOfferingResults(
  staffNo: string,
  offeringId: number | null,
) {
  return useQuery({
    queryKey: queryKeys.lecturer.results(staffNo, offeringId ?? 0),
    queryFn: () => getLecturerOfferingResults(staffNo, offeringId!),
    enabled: Boolean(staffNo && offeringId),
  });
}

export function useUploadResult(staffNo: string, offeringId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadResultInput) => uploadResult(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.lecturer.root(staffNo),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.lecturer.results(staffNo, offeringId),
      });
    },
  });
}
