import { apiGet } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  availableOfferings,
  studentResults,
} from "@/content/demo-data/student";
import {
  mapAvailableOfferingRow,
  mapStudentResultRow,
  type ApiAvailableCourseOffering,
  type ApiStudentResultRow,
} from "@/types/api";
import type { AvailableOfferingRow, StudentResultRow } from "@/types/academic";
import type { RegisterCourseInput } from "@/types/api";

export async function getStudentResults(
  matricNo: string,
): Promise<StudentResultRow[]> {
  if (usesMockData()) {
    return studentResults;
  }

  const rows = await apiGet<ApiStudentResultRow[]>(
    `/api/students/${encodeURIComponent(matricNo)}/results`,
  );

  return rows.map(mapStudentResultRow);
}

export async function getStudentTranscript(
  matricNo: string,
): Promise<StudentResultRow[]> {
  if (usesMockData()) {
    return studentResults;
  }

  const rows = await apiGet<ApiStudentResultRow[]>(
    `/api/students/${encodeURIComponent(matricNo)}/transcript`,
  );

  return rows.map(mapStudentResultRow);
}

export async function getStudentRegistrationOfferings(
  _matricNo: string,
): Promise<AvailableOfferingRow[]> {
  if (usesMockData()) {
    return availableOfferings;
  }

  const offerings = await apiGet<ApiAvailableCourseOffering[]>(
    "/api/academic/course-offerings",
  );

  return offerings.map((offering) =>
    mapAvailableOfferingRow(offering, false),
  );
}

export async function registerCourse(
  input: RegisterCourseInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true };
  }

  throw new Error(
    `Course registration endpoint is not implemented yet for ${input.matricNo}.`,
  );
}
