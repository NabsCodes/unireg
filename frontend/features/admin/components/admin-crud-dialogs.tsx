"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FeedbackDialog } from "@/components/shared/feedback-dialog";
import { RecordFormDialog } from "@/components/shared/record-form-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useAdminCourses,
  useAdminDepartments,
  useAdminLecturers,
  useAdminSemesters,
  useAdminSessions,
} from "@/features/admin/api/use-admin-lists";
import {
  useCreateCourse,
  useCreateDepartment,
  useCreateLecturer,
  useCreateOffering,
  useCreateSemester,
  useCreateSession,
  useCreateStudent,
  useUpdateCourse,
  useUpdateDepartment,
  useUpdateLecturer,
  useUpdateOffering,
  useUpdateStudent,
} from "@/features/admin/api/use-admin-mutations";
import {
  AutoAssignedField,
  IntegerFormField,
  LecturerMultiSelectField,
  ReadOnlyFormField,
  SelectFormField,
  TextFormField,
} from "@/features/admin/components/admin-form-fields";
import { useDialogFormReset } from "@/hooks/use-dialog-form-reset";
import { ApiError } from "@/lib/api/client";
import {
  courseFormSchema,
  departmentFormSchema,
  lecturerCreateFormSchema,
  lecturerEditFormSchema,
  offeringFormSchema,
  semesterFormSchema,
  sessionFormSchema,
  studentCreateFormSchema,
  studentEditFormSchema,
  type CourseFormValues,
  type DepartmentFormValues,
  type LecturerCreateFormValues,
  type LecturerEditFormValues,
  type OfferingFormValues,
  type SemesterFormValues,
  type SessionFormValues,
  type StudentCreateFormValues,
  type StudentEditFormValues,
} from "@/schemas/admin-forms";
import type { ApiStudentRow, ApiLecturerRow } from "@/types/api";
import type {
  CourseRow,
  DepartmentRow,
  LecturerRow,
  OfferingRow,
  StudentRow,
} from "@/types/academic";

type DialogFeedback = {
  tone: "success" | "error";
  title: string;
  description: string;
} | null;

function mutationErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  return fallback;
}

type BaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DepartmentFormDialog({
  open,
  onOpenChange,
  initial,
}: BaseDialogProps & { initial?: DepartmentRow | null }) {
  const isEdit = Boolean(initial);
  const { data: lecturers = [] } = useAdminLecturers();
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      dept_name: "",
      faculty: "",
      hod_id: "",
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      form.reset({
        dept_name: initial?.name ?? "",
        faculty: initial?.faculty ?? "",
        hod_id: initial?.hodId ? String(initial.hodId) : "none",
      });
    }, [form, initial]),
  );

  async function onSubmit(values: DepartmentFormValues) {
    try {
      const hodId =
        values.hod_id && values.hod_id !== "none"
          ? Number(values.hod_id)
          : null;
      if (isEdit && initial) {
        await updateMutation.mutateAsync({
          deptId: Number(initial.id),
          body: {
            dept_name: values.dept_name,
            faculty: values.faculty,
            hod_id: hodId,
          },
        });
      } else {
        await createMutation.mutateAsync({
          dept_name: values.dept_name,
          faculty: values.faculty,
          hod_id: hodId,
        });
      }
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: isEdit ? "Department updated" : "Department created",
        description: `${values.dept_name} has been saved.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save department",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <RecordFormDialog
        description={
          isEdit
            ? "Update department name, faculty, or head of department."
            : "Add a new academic department."
        }
        form={form}
        isSubmitting={isSubmitting}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Update" : "Create"}
        title={isEdit ? "Edit department" : "Add department"}
      >
        <TextFormField
          control={form.control}
          label="Department name"
          name="dept_name"
        />
        <TextFormField control={form.control} label="Faculty" name="faculty" />
        <SelectFormField
          allowEmpty
          control={form.control}
          emptyLabel="No HOD assigned"
          label="Head of department"
          name="hod_id"
          options={lecturers.map((lecturer) => ({
            value: lecturer.id,
            label: `${lecturer.title} ${lecturer.name}`,
          }))}
          placeholder="Select lecturer"
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function StudentFormDialog({
  open,
  onOpenChange,
  initial,
}: BaseDialogProps & { initial?: StudentRow | null }) {
  const isEdit = Boolean(initial);
  const { data: departments = [] } = useAdminDepartments();
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<StudentCreateFormValues | StudentEditFormValues>({
    resolver: zodResolver(
      isEdit ? studentEditFormSchema : studentCreateFormSchema,
    ),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      level: "100",
      dept_id: "",
      status: "active",
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      if (isEdit && initial) {
        form.reset({
          first_name: initial.firstName,
          last_name: initial.lastName,
          email: initial.email,
          level: initial.level,
          dept_id: String(initial.departmentId),
          status: initial.status,
        });
        return;
      }

      form.reset({
        first_name: "",
        last_name: "",
        email: "",
        level: "100",
        dept_id: "",
        status: "active",
      });
    }, [form, initial, isEdit]),
  );

  async function onSubmit(
    values: StudentCreateFormValues | StudentEditFormValues,
  ) {
    try {
      if (isEdit && initial) {
        await updateMutation.mutateAsync({
          studentId: Number(initial.id),
          body: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            level: values.level,
            dept_id: Number(values.dept_id),
            status: values.status,
          },
        });
        onOpenChange(false);
        setFeedback({
          tone: "success",
          title: "Student updated",
          description: `${values.first_name} ${values.last_name} has been saved.`,
        });
        return;
      }

      const created = await createMutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        level: values.level,
        dept_id: Number(values.dept_id),
        status: values.status,
      });
      onOpenChange(false);
      const matricNo =
        created && typeof created === "object" && "matric_no" in created
          ? String((created as ApiStudentRow).matric_no)
          : null;
      setFeedback({
        tone: "success",
        title: "Student created",
        description: matricNo
          ? `${values.first_name} ${values.last_name} has been saved with matric number ${matricNo}.`
          : `${values.first_name} ${values.last_name} has been saved.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save student",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <RecordFormDialog
        description={
          isEdit
            ? "Update student biodata and academic status."
            : "Register a new student profile."
        }
        form={form}
        isSubmitting={isSubmitting}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Update" : "Create"}
        title={isEdit ? "Edit student" : "Add student"}
      >
        {isEdit && initial ? (
          <ReadOnlyFormField
            description="Matric numbers are generated by the registry and cannot be changed."
            label="Matric number"
            value={initial.matricNo}
          />
        ) : (
          <AutoAssignedField
            description="The next available matric number (for example A00025333) is assigned when you save."
            label="Matric number"
          />
        )}
        <TextFormField
          control={form.control}
          label="First name"
          name="first_name"
        />
        <TextFormField
          control={form.control}
          label="Last name"
          name="last_name"
        />
        <TextFormField
          control={form.control}
          label="Email"
          name="email"
          type="email"
        />
        <TextFormField control={form.control} label="Level" name="level" />
        <SelectFormField
          control={form.control}
          label="Department"
          name="dept_id"
          options={departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))}
        />
        <SelectFormField
          control={form.control}
          label="Status"
          name="status"
          options={[
            { value: "active", label: "Active" },
            { value: "graduated", label: "Graduated" },
            { value: "suspended", label: "Suspended" },
          ]}
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function LecturerFormDialog({
  open,
  onOpenChange,
  initial,
}: BaseDialogProps & { initial?: LecturerRow | null }) {
  const isEdit = Boolean(initial);
  const { data: departments = [] } = useAdminDepartments();
  const createMutation = useCreateLecturer();
  const updateMutation = useUpdateLecturer();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<LecturerCreateFormValues | LecturerEditFormValues>({
    resolver: zodResolver(
      isEdit ? lecturerEditFormSchema : lecturerCreateFormSchema,
    ),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      title: "Dr.",
      dept_id: "",
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      if (isEdit && initial) {
        form.reset({
          first_name: initial.firstName,
          last_name: initial.lastName,
          email: initial.email,
          title: initial.title,
          dept_id: String(initial.departmentId),
        });
        return;
      }

      form.reset({
        first_name: "",
        last_name: "",
        email: "",
        title: "Dr.",
        dept_id: "",
      });
    }, [form, initial, isEdit]),
  );

  async function onSubmit(
    values: LecturerCreateFormValues | LecturerEditFormValues,
  ) {
    try {
      if (isEdit && initial) {
        await updateMutation.mutateAsync({
          lecturerId: Number(initial.id),
          body: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            title: values.title,
            dept_id: Number(values.dept_id),
          },
        });
        onOpenChange(false);
        setFeedback({
          tone: "success",
          title: "Lecturer updated",
          description: `${values.first_name} ${values.last_name} has been saved.`,
        });
        return;
      }

      const created = await createMutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        title: values.title,
        dept_id: Number(values.dept_id),
      });
      onOpenChange(false);
      const staffNo =
        created && typeof created === "object" && "staff_no" in created
          ? String((created as ApiLecturerRow).staff_no)
          : null;
      setFeedback({
        tone: "success",
        title: "Lecturer created",
        description: staffNo
          ? `${values.first_name} ${values.last_name} has been saved with staff number ${staffNo}.`
          : `${values.first_name} ${values.last_name} has been saved.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save lecturer",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <RecordFormDialog
        description={
          isEdit
            ? "Update lecturer profile details."
            : "Add a new lecturer profile."
        }
        form={form}
        isSubmitting={isSubmitting}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Update" : "Create"}
        title={isEdit ? "Edit lecturer" : "Add lecturer"}
      >
        {isEdit && initial ? (
          <ReadOnlyFormField
            description="Staff numbers are generated by the registry and cannot be changed."
            label="Staff number"
            value={initial.staffNo}
          />
        ) : (
          <AutoAssignedField
            description="A staff number is generated from the selected department (for example STF-CS-004) when you save."
            label="Staff number"
          />
        )}
        <TextFormField control={form.control} label="Title" name="title" />
        <TextFormField
          control={form.control}
          label="First name"
          name="first_name"
        />
        <TextFormField
          control={form.control}
          label="Last name"
          name="last_name"
        />
        <TextFormField
          control={form.control}
          label="Email"
          name="email"
          type="email"
        />
        <SelectFormField
          control={form.control}
          label="Department"
          name="dept_id"
          options={departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))}
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function CourseFormDialog({
  open,
  onOpenChange,
  initial,
}: BaseDialogProps & { initial?: CourseRow | null }) {
  const isEdit = Boolean(initial);
  const { data: departments = [] } = useAdminDepartments();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      course_code: "",
      course_title: "",
      credit_units: 3,
      level: "100",
      dept_id: "",
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      if (isEdit && initial) {
        form.reset({
          course_code: initial.code,
          course_title: initial.title,
          credit_units: initial.creditUnits,
          level: initial.level,
          dept_id: String(initial.departmentId),
        });
        return;
      }

      form.reset({
        course_code: "",
        course_title: "",
        credit_units: 3,
        level: "100",
        dept_id: "",
      });
    }, [form, initial, isEdit]),
  );

  async function onSubmit(values: CourseFormValues) {
    try {
      if (isEdit && initial) {
        await updateMutation.mutateAsync({
          courseId: Number(initial.id),
          body: {
            course_title: values.course_title,
            credit_units: values.credit_units,
            level: values.level,
            dept_id: Number(values.dept_id),
          },
        });
      } else {
        await createMutation.mutateAsync({
          course_code: values.course_code,
          course_title: values.course_title,
          credit_units: values.credit_units,
          level: values.level,
          dept_id: Number(values.dept_id),
        });
      }
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: isEdit ? "Course updated" : "Course created",
        description: `${values.course_title} has been saved.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save course",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <RecordFormDialog
        description={
          isEdit
            ? "Update course metadata."
            : "Add a new course to the catalog."
        }
        form={form}
        isSubmitting={isSubmitting}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Update" : "Create"}
        title={isEdit ? "Edit course" : "Add course"}
      >
        <TextFormField
          control={form.control}
          disabled={isEdit}
          label="Course code"
          name="course_code"
        />
        <TextFormField
          control={form.control}
          label="Course title"
          name="course_title"
        />
        <IntegerFormField
          control={form.control}
          label="Credit units"
          max={12}
          min={1}
          name="credit_units"
        />
        <TextFormField control={form.control} label="Level" name="level" />
        <SelectFormField
          control={form.control}
          label="Department"
          name="dept_id"
          options={departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))}
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function OfferingFormDialog({
  open,
  onOpenChange,
  initial,
}: BaseDialogProps & { initial?: OfferingRow | null }) {
  const isEdit = Boolean(initial);
  const { data: courses = [] } = useAdminCourses();
  const { data: semesters = [] } = useAdminSemesters();
  const { data: lecturers = [] } = useAdminLecturers();
  const createMutation = useCreateOffering();
  const updateMutation = useUpdateOffering();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<OfferingFormValues>({
    resolver: zodResolver(offeringFormSchema),
    defaultValues: {
      course_id: "",
      semester_id: "",
      max_capacity: 60,
      status: "open",
      lecturer_ids: [],
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      if (isEdit && initial) {
        form.reset({
          course_id: String(initial.courseId),
          semester_id: String(initial.semesterId),
          max_capacity: initial.capacity,
          status: initial.status,
          lecturer_ids: initial.lecturerIds.map(String),
        });
        return;
      }

      form.reset({
        course_id: "",
        semester_id: "",
        max_capacity: 60,
        status: "open",
        lecturer_ids: [],
      });
    }, [form, initial, isEdit]),
  );

  async function onSubmit(values: OfferingFormValues) {
    const lecturerIds = (values.lecturer_ids ?? []).map(Number);

    try {
      if (isEdit && initial) {
        await updateMutation.mutateAsync({
          offeringId: Number(initial.id),
          body: {
            max_capacity: values.max_capacity,
            status: values.status,
            lecturer_ids: lecturerIds,
          },
        });
      } else {
        await createMutation.mutateAsync({
          course_id: Number(values.course_id),
          semester_id: Number(values.semester_id),
          max_capacity: values.max_capacity,
          status: values.status,
          lecturer_ids: lecturerIds,
        });
      }
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: isEdit ? "Offering updated" : "Offering created",
        description: "Course offering has been saved.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save offering",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <RecordFormDialog
        description={
          isEdit
            ? "Update capacity, registration status, or lecturer assignment."
            : "Publish a course for a semester."
        }
        form={form}
        isSubmitting={isSubmitting}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Update" : "Create"}
        title={isEdit ? "Edit offering" : "Add offering"}
      >
        {!isEdit ? (
          <>
            <SelectFormField
              control={form.control}
              label="Course"
              name="course_id"
              options={courses.map((course) => ({
                value: course.id,
                label: `${course.code} · ${course.title}`,
              }))}
            />
            <SelectFormField
              control={form.control}
              label="Semester"
              name="semester_id"
              options={semesters.map((semester) => ({
                value: semester.id,
                label: `${semester.sessionName} · ${semester.name}`,
              }))}
            />
          </>
        ) : null}
        <IntegerFormField
          control={form.control}
          label="Capacity"
          max={500}
          min={1}
          name="max_capacity"
        />
        <SelectFormField
          control={form.control}
          label="Status"
          name="status"
          options={[
            { value: "open", label: "Open" },
            { value: "closed", label: "Closed" },
            { value: "archived", label: "Archived" },
          ]}
        />
        <LecturerMultiSelectField
          control={form.control}
          label="Assigned lecturers"
          lecturers={lecturers}
          name="lecturer_ids"
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function SessionFormDialog({ open, onOpenChange }: BaseDialogProps) {
  const createMutation = useCreateSession();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      session_name: "",
      start_date: "",
      end_date: "",
      is_current: false,
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      form.reset({
        session_name: "",
        start_date: "",
        end_date: "",
        is_current: false,
      });
    }, [form]),
  );

  async function onSubmit(values: SessionFormValues) {
    try {
      await createMutation.mutateAsync({
        session_name: values.session_name,
        start_date: values.start_date,
        end_date: values.end_date,
        is_current: values.is_current,
      });
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: "Session created",
        description: `${values.session_name} has been added.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not create session",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  return (
    <>
      <RecordFormDialog
        description="Define an academic session with start and end dates."
        form={form}
        isSubmitting={createMutation.isPending}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel="Create"
        title="Add session"
      >
        <TextFormField
          control={form.control}
          label="Session name"
          name="session_name"
        />
        <TextFormField
          control={form.control}
          label="Start date"
          name="start_date"
          type="date"
        />
        <TextFormField
          control={form.control}
          label="End date"
          name="end_date"
          type="date"
        />
        <FormField
          control={form.control}
          name="is_current"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Set as current session
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}

export function SemesterFormDialog({ open, onOpenChange }: BaseDialogProps) {
  const { data: sessions = [] } = useAdminSessions();
  const createMutation = useCreateSemester();
  const [feedback, setFeedback] = useState<DialogFeedback>(null);

  const form = useForm<SemesterFormValues>({
    resolver: zodResolver(semesterFormSchema),
    defaultValues: {
      session_id: "",
      semester_name: "First Semester",
      start_date: "",
      end_date: "",
    },
  });

  useDialogFormReset(
    open,
    useCallback(() => {
      form.reset({
        session_id: sessions[0]?.id ?? "",
        semester_name: "First Semester",
        start_date: "",
        end_date: "",
      });
    }, [form, sessions]),
  );

  useEffect(() => {
    if (!open) return;

    const currentSessionId = form.getValues("session_id");
    if (!currentSessionId && sessions[0]?.id) {
      form.setValue("session_id", sessions[0].id, { shouldDirty: false });
    }
  }, [form, open, sessions]);

  async function onSubmit(values: SemesterFormValues) {
    try {
      await createMutation.mutateAsync({
        session_id: Number(values.session_id),
        semester_name: values.semester_name,
        start_date: values.start_date,
        end_date: values.end_date,
      });
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: "Semester created",
        description: `${values.semester_name} has been added.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not create semester",
        description: mutationErrorMessage(error, "Please try again."),
      });
    }
  }

  return (
    <>
      <RecordFormDialog
        description="Add a semester under an academic session."
        form={form}
        isSubmitting={createMutation.isPending}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel="Create"
        title="Add semester"
      >
        <SelectFormField
          control={form.control}
          label="Session"
          name="session_id"
          options={sessions.map((session) => ({
            value: session.id,
            label: session.name,
          }))}
        />
        <SelectFormField
          control={form.control}
          label="Semester"
          name="semester_name"
          options={[
            { value: "First Semester", label: "First Semester" },
            { value: "Second Semester", label: "Second Semester" },
            { value: "Summer", label: "Summer" },
          ]}
        />
        <TextFormField
          control={form.control}
          label="Start date"
          name="start_date"
          type="date"
        />
        <TextFormField
          control={form.control}
          label="End date"
          name="end_date"
          type="date"
        />
      </RecordFormDialog>
      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={() => setFeedback(null)}
        open={Boolean(feedback)}
        title={feedback?.title ?? ""}
        tone={feedback?.tone}
      />
    </>
  );
}
