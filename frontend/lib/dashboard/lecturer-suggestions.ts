import { BookOpen, CheckCircle2, ClipboardList, Upload } from "lucide-react";

import type { DashboardSuggestion } from "@/components/shared/dashboard-suggestions";
import type { LecturerCourseRow } from "@/types/academic";

export function buildLecturerDashboardSuggestions(
  courses: LecturerCourseRow[],
): DashboardSuggestion[] {
  const suggestions: DashboardSuggestion[] = [];
  const pendingCourses = courses.filter(
    (course) => course.resultsUploaded < course.registeredStudents,
  );
  const completeCourses = courses.filter(
    (course) =>
      course.registeredStudents > 0 &&
      course.resultsUploaded >= course.registeredStudents,
  );

  if (courses.length === 0) {
    suggestions.push({
      id: "no-assignments",
      title: "No assigned courses yet",
      description:
        "You do not have any offerings for the current session. Contact the registry if assignments are missing.",
      href: "/lecturer/courses",
      icon: ClipboardList,
      tone: "warning",
    });
    return suggestions;
  }

  if (pendingCourses.length > 0) {
    const courseList = pendingCourses
      .map((course) => course.courseCode)
      .join(", ");
    const studentTotal = pendingCourses.reduce(
      (sum, course) =>
        sum + (course.registeredStudents - course.resultsUploaded),
      0,
    );

    suggestions.push({
      id: "upload-pending",
      title: "Upload pending results",
      description: `${pendingCourses.length} offering${pendingCourses.length === 1 ? "" : "s"} (${courseList}) still need scores for ${studentTotal} registered student${studentTotal === 1 ? "" : "s"}.`,
      href: "/lecturer/results",
      icon: Upload,
      tone: "action",
    });
  }

  if (completeCourses.length > 0 && pendingCourses.length === 0) {
    suggestions.push({
      id: "results-complete",
      title: "All results uploaded",
      description: `Scores are complete for ${completeCourses.length} assigned offering${completeCourses.length === 1 ? "" : "s"}. You can still review or update entries if needed.`,
      href: "/lecturer/results",
      icon: CheckCircle2,
      tone: "success",
    });
  }

  suggestions.push({
    id: "review-courses",
    title: "Review assigned courses",
    description: `See registered student counts and upload progress across your ${courses.length} assigned offering${courses.length === 1 ? "" : "s"}.`,
    href: "/lecturer/courses",
    icon: BookOpen,
  });

  return suggestions.slice(0, 3);
}
