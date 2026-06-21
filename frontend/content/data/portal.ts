export const currentAcademicPeriod = {
  session: "2025/2026",
  semester: "First Semester",
  label: "2025/2026 · First Semester",
  helper: "Current academic period",
} as const;

export type PortalUser = {
  name: string;
  role: string;
  email: string;
  identifier?: string;
  department?: string;
  level?: string;
  status?: "active" | "inactive";
};

export const portalUsers = {
  admin: {
    name: "Registry Administrator",
    role: "Administrator",
    email: "admin@unireg.test",
    status: "active",
  },
  lecturer: {
    name: "Dr. Gabriel Ayem",
    role: "Lecturer",
    email: "gabriel.ayem@unireg.test",
    identifier: "STF-CS-001",
    department: "Computer Science",
    status: "active",
  },
  student: {
    name: "Batul Hassan",
    role: "Student",
    email: "batul.hassan@unireg.test",
    identifier: "A00025332",
    department: "Computer Science",
    level: "300",
    status: "active",
  },
} satisfies Record<string, PortalUser>;
