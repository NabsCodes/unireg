import type { ReactNode } from "react";

import { StatusBadge } from "@/components/shared/status-badge";
import type { OfferingRow } from "@/types/academic";

function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

export function OfferingCard({ offering }: { offering: OfferingRow }) {
  return (
    <article className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{offering.courseCode}</p>
          <p className="text-muted-foreground text-sm">
            {offering.courseTitle}
          </p>
        </div>
        <StatusBadge
          label={offering.status === "open" ? "Open" : "Closed"}
          tone={offering.status === "open" ? "active" : "draft"}
        />
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <Detail label="Session" value={offering.session} />
        <Detail label="Semester" value={offering.semester} />
        <Detail label="Lecturer" value={offering.lecturer} />
        <Detail
          label="Enrollment"
          value={
            <span className="tabular-nums">
              {offering.registered}/{offering.capacity}
            </span>
          }
        />
      </dl>
    </article>
  );
}
