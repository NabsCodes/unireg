"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAdminAuditLogs,
  getAdminCourses,
  getAdminDepartments,
  getAdminLecturers,
  getAdminOfferings,
  getAdminStudents,
} from "@/lib/api/admin";
import { queryKeys } from "@/lib/api/query-keys";

export function useAdminDepartments() {
  return useQuery({
    queryKey: queryKeys.admin.departments(),
    queryFn: getAdminDepartments,
  });
}

export function useAdminStudents() {
  return useQuery({
    queryKey: queryKeys.admin.students(),
    queryFn: getAdminStudents,
  });
}

export function useAdminLecturers() {
  return useQuery({
    queryKey: queryKeys.admin.lecturers(),
    queryFn: getAdminLecturers,
  });
}

export function useAdminCourses() {
  return useQuery({
    queryKey: queryKeys.admin.courses(),
    queryFn: getAdminCourses,
  });
}

export function useAdminOfferings() {
  return useQuery({
    queryKey: queryKeys.admin.offerings(),
    queryFn: getAdminOfferings,
  });
}

export function useAdminAuditLogs() {
  return useQuery({
    queryKey: queryKeys.admin.auditLogs(),
    queryFn: getAdminAuditLogs,
  });
}
