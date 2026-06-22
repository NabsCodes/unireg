import type { StudentResultRow } from "@/types/academic";

const SEMESTER_ORDER: Record<string, number> = {
  "First Semester": 1,
  "Second Semester": 2,
  Summer: 3,
};

export type TranscriptSemesterGroup = {
  id: string;
  session: string;
  semester: string;
  courses: StudentResultRow[];
  semesterGpa: number | null;
  cgpa: number | null;
  totalCredits: number;
  courseCount: number;
  pendingCount: number;
  /** Set when a course search is active and fewer rows are shown than the full semester. */
  matchedCourseCount?: number;
};

export function groupTranscriptRows(
  rows: StudentResultRow[],
): TranscriptSemesterGroup[] {
  const buckets = new Map<string, StudentResultRow[]>();

  for (const row of rows) {
    const id = `${row.session}::${row.semester}`;
    const courses = buckets.get(id) ?? [];
    courses.push(row);
    buckets.set(id, courses);
  }

  return [...buckets.entries()]
    .map(([id, courses]) => {
      const { session, semester } = courses[0];
      const semesterGpa =
        courses.find((course) => course.semesterGpa != null)?.semesterGpa ??
        null;
      const cgpa = courses.find((course) => course.cgpa != null)?.cgpa ?? null;

      return {
        id,
        session,
        semester,
        courses: [...courses].sort((left, right) =>
          left.courseCode.localeCompare(right.courseCode),
        ),
        semesterGpa,
        cgpa,
        totalCredits: courses.reduce(
          (sum, course) => sum + course.creditUnits,
          0,
        ),
        courseCount: courses.length,
        pendingCount: courses.filter((course) => course.grade == null).length,
      };
    })
    .sort((left, right) => {
      const sessionOrder = right.session.localeCompare(left.session);
      if (sessionOrder !== 0) {
        return sessionOrder;
      }

      return (
        (SEMESTER_ORDER[left.semester] ?? 99) -
        (SEMESTER_ORDER[right.semester] ?? 99)
      );
    });
}

export function getTranscriptSessions(
  groups: TranscriptSemesterGroup[],
): string[] {
  return [...new Set(groups.map((group) => group.session))].sort((a, b) =>
    b.localeCompare(a),
  );
}

export function filterTranscriptGroups(
  groups: TranscriptSemesterGroup[],
  options: {
    session?: string;
    search?: string;
  },
): TranscriptSemesterGroup[] {
  const normalizedSearch = options.search?.trim().toLowerCase() ?? "";

  return groups
    .filter(
      (group) => options.session == null || group.session === options.session,
    )
    .map((group) => {
      if (!normalizedSearch) {
        return group;
      }

      const courses = group.courses.filter((course) =>
        `${course.courseCode} ${course.courseTitle}`
          .toLowerCase()
          .includes(normalizedSearch),
      );

      return {
        ...group,
        courses,
        matchedCourseCount: courses.length,
      };
    })
    .filter((group) => group.courses.length > 0);
}
