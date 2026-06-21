import { StatusBadge } from "@/components/shared/status-badge";
import type { LecturerCourseRow, ResultUploadRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

export function LecturerCourseCard({ course }: { course: LecturerCourseRow }) {
  const complete =
    course.resultsUploaded >= course.registeredStudents &&
    course.registeredStudents > 0;

  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{course.courseCode}</p>
          <p className="text-muted-foreground text-sm">{course.courseTitle}</p>
        </div>
        <StatusBadge
          label={complete ? "Complete" : "Pending"}
          tone={complete ? "completed" : "pending"}
        />
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="Session" value={course.session} />
        <Detail label="Semester" value={course.semester} />
        <Detail label="Registered" value={String(course.registeredStudents)} />
        <Detail
          label="Uploaded"
          value={`${course.resultsUploaded}/${course.registeredStudents}`}
        />
      </dl>
    </article>
  );
}

export function ResultUploadCard({ row }: { row: ResultUploadRow }) {
  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{row.studentName}</p>
          <p className="text-muted-foreground text-sm">{row.matricNo}</p>
        </div>
        <StatusBadge
          label={row.status}
          tone={row.status === "Uploaded" ? "completed" : "pending"}
        />
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="CA" value={formatScore(row.caScore)} />
        <Detail label="Exam" value={formatScore(row.examScore)} />
        <Detail label="Total" value={formatScore(row.totalScore)} />
        <Detail label="Grade" value={row.grade ?? "—"} />
      </dl>
    </article>
  );
}
