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
    courseCode: "CSC384",
    courseTitle: "Database Systems",
    session: "2025/2026",
    semester: "First Semester",
    registeredStudents: 2,
    resultsUploaded: 2,
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
];
