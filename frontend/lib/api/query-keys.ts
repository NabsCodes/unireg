export const queryKeys = {
  admin: {
    all: ["admin"] as const,
    dashboard: () => [...queryKeys.admin.all, "dashboard"] as const,
    departments: () => [...queryKeys.admin.all, "departments"] as const,
    students: () => [...queryKeys.admin.all, "students"] as const,
    lecturers: () => [...queryKeys.admin.all, "lecturers"] as const,
    courses: () => [...queryKeys.admin.all, "courses"] as const,
    offerings: () => [...queryKeys.admin.all, "offerings"] as const,
    auditLogs: () => [...queryKeys.admin.all, "audit-logs"] as const,
    recentActivity: () => [...queryKeys.admin.all, "recent-activity"] as const,
    results: (offeringId: number) =>
      [...queryKeys.admin.all, "results", offeringId] as const,
    gradeScale: () => [...queryKeys.admin.all, "grade-scale"] as const,
    sessions: () => [...queryKeys.admin.all, "sessions"] as const,
    semesters: () => [...queryKeys.admin.all, "semesters"] as const,
  },
  academic: {
    all: ["academic"] as const,
    offerings: () => [...queryKeys.academic.all, "offerings"] as const,
  },
  student: {
    all: ["student"] as const,
    root: (matricNo: string) => [...queryKeys.student.all, matricNo] as const,
    results: (matricNo: string) =>
      [...queryKeys.student.root(matricNo), "results"] as const,
    transcript: (matricNo: string) =>
      [...queryKeys.student.root(matricNo), "transcript"] as const,
    registration: (matricNo: string) =>
      [...queryKeys.student.root(matricNo), "registration"] as const,
    dashboard: () => [...queryKeys.student.all, "dashboard"] as const,
  },
  lecturer: {
    all: ["lecturer"] as const,
    root: (staffNo: string) => [...queryKeys.lecturer.all, staffNo] as const,
    courses: (staffNo: string) =>
      [...queryKeys.lecturer.root(staffNo), "courses"] as const,
    results: (staffNo: string, offeringId: number) =>
      [...queryKeys.lecturer.root(staffNo), "results", offeringId] as const,
  },
} as const;
