import { apiGet } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  adminDashboardSummary,
  adminRecentActivity,
  auditLogs,
  courseOfferings,
  courses,
  departments,
  lecturers,
  students,
} from "@/content/demo-data/admin";
import {
  mapAdminCourseRow,
  mapAdminLecturerRow,
  mapAdminStudentRow,
  mapAuditLogRow,
  mapDashboardActivityItem,
  mapDashboardSummary,
  mapDepartmentRow,
  mapGradeScaleRow,
  mapOfferingRow,
  type ApiAuditLogRow,
  type ApiCourseRow,
  type ApiDashboardSummary,
  type ApiDepartmentRow,
  type ApiGradeScaleRow,
  type ApiLecturerRow,
  type ApiOfferingRow,
  type ApiStudentRow,
  type DashboardActivityItem,
  type DashboardSummary,
} from "@/types/api";
import type {
  AuditLogRow,
  CourseRow,
  DepartmentRow,
  GradeScaleRow,
  LecturerRow,
  OfferingRow,
  StudentRow,
} from "@/types/academic";

export async function getAdminDashboardSummary(): Promise<DashboardSummary> {
  if (usesMockData()) {
    return {
      activeStudents: adminDashboardSummary.activeStudents,
      lecturers: adminDashboardSummary.lecturers,
      departments: adminDashboardSummary.departments,
      courses: adminDashboardSummary.courses,
      activeRegistrations: adminDashboardSummary.activeRegistrations,
      uploadedResults: adminDashboardSummary.uploadedResults,
      currentSession: adminDashboardSummary.currentSession,
    };
  }

  const summary = await apiGet<ApiDashboardSummary>("/api/admin/dashboard");
  return mapDashboardSummary(summary);
}

export async function getAdminDepartments(): Promise<DepartmentRow[]> {
  if (usesMockData()) {
    return departments;
  }

  const rows = await apiGet<ApiDepartmentRow[]>("/api/admin/departments");
  return rows.map((row, index) => mapDepartmentRow(row, index));
}

export async function getAdminStudents(): Promise<StudentRow[]> {
  if (usesMockData()) {
    return students;
  }

  const rows = await apiGet<ApiStudentRow[]>("/api/admin/students");
  return rows.map((row, index) => mapAdminStudentRow(row, index));
}

export async function getAdminLecturers(): Promise<LecturerRow[]> {
  if (usesMockData()) {
    return lecturers;
  }

  const rows = await apiGet<ApiLecturerRow[]>("/api/admin/lecturers");
  return rows.map((row, index) => mapAdminLecturerRow(row, index));
}

export async function getAdminCourses(): Promise<CourseRow[]> {
  if (usesMockData()) {
    return courses;
  }

  const rows = await apiGet<ApiCourseRow[]>("/api/admin/courses");
  return rows.map((row, index) => mapAdminCourseRow(row, index));
}

export async function getAdminOfferings(): Promise<OfferingRow[]> {
  if (usesMockData()) {
    return courseOfferings;
  }

  const rows = await apiGet<ApiOfferingRow[]>("/api/admin/offerings");
  return rows.map((row, index) => mapOfferingRow(row, index));
}

export async function getAdminAuditLogs(): Promise<AuditLogRow[]> {
  if (usesMockData()) {
    return auditLogs;
  }

  const rows = await apiGet<ApiAuditLogRow[]>("/api/admin/audit-logs");
  return rows.map((row, index) => mapAuditLogRow(row, index));
}

export async function getAdminRecentActivity(): Promise<DashboardActivityItem[]> {
  if (usesMockData()) {
    return adminRecentActivity.map((item) => ({
      id: item.id,
      text: item.text,
      time: item.time,
    }));
  }

  const rows = await apiGet<ApiAuditLogRow[]>("/api/admin/audit-logs");
  return rows.slice(0, 6).map((row, index) => mapDashboardActivityItem(row, index));
}

export async function getAdminGradeScale(): Promise<GradeScaleRow[]> {
  if (usesMockData()) {
    return [];
  }

  const rows = await apiGet<ApiGradeScaleRow[]>("/api/admin/grade-scale");
  return rows.map((row, index) => mapGradeScaleRow(row, index));
}
