import type {
  AuditLogRow,
  CourseRow,
  DepartmentRow,
  LecturerRow,
  OfferingRow,
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
    studentCount: 2,
  },
  {
    id: "2",
    name: "Software Engineering",
    faculty: "School of Information Technology and Computing",
    headOfDepartment: "Engr. Amina Yusuf",
    studentCount: 1,
  },
  {
    id: "3",
    name: "Information Systems",
    faculty: "School of Information Technology and Computing",
    headOfDepartment: "—",
    studentCount: 0,
  },
];

export const students: StudentRow[] = [
  {
    id: "1",
    matricNo: "A00025332",
    name: "Batul Hassan",
    email: "batul.hassan@unireg.test",
    department: "Computer Science",
    level: "300",
    status: "active",
  },
  {
    id: "2",
    matricNo: "A00024575",
    name: "Simtong Tongnan",
    email: "simtong.tongnan@unireg.test",
    department: "Computer Science",
    level: "300",
    status: "active",
  },
  {
    id: "3",
    matricNo: "A00024901",
    name: "Maryam Bello",
    email: "maryam.bello@unireg.test",
    department: "Software Engineering",
    level: "300",
    status: "active",
  },
];

export const lecturers: LecturerRow[] = [
  {
    id: "1",
    staffNo: "STF-CS-001",
    name: "Gabriel Ayem",
    email: "gabriel.ayem@unireg.test",
    title: "Dr.",
    department: "Computer Science",
  },
  {
    id: "2",
    staffNo: "STF-CS-002",
    name: "Musa Danjuma",
    email: "musa.danjuma@unireg.test",
    title: "Dr.",
    department: "Computer Science",
  },
  {
    id: "3",
    staffNo: "STF-SE-001",
    name: "Amina Yusuf",
    email: "amina.yusuf@unireg.test",
    title: "Engr.",
    department: "Software Engineering",
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
  },
  {
    id: "2",
    code: "CSC302",
    title: "Operating Systems",
    creditUnits: 3,
    level: "300",
    department: "Computer Science",
  },
  {
    id: "3",
    code: "CSC305",
    title: "Software Engineering",
    creditUnits: 3,
    level: "300",
    department: "Software Engineering",
  },
  {
    id: "4",
    code: "MTH201",
    title: "Numerical Methods",
    creditUnits: 2,
    level: "200",
    department: "Computer Science",
  },
];

export const courseOfferings: OfferingRow[] = [
  {
    id: "1",
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 80,
    registered: 2,
    status: "open",
    lecturer: "Dr. Gabriel Ayem",
  },
  {
    id: "2",
    courseCode: "CSC302",
    courseTitle: "Operating Systems",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 70,
    registered: 2,
    status: "open",
    lecturer: "Dr. Musa Danjuma",
  },
  {
    id: "3",
    courseCode: "MTH201",
    courseTitle: "Numerical Methods",
    session: "2025/2026",
    semester: "First Semester",
    capacity: 60,
    registered: 2,
    status: "open",
    lecturer: "Dr. Musa Danjuma",
  },
  {
    id: "4",
    courseCode: "CSC305",
    courseTitle: "Software Engineering",
    session: "2025/2026",
    semester: "Second Semester",
    capacity: 75,
    registered: 0,
    status: "open",
    lecturer: "Engr. Amina Yusuf",
  },
];

export const auditLogs: AuditLogRow[] = [
  {
    id: "1",
    timestamp: "2026-03-18 09:14",
    actor: "Dr. Gabriel Ayem",
    action: "Result upload",
    entity: "CSC384",
    detail: "Uploaded CA and exam scores for 2 registered students.",
  },
  {
    id: "2",
    timestamp: "2026-03-17 16:42",
    actor: "Batul Hassan",
    action: "Course registration",
    entity: "MTH201",
    detail: "Registered for Numerical Methods (First Semester).",
  },
  {
    id: "3",
    timestamp: "2026-03-17 11:05",
    actor: "Dr. Musa Danjuma",
    action: "Result upload",
    entity: "CSC302",
    detail: "Uploaded CA and exam scores for 2 registered students.",
  },
  {
    id: "4",
    timestamp: "2025-09-10 08:30",
    actor: "Batul Hassan",
    action: "Course registration",
    entity: "CSC384",
    detail: "Registered for Database Systems (First Semester).",
  },
  {
    id: "5",
    timestamp: "2025-09-10 08:32",
    actor: "Simtong Tongnan",
    action: "Course registration",
    entity: "CSC384",
    detail: "Registered for Database Systems (First Semester).",
  },
  {
    id: "6",
    timestamp: "2025-09-01 10:00",
    actor: "Administrator",
    action: "Offering opened",
    entity: "2025/2026 First Semester",
    detail: "Course offerings published for the current session.",
  },
];
