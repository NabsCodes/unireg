import { z } from "zod";

import { emailSchema, requiredTrimmedText } from "@/schemas/fields";

export const departmentFormSchema = z.object({
  dept_name: requiredTrimmedText(2, "Department name is required"),
  faculty: requiredTrimmedText(2, "Faculty is required"),
  hod_id: z.string().optional(),
});

export const studentFormSchema = z.object({
  matric_no: requiredTrimmedText(3, "Matric number is required"),
  first_name: requiredTrimmedText(2, "First name is required"),
  last_name: requiredTrimmedText(2, "Last name is required"),
  email: emailSchema,
  level: requiredTrimmedText(1, "Level is required"),
  dept_id: requiredTrimmedText(1, "Department is required"),
  status: z.enum(["active", "graduated", "suspended"]),
});

export const studentCreateFormSchema = studentFormSchema.omit({
  matric_no: true,
});

export const studentEditFormSchema = studentFormSchema.omit({
  matric_no: true,
});

export const lecturerFormSchema = z.object({
  staff_no: requiredTrimmedText(3, "Staff number is required"),
  first_name: requiredTrimmedText(2, "First name is required"),
  last_name: requiredTrimmedText(2, "Last name is required"),
  email: emailSchema,
  title: requiredTrimmedText(2, "Title is required"),
  dept_id: requiredTrimmedText(1, "Department is required"),
});

export const lecturerCreateFormSchema = lecturerFormSchema.omit({
  staff_no: true,
});

export const lecturerEditFormSchema = lecturerFormSchema.omit({
  staff_no: true,
});

export const courseFormSchema = z.object({
  course_code: requiredTrimmedText(3, "Course code is required"),
  course_title: requiredTrimmedText(3, "Course title is required"),
  credit_units: z
    .number({ error: "Credit units are required" })
    .int()
    .min(1)
    .max(12),
  level: requiredTrimmedText(1, "Level is required"),
  dept_id: requiredTrimmedText(1, "Department is required"),
});

export const courseEditFormSchema = courseFormSchema.omit({
  course_code: true,
});

export const offeringFormSchema = z.object({
  course_id: requiredTrimmedText(1, "Course is required"),
  semester_id: requiredTrimmedText(1, "Semester is required"),
  max_capacity: z
    .number({ error: "Capacity is required" })
    .int()
    .min(1)
    .max(500),
  status: z.enum(["open", "closed", "archived"]),
  lecturer_ids: z.array(z.string()),
});

export const offeringEditFormSchema = z.object({
  max_capacity: z
    .number({ error: "Capacity is required" })
    .int()
    .min(1)
    .max(500),
  status: z.enum(["open", "closed", "archived"]),
  lecturer_ids: z.array(z.string()),
});

export const sessionFormSchema = z.object({
  session_name: requiredTrimmedText(4, "Session name is required"),
  start_date: requiredTrimmedText(1, "Start date is required"),
  end_date: requiredTrimmedText(1, "End date is required"),
  is_current: z.boolean(),
});

export const semesterFormSchema = z.object({
  session_id: requiredTrimmedText(1, "Session is required"),
  semester_name: z.enum(["First Semester", "Second Semester", "Summer"]),
  start_date: requiredTrimmedText(1, "Start date is required"),
  end_date: requiredTrimmedText(1, "End date is required"),
});

export const resultUploadFormSchema = z.object({
  ca_score: z
    .string()
    .trim()
    .min(1, "CA score is required")
    .refine((value) => !Number.isNaN(Number(value)), "Enter a valid number")
    .refine(
      (value) => Number(value) >= 0 && Number(value) <= 40,
      "CA score must be between 0 and 40",
    ),
  exam_score: z
    .string()
    .trim()
    .min(1, "Exam score is required")
    .refine((value) => !Number.isNaN(Number(value)), "Enter a valid number")
    .refine(
      (value) => Number(value) >= 0 && Number(value) <= 60,
      "Exam score must be between 0 and 60",
    ),
});

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>;
export type StudentCreateFormValues = z.infer<typeof studentCreateFormSchema>;
export type StudentEditFormValues = z.infer<typeof studentEditFormSchema>;
export type LecturerCreateFormValues = z.infer<typeof lecturerCreateFormSchema>;
export type LecturerEditFormValues = z.infer<typeof lecturerEditFormSchema>;
export type CourseFormValues = z.infer<typeof courseFormSchema>;
export type CourseEditFormValues = z.infer<typeof courseEditFormSchema>;
export type OfferingFormValues = z.infer<typeof offeringFormSchema>;
export type OfferingEditFormValues = z.infer<typeof offeringEditFormSchema>;
export type SessionFormValues = z.infer<typeof sessionFormSchema>;
export type SemesterFormValues = z.infer<typeof semesterFormSchema>;
export type ResultUploadFormValues = z.infer<typeof resultUploadFormSchema>;
