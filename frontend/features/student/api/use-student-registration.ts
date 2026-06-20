"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getStudentRegistrationOfferings, registerCourse } from "@/lib/api/student";
import { queryKeys } from "@/lib/api/query-keys";
import type { RegisterCourseInput } from "@/types/api";

export function useStudentRegistrationOfferings(matricNo: string) {
  return useQuery({
    queryKey: queryKeys.student.registration(matricNo),
    queryFn: () => getStudentRegistrationOfferings(matricNo),
    enabled: Boolean(matricNo),
  });
}

export function useRegisterCourse(matricNo: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<RegisterCourseInput, "matricNo">) =>
      registerCourse({ ...input, matricNo }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.student.root(matricNo),
      });
    },
  });
}
