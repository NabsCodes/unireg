import { apiPatch, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";

async function mockDelay() {
  await new Promise((resolve) => setTimeout(resolve, 400));
}

export async function createDepartment(body: {
  dept_name: string;
  faculty: string;
  hod_id?: number | null;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/departments", body);
}

export async function updateDepartment(
  deptId: number,
  body: {
    dept_name?: string;
    faculty?: string;
    hod_id?: number | null;
  },
) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPatch(`/api/admin/departments/${deptId}`, body);
}

export async function createStudent(body: {
  matric_no: string;
  first_name: string;
  last_name: string;
  email: string;
  level: string;
  dept_id: number;
  status?: string;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/students", body);
}

export async function updateStudent(
  studentId: number,
  body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    level?: string;
    dept_id?: number;
    status?: string;
  },
) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPatch(`/api/admin/students/${studentId}`, body);
}

export async function createLecturer(body: {
  staff_no: string;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  dept_id: number;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/lecturers", body);
}

export async function updateLecturer(
  lecturerId: number,
  body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    title?: string;
    dept_id?: number;
  },
) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPatch(`/api/admin/lecturers/${lecturerId}`, body);
}

export async function createCourse(body: {
  course_code: string;
  course_title: string;
  credit_units: number;
  level: string;
  dept_id: number;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/courses", body);
}

export async function updateCourse(
  courseId: number,
  body: {
    course_title?: string;
    credit_units?: number;
    level?: string;
    dept_id?: number;
  },
) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPatch(`/api/admin/courses/${courseId}`, body);
}

export async function createOffering(body: {
  course_id: number;
  semester_id: number;
  max_capacity: number;
  status?: "open" | "closed" | "archived";
  lecturer_ids?: number[];
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/offerings", body);
}

export async function updateOffering(
  offeringId: number,
  body: {
    max_capacity?: number;
    status?: "open" | "closed" | "archived";
    lecturer_ids?: number[];
  },
) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPatch(`/api/admin/offerings/${offeringId}`, body);
}

export async function createSession(body: {
  session_name: string;
  start_date: string;
  end_date: string;
  is_current?: boolean;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/sessions", body);
}

export async function createSemester(body: {
  session_id: number;
  semester_name: "First Semester" | "Second Semester" | "Summer";
  start_date: string;
  end_date: string;
}) {
  if (usesMockData()) {
    await mockDelay();
    return;
  }
  return apiPost("/api/admin/semesters", body);
}
