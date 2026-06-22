import type { ApiAuditLogRow } from "@/types/api";

function readScore(value: unknown): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return String(value);
}

function formatStudentCourseLabel(row: ApiAuditLogRow): string | null {
  const student =
    row.student_name && row.matric_no
      ? `${row.student_name} (${row.matric_no})`
      : (row.student_name ?? null);
  const course =
    row.course_code && row.course_title
      ? `${row.course_code} · ${row.course_title}`
      : (row.course_code ?? null);

  if (student && course) {
    return `${student} · ${course}`;
  }

  return student ?? course;
}

function formatScoreLine(
  values: Record<string, unknown> | null,
): string | null {
  if (!values) {
    return null;
  }

  const ca = readScore(values.ca_score);
  const exam = readScore(values.exam_score);
  const total = readScore(values.total_score);
  const grade = readScore(values.grade);

  const parts: string[] = [];
  if (ca !== null && exam !== null) {
    parts.push(`CA ${ca}, Exam ${exam}`);
  }
  if (total !== null) {
    parts.push(`Total ${total}`);
  }
  if (grade !== null) {
    parts.push(`Grade ${grade}`);
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

function formatScoreChange(
  oldValues: Record<string, unknown> | null,
  newValues: Record<string, unknown> | null,
): string | null {
  if (!newValues) {
    return null;
  }

  const oldCa = readScore(oldValues?.ca_score);
  const newCa = readScore(newValues.ca_score);
  const oldExam = readScore(oldValues?.exam_score);
  const newExam = readScore(newValues.exam_score);
  const oldGrade = readScore(oldValues?.grade);
  const newGrade = readScore(newValues.grade);

  const parts: string[] = [];

  if (oldCa !== null && newCa !== null && oldCa !== newCa) {
    parts.push(`CA ${oldCa} → ${newCa}`);
  } else if (newCa !== null) {
    parts.push(`CA ${newCa}`);
  }

  if (oldExam !== null && newExam !== null && oldExam !== newExam) {
    parts.push(`Exam ${oldExam} → ${newExam}`);
  } else if (newExam !== null) {
    parts.push(`Exam ${newExam}`);
  }

  if (oldGrade !== null && newGrade !== null && oldGrade !== newGrade) {
    parts.push(`Grade ${oldGrade} → ${newGrade}`);
  } else if (newGrade !== null) {
    parts.push(`Grade ${newGrade}`);
  }

  return parts.length > 0 ? parts.join(" · ") : formatScoreLine(newValues);
}

export function formatAuditActionLabel(action: string): string {
  switch (action.toUpperCase()) {
    case "RESULT_INSERTED":
      return "Result uploaded";
    case "RESULT_UPDATED":
      return "Result updated";
    default:
      return action
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export function formatAuditSummary(row: ApiAuditLogRow): string {
  const action = row.action.toUpperCase();
  const subject = formatStudentCourseLabel(row);

  if (action === "RESULT_INSERTED") {
    const scores = formatScoreLine(row.new_values);
    if (subject && scores) {
      return `${subject} — ${scores}`;
    }
    if (subject) {
      return `${subject} — scores uploaded`;
    }
    return scores ?? "Result scores uploaded";
  }

  if (action === "RESULT_UPDATED") {
    const change = formatScoreChange(row.old_values, row.new_values);
    if (subject && change) {
      return `${subject} — ${change}`;
    }
    if (subject) {
      return `${subject} — scores updated`;
    }
    return change ?? "Result scores updated";
  }

  const entity = row.table_name.replace(/_/g, " ");
  return `${formatAuditActionLabel(row.action)} on ${entity} #${row.record_id}`;
}

export function formatAuditSearchText(row: ApiAuditLogRow): string {
  return [
    row.actor_name,
    formatAuditActionLabel(row.action),
    row.student_name,
    row.matric_no,
    row.course_code,
    row.course_title,
    formatAuditSummary(row),
  ]
    .filter(Boolean)
    .join(" ");
}
