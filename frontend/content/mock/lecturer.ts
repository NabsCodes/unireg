import type { LecturerCourseRow, ResultUploadRow } from "@/types/academic";

export const lecturerProfile = {
  staffNo: "STF-CS-001",
  name: "Dr. Gabriel Ayem",
  email: "gabriel.ayem@unireg.test",
  department: "Computer Science",
} as const;

export const lecturerAssignedCourses: LecturerCourseRow[] = [
  {
    id: "1",
    offeringId: 1,
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    session: "2025/2026",
    semester: "First Semester",
    registeredStudents: 3,
    resultsUploaded: 2,
  },
];

export const musaAssignedCourses: LecturerCourseRow[] = [
  {
    id: "1",
    offeringId: 2,
    courseCode: "CSC302",
    courseTitle: "Operating Systems",
    session: "2025/2026",
    semester: "First Semester",
    registeredStudents: 2,
    resultsUploaded: 2,
  },
  {
    id: "2",
    offeringId: 3,
    courseCode: "MTH201",
    courseTitle: "Numerical Methods",
    session: "2025/2026",
    semester: "First Semester",
    registeredStudents: 2,
    resultsUploaded: 0,
  },
];

export const mth201ResultUploads: ResultUploadRow[] = [
  {
    id: "1",
    regId: 5,
    matricNo: "A00025332",
    studentName: "Batul Hassan",
    caScore: null,
    examScore: null,
    totalScore: null,
    grade: null,
    status: "Pending",
  },
  {
    id: "2",
    regId: 6,
    matricNo: "A00024575",
    studentName: "Simtong Tongnan",
    caScore: null,
    examScore: null,
    totalScore: null,
    grade: null,
    status: "Pending",
  },
];

export const csc384ResultUploads: ResultUploadRow[] = [
  {
    id: "1",
    regId: 1,
    matricNo: "A00025332",
    studentName: "Batul Hassan",
    caScore: 36,
    examScore: 55,
    totalScore: 91,
    grade: "A",
    status: "Uploaded",
  },
  {
    id: "2",
    regId: 2,
    matricNo: "A00024575",
    studentName: "Simtong Tongnan",
    caScore: 34,
    examScore: 48,
    totalScore: 82,
    grade: "B",
    status: "Uploaded",
  },
  {
    id: "3",
    regId: 3,
    matricNo: "A00024901",
    studentName: "Maryam Bello",
    caScore: null,
    examScore: null,
    totalScore: null,
    grade: null,
    status: "Pending",
  },
];
