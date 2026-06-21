import type {
  AuditLogRow,
  AvailableOfferingRow,
  CourseRow,
  DepartmentRow,
  GradeScaleRow,
  LecturerCourseRow,
  LecturerRow,
  OfferingRow,
  ResultUploadRow,
  StudentResultRow,
  StudentRow,
} from "@/types/academic";
import { toNumberOrNull } from "@/lib/format/academic";

export type ApiAuthUser = {
  user_id: number;
  email: string;
  role: string;
  student_id: number | null;
  lecturer_id: number | null;
  matric_no: string | null;
  staff_no: string | null;
  name: string | null;
};

export type ApiLoginResponse = {
  access_token: string;
  token_type: string;
  user: ApiAuthUser;
};

export type ApiDashboardSummary = {
  active_students: number;
  lecturers: number;
  departments: number;
  courses: number;
  active_registrations: number;
  uploaded_results: number;
  current_session: string | null;
};

export type ApiAvailableCourseOffering = {
  offering_id: number;
  course_code: string;
  course_title: string;
  credit_units: number;
  semester_name: string;
  session_name: string;
  max_capacity: number;
  status: string;
  registered_students: number;
};

export type ApiStudentAvailableCourseOffering = ApiAvailableCourseOffering & {
  is_registered: boolean;
  registration_status: string | null;
};

export type ApiStudentResultRow = {
  matric_no: string;
  student_name: string;
  dept_name: string;
  session_name: string;
  semester_name: string;
  course_code: string;
  course_title: string;
  credit_units: number;
  ca_score: number | null;
  exam_score: number | null;
  total_score: number | null;
  grade: string | null;
  grade_point: number | null;
  semester_gpa: number | null;
  cgpa: number | null;
};

export type ApiLecturerCourseRow = {
  staff_no: string;
  lecturer_name: string;
  course_code: string;
  course_title: string;
  semester_name: string;
  session_name: string;
  registered_students: number;
  results_uploaded: number;
};

export type ApiLecturerResultRosterRow = {
  reg_id: number;
  matric_no: string;
  student_name: string;
  course_code: string;
  course_title: string;
  ca_score: number | null;
  exam_score: number | null;
  total_score: number | null;
  grade: string | null;
  grade_point: number | null;
  status: string;
};

export type ApiDepartmentRow = {
  dept_id: number;
  dept_name: string;
  faculty: string;
  hod_id: number | null;
  hod_name: string | null;
};

export type ApiStudentRow = {
  student_id: number;
  matric_no: string;
  first_name: string;
  last_name: string;
  email: string;
  level: string;
  dept_id: number;
  dept_name: string;
  status: string;
};

export type ApiLecturerRow = {
  lecturer_id: number;
  staff_no: string;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  dept_id: number;
  dept_name: string;
};

export type ApiCourseRow = {
  course_id: number;
  course_code: string;
  course_title: string;
  credit_units: number;
  level: string;
  dept_id: number;
  dept_name: string;
};

export type ApiOfferingRow = {
  offering_id: number;
  course_id: number;
  course_code: string;
  course_title: string;
  semester_id: number;
  semester_name: string;
  session_name: string;
  max_capacity: number;
  status: string;
  registered_students: number;
  lecturers: string[];
};

export type ApiAuditLogRow = {
  log_id: number;
  user_id: number | null;
  action: string;
  table_name: string;
  record_id: number;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  created_at: string;
  actor_name?: string | null;
};

export type DashboardActivityItem = {
  id: string;
  text: string;
  time: string;
};

export type ApiGradeScaleRow = {
  grade: string;
  min_score: number;
  max_score: number;
  grade_point: number;
  remark: string;
};

export type DashboardSummary = {
  activeStudents: number;
  lecturers: number;
  departments: number;
  courses: number;
  activeRegistrations: number;
  uploadedResults: number;
  currentSession: string | null;
};

export type UploadResultInput = {
  regId: number;
  caScore: number;
  examScore: number;
  staffNo?: string;
  courseCode?: string;
};

export type RegisterCourseInput = {
  matricNo: string;
  offeringId: number;
};

export type DropCourseInput = {
  matricNo: string;
  offeringId: number;
};

export function mapDashboardSummary(
  summary: ApiDashboardSummary,
): DashboardSummary {
  return {
    activeStudents: summary.active_students,
    lecturers: summary.lecturers,
    departments: summary.departments,
    courses: summary.courses,
    activeRegistrations: summary.active_registrations,
    uploadedResults: summary.uploaded_results,
    currentSession: summary.current_session,
  };
}

export function mapStudentResultRow(
  row: ApiStudentResultRow,
  index: number,
): StudentResultRow {
  return {
    id: String(index + 1),
    session: row.session_name,
    semester: row.semester_name,
    courseCode: row.course_code,
    courseTitle: row.course_title,
    creditUnits: row.credit_units,
    caScore: toNumberOrNull(row.ca_score),
    examScore: toNumberOrNull(row.exam_score),
    totalScore: toNumberOrNull(row.total_score),
    grade: row.grade,
    gradePoint: toNumberOrNull(row.grade_point),
  };
}

