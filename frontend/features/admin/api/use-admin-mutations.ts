"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCourse,
  createDepartment,
  createLecturer,
  createOffering,
  createSemester,
  createSession,
  createStudent,
  updateCourse,
  updateDepartment,
  updateLecturer,
  updateOffering,
  updateStudent,
} from "@/lib/api/admin-write";
import { queryKeys } from "@/lib/api/query-keys";

function useInvalidateAdmin() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.admin.all });
  };
}

export function useCreateDepartment() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: invalidate,
  });
}

export function useUpdateDepartment() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: ({
      deptId,
      body,
    }: {
      deptId: number;
      body: Parameters<typeof updateDepartment>[1];
    }) => updateDepartment(deptId, body),
    onSuccess: invalidate,
  });
}

export function useCreateStudent() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createStudent,
    onSuccess: invalidate,
  });
}

export function useUpdateStudent() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: ({
      studentId,
      body,
    }: {
      studentId: number;
      body: Parameters<typeof updateStudent>[1];
    }) => updateStudent(studentId, body),
    onSuccess: invalidate,
  });
}

export function useCreateLecturer() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createLecturer,
    onSuccess: invalidate,
  });
}

export function useUpdateLecturer() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: ({
      lecturerId,
      body,
    }: {
      lecturerId: number;
      body: Parameters<typeof updateLecturer>[1];
    }) => updateLecturer(lecturerId, body),
    onSuccess: invalidate,
  });
}

export function useCreateCourse() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: invalidate,
  });
}

export function useUpdateCourse() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: ({
      courseId,
      body,
    }: {
      courseId: number;
      body: Parameters<typeof updateCourse>[1];
    }) => updateCourse(courseId, body),
    onSuccess: invalidate,
  });
}

export function useCreateOffering() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createOffering,
    onSuccess: invalidate,
  });
}

export function useUpdateOffering() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: ({
      offeringId,
      body,
    }: {
      offeringId: number;
      body: Parameters<typeof updateOffering>[1];
    }) => updateOffering(offeringId, body),
    onSuccess: invalidate,
  });
}

export function useCreateSession() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createSession,
    onSuccess: invalidate,
  });
}

export function useCreateSemester() {
  const invalidate = useInvalidateAdmin();
  return useMutation({
    mutationFn: createSemester,
    onSuccess: invalidate,
  });
}
