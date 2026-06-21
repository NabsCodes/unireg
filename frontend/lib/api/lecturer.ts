import { apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  csc384ResultUploads,
  lecturerAssignedCourses,
} from "@/content/demo-data/lecturer";
import {
  mapLecturerCourseRow,
  mapResultRosterRow,
  type ApiLecturerCourseRow,
  type ApiLecturerResultRosterRow,
  type UploadResultInput,
} from "@/types/api";
import type { LecturerCourseRow, ResultUploadRow } from "@/types/academic";

const CSC384_OFFERING_ID = 1;

function resolveOfferingId(courseCode: string): number {
  if (courseCode === "CSC384") {
    return CSC384_OFFERING_ID;
  }

  return CSC384_OFFERING_ID;
}

export async function getLecturerCourses(
  staffNo: string,
): Promise<LecturerCourseRow[]> {
  if (usesMockData()) {
    return lecturerAssignedCourses;
  }

  const path =
    staffNo === "me"
      ? "/api/lecturers/me/courses"
      : `/api/lecturers/${encodeURIComponent(staffNo)}/courses`;

  const rows = await apiGet<ApiLecturerCourseRow[]>(path);
  return rows.map((row, index) => mapLecturerCourseRow(row, index));
}

export async function getLecturerCourseResults(
  _staffNo: string,
  courseCode: string,
): Promise<ResultUploadRow[]> {
  if (usesMockData()) {
    if (courseCode === "CSC384") {
      return csc384ResultUploads;
    }

    return [];
  }

  const offeringId = resolveOfferingId(courseCode);
  const rows = await apiGet<ApiLecturerResultRosterRow[]>(
    `/api/lecturers/me/result-roster?offering_id=${offeringId}`,
  );

  return rows.map((row, index) => mapResultRosterRow(row, index));
}

export async function uploadResult(
  input: UploadResultInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }

  await apiPost("/api/lecturers/me/results", {
    reg_id: input.regId,
    ca_score: input.caScore,
    exam_score: input.examScore,
  });

  return { success: true };
}
