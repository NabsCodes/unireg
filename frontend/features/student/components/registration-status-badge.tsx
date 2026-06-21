"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  getRegistrationDisplayState,
  registrationStateMeta,
} from "@/lib/academic/registration-state";
import type { AvailableOfferingRow } from "@/types/academic";

type RegistrationStatusBadgeProps = {
  offering: AvailableOfferingRow;
  showHelper?: boolean;
  className?: string;
};

export function RegistrationStatusBadge({
  offering,
  showHelper = false,
  className,
}: RegistrationStatusBadgeProps) {
  const meta = registrationStateMeta(getRegistrationDisplayState(offering));

  return (
    <div className={className}>
      <StatusBadge label={meta.label} tone={meta.tone} />
      {showHelper ? (
        <p className="text-muted-foreground mt-1 max-w-xs text-xs">
          {meta.helper}
        </p>
      ) : null}
    </div>
  );
}
