import type {
  AuditLogRow,
  CourseRow,
  DepartmentRow,
  GradeScaleRow,
  LecturerRow,
  OfferingRow,
  SemesterRow,
  SessionRow,
  StudentRow,
} from "@/types/academic";

export const adminDashboardSummary = {
  activeStudents: 3,
  lecturers: 3,
  departments: 3,
  courses: 4,
  activeRegistrations: 6,
  uploadedResults: 4,
  currentSession: "2025/2026",
} as const;

export const adminRecentActivity = [
  {
    id: "1",
    text: "Dr. Gabriel Ayem uploaded results for CSC384 Database Systems.",
    time: "Today, 09:14",
  },
  {
    id: "2",
    text: "Batul Hassan (A00025332) registered for MTH201 Numerical Methods.",
    time: "Yesterday, 16:42",
  },
  {
    id: "3",
    text: "Dr. Musa Danjuma uploaded results for CSC302 Operating Systems.",
    time: "Yesterday, 11:05",
  },
  {
    id: "4",
    text: "First Semester offerings opened for 2025/2026 session.",
    time: "Sep 1, 2025",
  },
] as const;

export const departments: DepartmentRow[] = [
  {
    id: "1",
    name: "Computer Science",
    faculty: "School of Information Technology and Computing",
    headOfDepartment: "Dr. Gabriel Ayem",
    hodId: 1,
    studentCount: 2,
  },
  {
    id: "2",
    name: "Software Engineering",
    faculty: "School of Information Technology and Computing",
    headOfDepartment: "Engr. Amina Yusuf",
    hodId: 3,
    studentCount: 1,
  },
  {
    id: "3",
    name: "Information Systems",
    faculty: "School of Information Technology and Computing",
    headOfDepartment: "—",
    hodId: null,
    studentCount: 0,
  },
];

export const sessions: SessionRow[] = [
  {
    id: "1",
    name: "2025/2026",
    startDate: "2025-09-01",
    endDate: "2026-08-31",
    isCurrent: true,
  },
];

export const semesters: SemesterRow[] = [
  {
    id: "1",
    sessionId: 1,
    sessionName: "2025/2026",
    name: "First Semester",
    startDate: "2025-09-01",
    endDate: "2026-01-15",
  },
  {
    id: "2",
    sessionId: 1,
    sessionName: "2025/2026",
    name: "Second Semester",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
  },
];

export const students: StudentRow[] = [
  {
    id: "1",
    matricNo: "A00025332",
    firstName: "Batul",
    lastName: "Hassan",
    name: "Batul Hassan",
    email: "batul.hassan@unireg.test",
    department: "Computer Science",
    departmentId: 1,
    level: "300",
    status: "active",
  },
  {
    id: "2",
    matricNo: "A00024575",
    firstName: "Simtong",
    lastName: "Tongnan",
    name: "Simtong Tongnan",
    email: "simtong.tongnan@unireg.test",
    department: "Computer Science",
    departmentId: 1,
    level: "300",
    status: "active",
  },
  {
    id: "3",
    matricNo: "A00024901",
    firstName: "Maryam",
    lastName: "Bello",
    name: "Maryam Bello",
    email: "maryam.bello@unireg.test",
    department: "Software Engineering",
    departmentId: 2,
    level: "300",
    status: "active",
  },
];

export const lecturers: LecturerRow[] = [
  {
    id: "1",
    staffNo: "STF-CS-001",
    firstName: "Gabriel",
    lastName: "Ayem",
    name: "Gabriel Ayem",
    email: "gabriel.ayem@unireg.test",
    title: "Dr.",
    department: "Computer Science",
    departmentId: 1,
  },
  {
    id: "2",
    staffNo: "STF-CS-002",
    firstName: "Musa",
    lastName: "Danjuma",
    name: "Musa Danjuma",
    email: "musa.danjuma@unireg.test",
    title: "Dr.",
    department: "Computer Science",
    departmentId: 1,
  },
  {
    id: "3",
    staffNo: "STF-SE-001",
    firstName: "Amina",
    lastName: "Yusuf",
    name: "Amina Yusuf",
    email: "amina.yusuf@unireg.test",
    title: "Engr.",
    department: "Software Engineering",
    departmentId: 2,
  },
];

export const courses: CourseRow[] = [
  {
    id: "1",
    code: "CSC384",
    title: "Database Systems",
    creditUnits: 3,
    level: "300",
    department: "Computer Science",
    departmentId: 1,
  },
  {
    id: "2",
    code: "CSC302",
    title: "Operating Systems",
    creditUnits: 3,
    level: "300",
    department: "Computer Science",
    departmentId: 1,
  },
  {
    id: "3",
    code: "CSC305",
    title: "Software Engineering",
    creditUnits: 3,
    level: "300",
    department: "Software Engineering",
    departmentId: 2,
  },
  {
    id: "4",
    code: "MTH201",
    title: "Numerical Methods",
    creditUnits: 2,
    level: "200",
    department: "Computer Science",
    departmentId: 1,
  },
];

