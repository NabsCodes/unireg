import { apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  csc384ResultUploads,
  lecturerAssignedCourses,
  mth201ResultUploads,
  musaAssignedCourses,
} from "@/content/demo-data/lecturer";
import {
  mapLecturerCourseRow,
  mapResultRosterRow,
  type ApiLecturerCourseRow,
  type ApiLecturerResultRosterRow,
  type UploadResultInput,
} from "@/types/api";
import type { LecturerCourseRow, ResultUploadRow } from "@/types/academic";

export async function getLecturerCourses(
  staffNo: string,
): Promise<LecturerCourseRow[]> {
  if (usesMockData()) {
    if (staffNo === "STF-CS-002" || staffNo === "musa.danjuma@unireg.test") {
      return musaAssignedCourses;
    }

    return lecturerAssignedCourses;
  }

  const path =
    staffNo === "me"
      ? "/api/lecturers/me/courses"
      : `/api/lecturers/${encodeURIComponent(staffNo)}/courses`;

  const rows = await apiGet<ApiLecturerCourseRow[]>(path);
  return rows.map((row, index) => mapLecturerCourseRow(row, index));
}

export async function getLecturerOfferingResults(
  _staffNo: string,
  offeringId: number,
): Promise<ResultUploadRow[]> {
  if (usesMockData()) {
    if (offeringId === 1) {
      return csc384ResultUploads;
    }

    if (offeringId === 3) {
      return mth201ResultUploads;
    }

    return [];
  }

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
