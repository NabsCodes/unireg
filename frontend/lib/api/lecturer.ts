import { apiGet } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import {
  csc384ResultUploads,
  lecturerAssignedCourses,
} from "@/content/demo-data/lecturer";
import {
  mapLecturerCourseRow,
  type ApiLecturerCourseRow,
  type UploadResultInput,
} from "@/types/api";
import type { LecturerCourseRow, ResultUploadRow } from "@/types/academic";

export async function getLecturerCourses(
  staffNo: string,
): Promise<LecturerCourseRow[]> {
  if (usesMockData()) {
    return lecturerAssignedCourses;
  }

  const rows = await apiGet<ApiLecturerCourseRow[]>(
    `/api/lecturers/${encodeURIComponent(staffNo)}/courses`,
  );

  return rows.map(mapLecturerCourseRow);
}

export async function getLecturerCourseResults(
  staffNo: string,
  courseCode: string,
): Promise<ResultUploadRow[]> {
  if (usesMockData()) {
    if (courseCode === "CSC384") {
      return csc384ResultUploads;
    }

    return [];
  }

  throw new Error(
    `Result upload listing is not implemented yet for ${staffNo} / ${courseCode}.`,
  );
}

export async function uploadResult(
  input: UploadResultInput,
): Promise<{ success: true }> {
  if (usesMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }

  throw new Error(
    `Result upload endpoint is not implemented yet for ${input.courseCode}.`,
  );
}
