import type { AvailableOfferingRow, StudentResultRow } from "@/types/academic";

export const studentProfile = {
  matricNo: "A00025332",
  name: "Batul Hassan",
  email: "batul.hassan@unireg.test",
  department: "Computer Science",
  level: "300",
  session: "2025/2026",
  semester: "First Semester",
  semesterGpa: "3.50",
  cgpa: "3.50",
  registeredCourses: 3,
} as const;

export const registeredCourses = [
  {
    id: "1",
    code: "CSC384",
    title: "Database Systems",
    creditUnits: 3,
    status: "Registered" as const,
  },
  {
    id: "2",
    code: "CSC302",
    title: "Operating Systems",
    creditUnits: 3,
    status: "Registered" as const,
  },
  {
    id: "3",
    code: "MTH201",
    title: "Numerical Methods",
    creditUnits: 2,
    status: "Registered" as const,
  },
];

export const availableOfferings: AvailableOfferingRow[] = [
  {
    id: "1",
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    creditUnits: 3,
    semester: "First Semester",
    capacity: 80,
    registered: 2,
    status: "open",
    isRegistered: true,
  },
  {
    id: "2",
    courseCode: "CSC302",
    courseTitle: "Operating Systems",
    creditUnits: 3,
    semester: "First Semester",
    capacity: 70,
    registered: 2,
    status: "open",
    isRegistered: true,
  },
  {
    id: "3",
    courseCode: "MTH201",
    courseTitle: "Numerical Methods",
    creditUnits: 2,
    semester: "First Semester",
    capacity: 60,
    registered: 2,
    status: "open",
    isRegistered: true,
  },
  {
    id: "4",
    courseCode: "CSC305",
    courseTitle: "Software Engineering",
    creditUnits: 3,
    semester: "Second Semester",
    capacity: 75,
    registered: 0,
    status: "open",
    isRegistered: false,
  },
];

export const studentResults: StudentResultRow[] = [
  {
    id: "1",
    session: "2025/2026",
    semester: "First Semester",
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    creditUnits: 3,
    caScore: 36,
    examScore: 55,
    totalScore: 91,
    grade: "A",
    gradePoint: 4.0,
  },
  {
    id: "2",
    session: "2025/2026",
    semester: "First Semester",
    courseCode: "CSC302",
    courseTitle: "Operating Systems",
    creditUnits: 3,
    caScore: 32,
    examScore: 50,
    totalScore: 82,
    grade: "B",
    gradePoint: 3.0,
  },
  {
    id: "3",
    session: "2025/2026",
    semester: "First Semester",
    courseCode: "MTH201",
    courseTitle: "Numerical Methods",
    creditUnits: 2,
    caScore: null,
    examScore: null,
    totalScore: null,
    grade: null,
    gradePoint: null,
  },
];

export const transcriptSummary = {
  ...studentProfile,
  totalCreditUnits: 8,
  coursesPassed: 2,
  coursesInProgress: 1,
};
