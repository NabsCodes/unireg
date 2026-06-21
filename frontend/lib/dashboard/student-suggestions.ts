import { BookOpen, ClipboardList, ScrollText } from "lucide-react";

import type { DashboardSuggestion } from "@/components/shared/dashboard-suggestions";
import { formatGradePoint } from "@/lib/format/academic";
import type { StudentDashboardSummary } from "@/types/academic";

function academicPeriodLabel(session: string, semester: string | null): string {
  return semester ? `${session} · ${semester}` : session;
}

export function buildStudentDashboardSuggestions(
  data: StudentDashboardSummary,
): DashboardSuggestion[] {
  const suggestions: DashboardSuggestion[] = [];
  const period = academicPeriodLabel(data.session, data.semester);

  if (data.registeredCount === 0) {
    suggestions.push({
      id: "register-first",
      title: "Register for courses",
      description: `Open offerings are available for ${period}. Start your registration to secure a seat.`,
      href: "/student/registration",
      icon: ClipboardList,
      tone: "action",
    });
  } else {
    suggestions.push({
      id: "manage-registration",
      title: "Manage course registration",
      description: `You have ${data.registeredCount} course${data.registeredCount === 1 ? "" : "s"} this semester. Add offerings or drop courses without published results.`,
      href: "/student/registration",
      icon: ClipboardList,
      tone: "action",
    });
  }

  if (data.registeredCount > 0 && data.semesterGpa == null) {
    suggestions.push({
      id: "pending-results",
      title: "Check pending results",
      description:
        "Some courses may not have published results yet. Open Results to see what is available.",
      href: "/student/results",
      icon: BookOpen,
      tone: "warning",
    });
  } else if (data.semesterGpa != null) {
    suggestions.push({
      id: "view-results",
      title: "View semester results",
      description: `Your ${data.semester ?? "semester"} GPA is ${formatGradePoint(data.semesterGpa)}. Review CA, exam, and grade breakdowns.`,
      href: "/student/results",
      icon: BookOpen,
      tone: "success",
    });
  }

  if (data.cgpa != null) {
    suggestions.push({
      id: "preview-transcript",
      title: "Preview transcript",
      description: `Cumulative GPA ${formatGradePoint(data.cgpa)}. Open your transcript for a full academic record.`,
      href: "/student/transcript",
      icon: ScrollText,
    });
  }

  return suggestions.slice(0, 4);
}
