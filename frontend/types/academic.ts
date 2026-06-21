export type DepartmentRow = {
  id: string;
  name: string;
  faculty: string;
  headOfDepartment: string;
  hodId: number | null;
  studentCount: number;
};

export type StudentRow = {
  id: string;
  matricNo: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  department: string;
  departmentId: number;
  level: string;
  status: "active" | "graduated" | "suspended";
};

export type LecturerRow = {
  id: string;
  staffNo: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  title: string;
  department: string;
  departmentId: number;
};

export type CourseRow = {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
  level: string;
  department: string;
  departmentId: number;
};

export type OfferingRow = {
  id: string;
  courseId: number;
  semesterId: number;
  courseCode: string;
  courseTitle: string;
  session: string;
  semester: string;
  capacity: number;
  registered: number;
  status: "open" | "closed" | "archived";
  lecturer: string;
  lecturerIds: number[];
};

export type SessionRow = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

export type SemesterRow = {
  id: string;
  sessionId: number;
  sessionName: string;
  name: string;
  startDate: string;
  endDate: string;
};

export type AuditLogRow = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  detail: string;
};

export type StudentResultRow = {
  id: string;
  session: string;
  semester: string;
  courseCode: string;
  courseTitle: string;
  creditUnits: number;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
  gradePoint: number | null;
};

export type LecturerCourseRow = {
  id: string;
  offeringId: number;
  courseCode: string;
  courseTitle: string;
  session: string;
  semester: string;
  registeredStudents: number;
  resultsUploaded: number;
};

export type ResultUploadRow = {
  id: string;
  regId: number;
  matricNo: string;
  studentName: string;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
  status: "Uploaded" | "Pending";
};

export type GradeScaleRow = {
  id: string;
  grade: string;
  minScore: number;
  maxScore: number;
  gradePoint: number;
  remark: string;
};

export type StudentDashboardRegisteredCourse = {
  id: string;
  offeringId: number;
  courseCode: string;
  courseTitle: string;
  creditUnits: number;
  status: string;
  semester: string;
};

export type StudentDashboardSummary = {
  matricNo: string;
  name: string;
  email: string;
  level: string;
  department: string;
  session: string;
  semester: string | null;
  registeredCount: number;
  semesterGpa: number | null;
  cgpa: number | null;
  registeredCourses: StudentDashboardRegisteredCourse[];
};

export type AvailableOfferingRow = {
  id: string;
  courseCode: string;
  courseTitle: string;
  creditUnits: number;
  semester: string;
  capacity: number;
  registered: number;
  status: "open" | "closed";
  isRegistered: boolean;
  registrationStatus: string | null;
  hasResults: boolean;
  canDrop: boolean;
};
