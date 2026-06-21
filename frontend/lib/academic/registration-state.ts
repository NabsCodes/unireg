import type { StatusTone } from "@/components/shared/status-badge";
import type { AvailableOfferingRow } from "@/types/academic";

export type RegistrationDisplayState =
  | "available"
  | "registered"
  | "results-published"
  | "dropped";

export function getRegistrationDisplayState(
  offering: AvailableOfferingRow,
): RegistrationDisplayState {
  if (offering.isRegistered) {
    if (offering.hasResults) {
      return "results-published";
    }

    return "registered";
  }

  if (offering.registrationStatus === "dropped") {
    return "dropped";
  }

  return "available";
}

export function registrationStateMeta(state: RegistrationDisplayState): {
  label: string;
  tone: StatusTone;
  helper: string;
} {
  switch (state) {
    case "registered":
      return {
        label: "Registered",
        tone: "active",
        helper: "You can drop this course before results are uploaded.",
      };
    case "results-published":
      return {
        label: "Results published",
        tone: "completed",
        helper: "This registration is locked because a lecturer has uploaded scores.",
      };
    case "dropped":
      return {
        label: "Dropped",
        tone: "draft",
        helper: "You previously dropped this course. You can register again if seats remain.",
      };
    default:
      return {
        label: "Not registered",
        tone: "draft",
        helper: "Register to reserve a seat for this semester.",
      };
  }
}
