import { apiDelete, apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  availableOfferings,
  studentResults,
} from "@/content/demo-data/student";
import {
  mapAvailableOfferingRow,
  mapStudentResultRow,
  type ApiStudentAvailableCourseOffering,
  type ApiStudentResultRow,
  type DropCourseInput,
  type RegisterCourseInput,
} from "@/types/api";
import type { AvailableOfferingRow, StudentResultRow } from "@/types/academic";

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
