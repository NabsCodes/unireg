export type DepartmentRow = {
  id: string;
  name: string;
  faculty: string;
  headOfDepartment: string;
  studentCount: number;
};

export type StudentRow = {
  id: string;
  matricNo: string;
  name: string;
  email: string;
  department: string;
  level: string;
  status: "active" | "graduated" | "suspended";
};

export type LecturerRow = {
  id: string;
  staffNo: string;
  name: string;
  email: string;
  title: string;
  department: string;
};

export type CourseRow = {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
  level: string;
  department: string;
};

export type OfferingRow = {
  id: string;
  courseCode: string;
  courseTitle: string;
  session: string;
  semester: string;
  capacity: number;
  registered: number;
  status: "open" | "closed";
  lecturer: string;
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
};
