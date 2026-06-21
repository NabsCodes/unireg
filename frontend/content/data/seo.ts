import type { PageSeoEntry } from "@/lib/metadata";

export const pageSeo = {
  auth: {
    login: {
      title: "Sign in",
      description:
        "Sign in to UniReg as an administrator, lecturer, or student.",
      path: "/login",
    },
  },
  admin: {
    dashboard: {
      title: "Admin Dashboard",
      description:
        "Manage academic setup, course offerings, registrations, and result oversight.",
      path: "/admin/dashboard",
    },
    departments: {
      title: "Departments",
      description:
        "Create and maintain academic departments used across courses and student records.",
      path: "/admin/departments",
    },
    students: {
      title: "Students",
      description:
        "Manage student biodata, matric numbers, department, level, and academic status.",
      path: "/admin/students",
    },
    lecturers: {
      title: "Lecturers",
      description:
        "Manage lecturer profiles, staff numbers, and department assignments.",
      path: "/admin/lecturers",
    },
    courses: {
      title: "Courses",
      description:
        "Maintain course catalogue entries, credit units, and department ownership.",
      path: "/admin/courses",
    },
    offerings: {
      title: "Course Offerings",
      description:
        "Configure course offerings per session and semester, including capacity and lecturer assignment.",
      path: "/admin/offerings",
    },
    academic: {
      title: "Academic Setup",
      description:
        "Configure academic sessions and semesters used when publishing course offerings.",
      path: "/admin/academic",
    },
    auditLogs: {
      title: "Audit Logs",
      description:
        "Review audit entries for result changes, registration actions, and admin updates.",
      path: "/admin/audit-logs",
    },
    results: {
      title: "Result Oversight",
      description:
        "Review registered students and enter or correct CA and exam scores for any offering.",
      path: "/admin/results",
    },
    gradeScale: {
      title: "Grade Scale",
      description:
        "Read-only 4.0 grading table used when computing grades from total scores.",
      path: "/admin/grade-scale",
    },
  },
  lecturer: {
    dashboard: {
      title: "Lecturer Dashboard",
      description: "View assigned course offerings and upload student results.",
      path: "/lecturer/dashboard",
    },
    courses: {
      title: "Assigned Courses",
      description:
        "Review assigned course offerings, registered students, and upload status.",
      path: "/lecturer/courses",
    },
    results: {
      title: "Result Upload",
      description:
        "Upload CA and exam scores for registered students in assigned offerings.",
      path: "/lecturer/results",
    },
  },
  student: {
    dashboard: {
      title: "Student Dashboard",
      description:
        "Track registration, results, and transcript readiness for the current semester.",
      path: "/student/dashboard",
    },
    registration: {
      title: "Course Registration",
      description:
        "Browse open course offerings, register for the current semester, or drop courses without published results.",
      path: "/student/registration",
    },
    results: {
      title: "Results",
      description: "View semester results, grades, and grade-point summaries.",
      path: "/student/results",
    },
    transcript: {
      title: "Transcript",
      description:
        "Generate and review an academic transcript with cumulative GPA summary.",
      path: "/student/transcript",
    },
  },
} as const satisfies Record<
  string,
  Record<string, PageSeoEntry> | PageSeoEntry
>;
