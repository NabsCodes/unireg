import type { DataTableFilter, DataTableFilterOption } from "@/types/data-table";

export const departmentFilterOptions = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Information Systems", label: "Information Systems" },
] as const satisfies readonly DataTableFilterOption[];

export const semesterFilterOptions = [
  { value: "First Semester", label: "First Semester" },
  { value: "Second Semester", label: "Second Semester" },
] as const satisfies readonly DataTableFilterOption[];

export const offeringStatusFilterOptions = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
] as const satisfies readonly DataTableFilterOption[];

export const studentStatusFilterOptions = [
  { value: "active", label: "Active" },
  { value: "graduated", label: "Graduated" },
  { value: "suspended", label: "Suspended" },
] as const satisfies readonly DataTableFilterOption[];

export const auditActionFilterOptions = [
  { value: "Course registration", label: "Course registration" },
  { value: "Result upload", label: "Result upload" },
  { value: "Offering opened", label: "Offering opened" },
] as const satisfies readonly DataTableFilterOption[];

export const departmentFilter = {
  columnId: "department",
  label: "Department",
  placeholder: "All departments",
  options: departmentFilterOptions,
} as const satisfies DataTableFilter;

export const semesterFilter = {
  columnId: "semester",
  label: "Semester",
  placeholder: "All semesters",
  options: semesterFilterOptions,
} as const satisfies DataTableFilter;

export const offeringStatusFilter = {
  columnId: "status",
  label: "Status",
  placeholder: "All statuses",
  options: offeringStatusFilterOptions,
} as const satisfies DataTableFilter;

export const studentStatusFilter = {
  columnId: "status",
  label: "Status",
  placeholder: "All statuses",
  options: studentStatusFilterOptions,
} as const satisfies DataTableFilter;

export const auditActionFilter = {
  columnId: "action",
  label: "Action",
  placeholder: "All actions",
  options: auditActionFilterOptions,
} as const satisfies DataTableFilter;

export const registrationStatusFilter = {
  columnId: "isRegistered",
  label: "Registration",
  placeholder: "All offerings",
  options: [
    { value: "true", label: "Registered" },
    { value: "false", label: "Not registered" },
  ],
} as const satisfies DataTableFilter;
