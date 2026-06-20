import type {
  AvailableOfferingRow,
  LecturerCourseRow,
  StudentResultRow,
} from "@/types/academic";

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
  staffNo: string;
  courseCode: string;
  matricNo: string;
  caScore: number;
  examScore: number;
};

export type RegisterCourseInput = {
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
    caScore: row.ca_score,
    examScore: row.exam_score,
    totalScore: row.total_score,
    grade: row.grade,
    gradePoint: row.grade_point,
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
  row: ApiAvailableCourseOffering,
  isRegistered: boolean,
): AvailableOfferingRow {
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