export function mapLecturerCourseRow(
  row: ApiLecturerCourseRow,
  index: number,
): LecturerCourseRow {
  return {
    id: String(index + 1),
    courseCode: row.course_code,
    courseTitle: row.course_title,
    session: row.session_name,
    semester: row.semester_name,
    registeredStudents: row.registered_students,
    resultsUploaded: row.results_uploaded,
  };
}

export function mapAvailableOfferingRow(
  row: ApiAvailableCourseOffering | ApiStudentAvailableCourseOffering,
  isRegisteredOverride?: boolean,
): AvailableOfferingRow {
  const isRegistered =
    isRegisteredOverride ??
    ("is_registered" in row ? row.is_registered : false);

  return {
    id: String(row.offering_id),
    courseCode: row.course_code,
    courseTitle: row.course_title,
    creditUnits: row.credit_units,
    semester: row.semester_name,
    capacity: row.max_capacity,
    registered: row.registered_students,
    status: row.status === "open" ? "open" : "closed",
    isRegistered,
  };
}

export function mapResultRosterRow(
  row: ApiLecturerResultRosterRow,
  index: number,
): ResultUploadRow {
  const hasScores = row.ca_score !== null && row.exam_score !== null;

  return {
    id: String(index + 1),
    regId: row.reg_id,
    matricNo: row.matric_no,
    studentName: row.student_name,
    caScore: toNumberOrNull(row.ca_score),
    examScore: toNumberOrNull(row.exam_score),
    totalScore: toNumberOrNull(row.total_score),
    grade: row.grade,
    status: hasScores ? "Uploaded" : "Pending",
  };
}

export function mapDepartmentRow(
  row: ApiDepartmentRow,
  _index: number,
): DepartmentRow {
  return {
    id: String(row.dept_id),
    name: row.dept_name,
    faculty: row.faculty,
    headOfDepartment: row.hod_name ?? "—",
    studentCount: 0,
  };
}

export function mapAdminStudentRow(
  row: ApiStudentRow,
  _index: number,
): StudentRow {
  return {
    id: String(row.student_id),
    matricNo: row.matric_no,
    name: `${row.first_name} ${row.last_name}`,
    email: row.email,
    department: row.dept_name,
    level: row.level,
    status: row.status as StudentRow["status"],
  };
}

export function mapAdminLecturerRow(
  row: ApiLecturerRow,
  _index: number,
): LecturerRow {
  return {
    id: String(row.lecturer_id),
    staffNo: row.staff_no,
    name: `${row.first_name} ${row.last_name}`,
    email: row.email,
    title: row.title,
    department: row.dept_name,
  };
}

export function mapAdminCourseRow(row: ApiCourseRow, _index: number): CourseRow {
  return {
    id: String(row.course_id),
    code: row.course_code,
    title: row.course_title,
    creditUnits: row.credit_units,
    level: row.level,
    department: row.dept_name,
  };
}

export function mapOfferingRow(row: ApiOfferingRow, _index: number): OfferingRow {
  return {
    id: String(row.offering_id),
    courseCode: row.course_code,
    courseTitle: row.course_title,
    session: row.session_name,
    semester: row.semester_name,
    capacity: row.max_capacity,
    registered: row.registered_students,
    status: row.status === "open" ? "open" : "closed",
    lecturer: row.lecturers.join(", ") || "—",
  };
}

function formatAuditTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function mapAuditLogRow(row: ApiAuditLogRow, index: number): AuditLogRow {
  const detailSource = row.new_values ?? row.old_values;
  const detail =
    detailSource && Object.keys(detailSource).length > 0
      ? JSON.stringify(detailSource)
      : `${row.action} on ${row.table_name} #${row.record_id}`;

  return {
    id: String(row.log_id ?? index + 1),
    timestamp: formatAuditTimestamp(row.created_at),
    actor: row.actor_name ?? (row.user_id ? `User #${row.user_id}` : "System"),
    action: row.action.replace(/_/g, " "),
    entity: row.table_name,
    detail,
  };
}

function humanizeAuditAction(row: ApiAuditLogRow): string {
  const actor = row.actor_name ?? (row.user_id ? `User #${row.user_id}` : "System");
  const action = row.action.toUpperCase();

  if (action === "RESULT_INSERTED") {
    return `${actor} uploaded a result record.`;
  }

  if (action === "RESULT_UPDATED") {
    return `${actor} updated a result record.`;
  }

  return `${actor} performed ${row.action.replace(/_/g, " ").toLowerCase()} on ${row.table_name}.`;
}

export function mapDashboardActivityItem(
  row: ApiAuditLogRow,
  index: number,
): DashboardActivityItem {
  return {
    id: String(row.log_id ?? index + 1),
    text: humanizeAuditAction(row),
    time: formatAuditTimestamp(row.created_at),
  };
}

export function mapGradeScaleRow(
  row: ApiGradeScaleRow,
  index: number,
): GradeScaleRow {
  return {
    id: String(index + 1),
    grade: row.grade,
    minScore: toNumberOrNull(row.min_score) ?? 0,
    maxScore: toNumberOrNull(row.max_score) ?? 0,
    gradePoint: toNumberOrNull(row.grade_point) ?? 0,
    remark: row.remark,
  };
}
