export const queryKeys = {
  admin: {
    all: ["admin"] as const,
    dashboard: () => [...queryKeys.admin.all, "dashboard"] as const,
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
  },
  lecturer: {
    all: ["lecturer"] as const,
    root: (staffNo: string) => [...queryKeys.lecturer.all, staffNo] as const,
    courses: (staffNo: string) =>
      [...queryKeys.lecturer.root(staffNo), "courses"] as const,
    results: (staffNo: string, courseCode: string) =>
      [...queryKeys.lecturer.root(staffNo), "results", courseCode] as const,
  },
} as const;
