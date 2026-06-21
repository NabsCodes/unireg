import { apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
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
  mapSemesterRow,
  mapSessionRow,
  type ApiAuditLogRow,
  type ApiCourseRow,
  type ApiDashboardSummary,
  type ApiDepartmentRow,
  type ApiGradeScaleRow,
  type ApiLecturerRow,
  type ApiOfferingRow,
  type ApiSemesterRow,
  type ApiSessionRow,
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
  ResultUploadRow,
  SemesterRow,
  SessionRow,
  StudentRow,
} from "@/types/academic";
import { csc384ResultUploads } from "@/content/mock/lecturer";
import {
  mapResultRosterRow,
  type ApiLecturerResultRosterRow,
  type UploadResultInput,
} from "@/types/api";
import {
  adminDashboardSummary,
  adminRecentActivity,
  auditLogs,
  courseOfferings,
  courses,
  departments,
  gradeScale as adminGradeScale,
  lecturers,
  semesters,
  sessions,
  students,
} from "@/content/mock/admin";

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

export async function getAdminRecentActivity(): Promise<
  DashboardActivityItem[]
> {
  if (usesMockData()) {
    return adminRecentActivity.map((item) => ({
      id: item.id,
      text: item.text,
      time: item.time,
    }));
  }

  const rows = await apiGet<ApiAuditLogRow[]>("/api/admin/audit-logs");
  return rows
    .slice(0, 6)
    .map((row, index) => mapDashboardActivityItem(row, index));
}

export async function getAdminGradeScale(): Promise<GradeScaleRow[]> {
  if (usesMockData()) {
    return adminGradeScale;
  }

  const rows = await apiGet<ApiGradeScaleRow[]>("/api/admin/grade-scale");
  return rows.map((row, index) => mapGradeScaleRow(row, index));
}

export async function getAdminOfferingResults(
  offeringId: number,
): Promise<ResultUploadRow[]> {
  if (usesMockData()) {
    if (offeringId === 1) {
      return csc384ResultUploads;
    }

    return [];
  }

  const rows = await apiGet<ApiLecturerResultRosterRow[]>(
    `/api/admin/results?offering_id=${offeringId}`,
  );

  return rows.map((row, index) => mapResultRosterRow(row, index));
}

export async function updateAdminResult(
  input: UploadResultInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }

  await apiPost("/api/admin/results", {
    reg_id: input.regId,
    ca_score: input.caScore,
    exam_score: input.examScore,
  });

  return { success: true };
}

export async function getAdminSessions(): Promise<SessionRow[]> {
  if (usesMockData()) {
    return sessions;
  }

  const rows = await apiGet<ApiSessionRow[]>("/api/admin/sessions");
  return rows.map((row, index) => mapSessionRow(row, index));
}

export async function getAdminSemesters(): Promise<SemesterRow[]> {
  if (usesMockData()) {
    return semesters;
  }

  const rows = await apiGet<ApiSemesterRow[]>("/api/admin/semesters");
  return rows.map((row, index) => mapSemesterRow(row, index));
}