export const courseOfferings: OfferingRow[] = [
  {
    id: "1",
    courseId: 1,
    semesterId: 1,
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 80,
    registered: 2,
    status: "open",
    lecturer: "Dr. Gabriel Ayem",
    lecturerIds: [1],
  },
  {
    id: "2",
    courseId: 2,
    semesterId: 1,
    courseCode: "CSC302",
    courseTitle: "Operating Systems",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 70,
    registered: 2,
    status: "open",
    lecturer: "Dr. Musa Danjuma",
    lecturerIds: [2],
  },
  {
    id: "3",
    courseId: 4,
    semesterId: 1,
    courseCode: "MTH201",
    courseTitle: "Numerical Methods",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 60,
    registered: 2,
    status: "open",
    lecturer: "Dr. Musa Danjuma",
    lecturerIds: [2],
  },
  {
    id: "4",
    courseId: 3,
    semesterId: 2,
    courseCode: "CSC305",
    courseTitle: "Software Engineering",
    session: "2025/2026",
    semester: "Second Semester",
    capacity: 75,
    registered: 0,
    status: "open",
    lecturer: "Engr. Amina Yusuf",
    lecturerIds: [3],
  },
];

export const auditLogs: AuditLogRow[] = [
  {
    id: "1",
    timestamp: "2026-03-18 09:14",
    actor: "Dr. Gabriel Ayem",
    action: "Result uploaded",
    summary:
      "Batul Hassan (A00025332) · CSC384 · Database Systems — CA 36, Exam 55 · Total 91 · Grade A",
    searchText:
      "Dr. Gabriel Ayem Result uploaded Batul Hassan A00025332 CSC384 Database Systems",
  },
  {
    id: "2",
    timestamp: "2026-03-17 16:42",
    actor: "Dr. Musa Danjuma",
    action: "Result uploaded",
    summary:
      "Simtong Tongnan (A00024575) · CSC302 · Operating Systems — CA 32, Exam 50 · Total 82 · Grade B",
    searchText:
      "Dr. Musa Danjuma Result uploaded Simtong Tongnan A00024575 CSC302 Operating Systems",
  },
  {
    id: "3",
    timestamp: "2026-03-17 11:05",
    actor: "Registry Administrator",
    action: "Result updated",
    summary:
      "Batul Hassan (A00025332) · CSC384 · Database Systems — CA 36 → 38, Exam 55 → 58, Grade A → A",
    searchText:
      "Registry Administrator Result updated Batul Hassan A00025332 CSC384 Database Systems",
  },
  {
    id: "4",
    timestamp: "2025-09-10 08:30",
    actor: "Dr. Gabriel Ayem",
    action: "Result uploaded",
    summary:
      "Maryam Bello (A00024901) · CSC384 · Database Systems — CA 34, Exam 48 · Total 82 · Grade B",
    searchText:
      "Dr. Gabriel Ayem Result uploaded Maryam Bello A00024901 CSC384 Database Systems",
  },
];

export const gradeScale: GradeScaleRow[] = [
  {
    id: "1",
    grade: "A",
    minScore: 93,
    maxScore: 100,
    gradePoint: 4.0,
    remark: "Excellent",
  },
  {
    id: "2",
    grade: "A-",
    minScore: 90,
    maxScore: 92.99,
    gradePoint: 3.7,
    remark: "Excellent",
  },
  {
    id: "3",
    grade: "B+",
    minScore: 87,
    maxScore: 89.99,
    gradePoint: 3.3,
    remark: "Very Good",
  },
  {
    id: "4",
    grade: "B",
    minScore: 83,
    maxScore: 86.99,
    gradePoint: 3.0,
    remark: "Very Good",
  },
  {
    id: "5",
    grade: "B-",
    minScore: 80,
    maxScore: 82.99,
    gradePoint: 2.7,
    remark: "Good",
  },
  {
    id: "6",
    grade: "C+",
    minScore: 77,
    maxScore: 79.99,
    gradePoint: 2.3,
    remark: "Good",
  },
  {
    id: "7",
    grade: "C",
    minScore: 73,
    maxScore: 76.99,
    gradePoint: 2.0,
    remark: "Satisfactory",
  },
  {
    id: "8",
    grade: "C-",
    minScore: 70,
    maxScore: 72.99,
    gradePoint: 1.7,
    remark: "Pass",
  },
  {
    id: "9",
    grade: "D",
    minScore: 60,
    maxScore: 69.99,
    gradePoint: 1.0,
    remark: "Poor",
  },
  {
    id: "10",
    grade: "F",
    minScore: 0,
    maxScore: 59.99,
    gradePoint: 0.0,
    remark: "Fail",
  },
];
