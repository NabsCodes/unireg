"use client";

import type { ReactNode } from "react";

import { StatusBadge } from "@/components/shared/status-badge";
import { RegistrationActions } from "@/features/student/components/registration-actions";
import { RegistrationStatusBadge } from "@/features/student/components/registration-status-badge";
import { formatGradePoint, formatScore } from "@/lib/format/academic";
import type { AvailableOfferingRow, StudentResultRow } from "@/types/academic";

type DetailProps = {
  label: string;
  value: ReactNode;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

export function RegistrationOfferingCard({
  offering,
  matricNo,
}: {
  offering: AvailableOfferingRow;
  matricNo: string;
}) {
  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{offering.courseCode}</p>
          <p className="text-muted-foreground text-sm">
            {offering.courseTitle}
          </p>
        </div>
        <RegistrationActions
          layout="card"
          matricNo={matricNo}
          offering={offering}
        />
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="Credits" value={offering.creditUnits} />
        <Detail label="Semester" value={offering.semester} />
        <Detail
          label="Slots"
          value={
            <span className="tabular-nums">
              {offering.registered}/{offering.capacity}
            </span>
          }
        />
        <Detail
          label="Your status"
          value={<RegistrationStatusBadge offering={offering} />}
        />
        <Detail
          label="Offering status"
          value={
            <StatusBadge
              label={offering.status === "open" ? "Open" : "Closed"}
              tone={offering.status === "open" ? "active" : "draft"}
            />
          }
        />
      </dl>
    </article>
  );
}

export function StudentResultCard({ result }: { result: StudentResultRow }) {
  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{result.courseCode}</p>
          <p className="text-muted-foreground text-sm">{result.courseTitle}</p>
        </div>
        {result.grade ? (
          <StatusBadge label={result.grade} tone="completed" />
        ) : (
          <StatusBadge label="Pending" tone="pending" />
        )}
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="Semester" value={result.semester} />
        <Detail label="Credits" value={result.creditUnits} />
        <Detail label="CA" value={formatScore(result.caScore)} />
        <Detail label="Exam" value={formatScore(result.examScore)} />
        <Detail
          label="Total"
          value={
            <span className="font-medium tabular-nums">
              {formatScore(result.totalScore)}
            </span>
          }
        />
        <Detail label="GPA" value={formatGradePoint(result.gradePoint)} />
      </dl>
    </article>
  );
}

export function TranscriptRecordCard({ result }: { result: StudentResultRow }) {
  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{result.courseCode}</p>
          <p className="text-muted-foreground text-sm">{result.courseTitle}</p>
        </div>
        <p className="text-muted-foreground shrink-0 text-xs">
          {result.session}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="Semester" value={result.semester} />
        <Detail label="Credits" value={result.creditUnits} />
        <Detail label="Score" value={formatScore(result.totalScore)} />
        <Detail label="Grade" value={result.grade ?? "—"} />
        <Detail label="GPA" value={formatGradePoint(result.gradePoint)} />
      </dl>
    </article>
  );
}
