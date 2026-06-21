import { apiDelete, apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  availableOfferings,
  registeredCourses,
  studentProfile,
  studentResults,
} from "@/content/demo-data/student";
import {
  mapAvailableOfferingRow,
  mapStudentDashboard,
  mapStudentResultRow,
  type ApiStudentDashboardSummary,
  type ApiStudentAvailableCourseOffering,
  type ApiStudentResultRow,
  type DropCourseInput,
  type RegisterCourseInput,
} from "@/types/api";
import type {
  AvailableOfferingRow,
  StudentDashboardSummary,
  StudentResultRow,
} from "@/types/academic";

export async function getStudentDashboard(): Promise<StudentDashboardSummary> {
  if (usesMockData()) {
    return {
      matricNo: studentProfile.matricNo,
      name: studentProfile.name,
      email: studentProfile.email,
      level: studentProfile.level,
      department: studentProfile.department,
      session: studentProfile.session,
      semester: studentProfile.semester,
      registeredCount: studentProfile.registeredCourses,
      semesterGpa: Number(studentProfile.semesterGpa),
      cgpa: Number(studentProfile.cgpa),
      registeredCourses: registeredCourses.map((course) => ({
        id: course.id,
        offeringId: Number(course.id),
        courseCode: course.code,
        courseTitle: course.title,
        creditUnits: course.creditUnits,
        status: course.status,
        semester: studentProfile.semester,
      })),
    };
  }

  const summary = await apiGet<ApiStudentDashboardSummary>(
    "/api/students/me/dashboard",
  );
  return mapStudentDashboard(summary);
}

export async function getStudentResults(
  matricNo: string,
): Promise<StudentResultRow[]> {
  if (usesMockData()) {
    return studentResults;
  }

  const path =
    matricNo === "me"
      ? "/api/students/me/results"
      : `/api/students/${encodeURIComponent(matricNo)}/results`;

  const rows = await apiGet<ApiStudentResultRow[]>(path);
  return rows.map((row, index) => mapStudentResultRow(row, index));
}

export async function getStudentTranscript(
  matricNo: string,
): Promise<StudentResultRow[]> {
  if (usesMockData()) {
    return studentResults;
  }

  const path =
    matricNo === "me"
      ? "/api/students/me/transcript"
      : `/api/students/${encodeURIComponent(matricNo)}/transcript`;

  const rows = await apiGet<ApiStudentResultRow[]>(path);
  return rows.map((row, index) => mapStudentResultRow(row, index));
}

export async function getStudentRegistrationOfferings(
  _matricNo: string,
): Promise<AvailableOfferingRow[]> {
  if (usesMockData()) {
    return availableOfferings;
  }

  const offerings = await apiGet<ApiStudentAvailableCourseOffering[]>(
    "/api/students/me/course-offerings",
  );

  return offerings.map((offering) => mapAvailableOfferingRow(offering));
}

export async function registerCourse(
  input: RegisterCourseInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
  }

  await apiPost("/api/students/me/registrations", {
    offering_id: input.offeringId,
  });

  return { success: true };
}

export async function dropCourse(
  input: DropCourseInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
  }

  await apiDelete(
    `/api/students/me/registrations/${encodeURIComponent(String(input.offeringId))}`,
  );

  return { success: true };
}
