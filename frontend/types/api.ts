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
  StudentDashboardSummary,
  SessionRow,
  SemesterRow,
  StudentRow,
} from "@/types/academic";
import {
  formatAuditActionLabel,
  formatAuditSearchText,
  formatAuditSummary,
} from "@/lib/format/audit";
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
  level: string | null;
  department: string | null;
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
  has_results: boolean;
  can_drop: boolean;
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

export type ApiStudentDashboardRegisteredCourse = {
  reg_id: number;
  offering_id: number;
  course_code: string;
  course_title: string;
  credit_units: number;
  status: string;
  semester_name: string;
};

export type ApiStudentDashboardSummary = {
  matric_no: string;
  student_name: string;
  email: string;
  level: string;
  dept_name: string;
  session_name: string;
  semester_name: string | null;
  registered_count: number;
  semester_gpa: number | null;
  cgpa: number | null;
  registered_courses: ApiStudentDashboardRegisteredCourse[];
};

export type ApiLecturerCourseRow = {
  offering_id: number;
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
  student_count: number;
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
  lecturer_ids?: number[];
};

export type ApiSessionRow = {
  session_id: number;
  session_name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
};

export type ApiSemesterRow = {
  semester_id: number;
  session_id: number;
  session_name: string;
  semester_name: string;
  start_date: string;
  end_date: string;
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
  student_name?: string | null;
  matric_no?: string | null;
  course_code?: string | null;
  course_title?: string | null;
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

export function mapStudentDashboard(
  summary: ApiStudentDashboardSummary,
): StudentDashboardSummary {
  return {
    matricNo: summary.matric_no,
    name: summary.student_name,
    email: summary.email,
    level: summary.level,
    department: summary.dept_name,
    session: summary.session_name,
    semester: summary.semester_name,
    registeredCount: summary.registered_count,
    semesterGpa: toNumberOrNull(summary.semester_gpa),
    cgpa: toNumberOrNull(summary.cgpa),
    registeredCourses: summary.registered_courses.map((course, index) => ({
      id: String(course.reg_id ?? index + 1),
      offeringId: course.offering_id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      creditUnits: course.credit_units,
      status: course.status,
      semester: course.semester_name,
    })),
  };
}

export function mapStudentResultRow(
  row: ApiStudentResultRow,
  index: number,
): StudentResultRow {
  return {
    id: String(index + 1),
    matricNo: row.matric_no,
    studentName: row.student_name,
    department: row.dept_name,
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
    semesterGpa: toNumberOrNull(row.semester_gpa),
    cgpa: toNumberOrNull(row.cgpa),
  };
}

export function mapLecturerCourseRow(
  row: ApiLecturerCourseRow,
  index: number,
): LecturerCourseRow {
  return {
    id: String(index + 1),
    offeringId: row.offering_id,
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
  const isStudentRow = "is_registered" in row;
  const isRegistered =
    isRegisteredOverride ?? (isStudentRow ? row.is_registered : false);
  const hasResults = isStudentRow ? row.has_results : false;
  const canDrop = isStudentRow ? row.can_drop : false;

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
    registrationStatus: isStudentRow ? row.registration_status : null,
    hasResults,
    canDrop,
  };
}

export function mapResultRosterRow(
  row: ApiLecturerResultRosterRow,
  index: number,
): ResultUploadRow {
  return {
    id: String(index + 1),
    regId: row.reg_id,
    matricNo: row.matric_no,
    studentName: row.student_name,
    caScore: toNumberOrNull(row.ca_score),
    examScore: toNumberOrNull(row.exam_score),
    totalScore: toNumberOrNull(row.total_score),
    grade: row.grade,
    status: row.status === "Uploaded" ? "Uploaded" : "Pending",
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
    hodId: row.hod_id,
    studentCount: row.student_count,
  };
}

export function mapAdminStudentRow(
  row: ApiStudentRow,
  _index: number,
): StudentRow {
  return {
    id: String(row.student_id),
    matricNo: row.matric_no,
    firstName: row.first_name,
    lastName: row.last_name,
    name: `${row.first_name} ${row.last_name}`,
    email: row.email,
    department: row.dept_name,
    departmentId: row.dept_id,
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
    firstName: row.first_name,
    lastName: row.last_name,
    name: `${row.first_name} ${row.last_name}`,
    email: row.email,
    title: row.title,
    department: row.dept_name,
    departmentId: row.dept_id,
  };
}

export function mapAdminCourseRow(
  row: ApiCourseRow,
  _index: number,
): CourseRow {
  return {
    id: String(row.course_id),
    code: row.course_code,
    title: row.course_title,
    creditUnits: row.credit_units,
    level: row.level,
    department: row.dept_name,
    departmentId: row.dept_id,
  };
}

export function mapSessionRow(row: ApiSessionRow, index: number): SessionRow {
  return {
    id: String(row.session_id ?? index + 1),
    name: row.session_name,
    startDate: row.start_date,
    endDate: row.end_date,
    isCurrent: row.is_current,
  };
}

export function mapSemesterRow(
  row: ApiSemesterRow,
  index: number,
): SemesterRow {
  return {
    id: String(row.semester_id ?? index + 1),
    sessionId: row.session_id,
    sessionName: row.session_name,
    name: row.semester_name,
    startDate: row.start_date,
    endDate: row.end_date,
  };
}

export function mapOfferingRow(
  row: ApiOfferingRow,
  _index: number,
): OfferingRow {
  const status =
    row.status === "open"
      ? "open"
      : row.status === "archived"
        ? "archived"
        : "closed";

  return {
    id: String(row.offering_id),
    courseId: row.course_id,
    semesterId: row.semester_id,
    courseCode: row.course_code,
    courseTitle: row.course_title,
    session: row.session_name,
    semester: row.semester_name,
    capacity: row.max_capacity,
    registered: row.registered_students,
    status,
    lecturer: row.lecturers.join(", ") || "—",
    lecturerIds: row.lecturer_ids ?? [],
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

export function mapAuditLogRow(
  row: ApiAuditLogRow,
  index: number,
): AuditLogRow {
  return {
    id: String(row.log_id ?? index + 1),
    timestamp: formatAuditTimestamp(row.created_at),
    actor: row.actor_name ?? (row.user_id ? `User #${row.user_id}` : "System"),
    action: formatAuditActionLabel(row.action),
    summary: formatAuditSummary(row),
    searchText: formatAuditSearchText(row),
  };
}

function humanizeAuditAction(row: ApiAuditLogRow): string {
  const actor =
    row.actor_name ?? (row.user_id ? `User #${row.user_id}` : "System");

  if (row.action.toUpperCase() === "RESULT_INSERTED") {
    const summary = formatAuditSummary(row);
    return `${actor} uploaded result scores — ${summary}`;
  }

  if (row.action.toUpperCase() === "RESULT_UPDATED") {
    const summary = formatAuditSummary(row);
    return `${actor} corrected result scores — ${summary}`;
  }

  return `${actor} ${formatAuditActionLabel(row.action).toLowerCase()} on ${row.table_name.replace(/_/g, " ")}.`;
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
