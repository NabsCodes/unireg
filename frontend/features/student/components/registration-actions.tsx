"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { FeedbackDialog } from "@/components/shared/feedback-dialog";
import { Button } from "@/components/ui/button";
import {
  useDropCourse,
  useRegisterCourse,
} from "@/features/student/api/use-student-registration";
import { RegistrationStatusBadge } from "@/features/student/components/registration-status-badge";
import { ApiError } from "@/lib/api/client";
import { getRegistrationDisplayState } from "@/lib/academic/registration-state";
import type { AvailableOfferingRow } from "@/types/academic";

type PendingAction = "register" | "drop" | null;

type FeedbackState = {
  tone: "success" | "error";
  title: string;
  description: string;
} | null;

function registrationErrorMessage(
  error: unknown,
  action: "register" | "drop",
): string {
  if (error instanceof ApiError) {
    const message = error.message.toLowerCase();

    if (action === "drop" && error.status === 400) {
      if (message.includes("result")) {
        return "This course cannot be dropped because results have already been uploaded.";
      }

      return "This registration is no longer active. Refresh the page to see the latest status.";
    }

    if (action === "register") {
      if (message.includes("is full")) {
        return "This course offering is full. Choose another course or try again later.";
      }

      if (
        message.includes("already registered") ||
        message.includes("uq_course_registration")
      ) {
        return "You already have a registration record for this course. Refresh the page if the status looks out of date.";
      }

      if (message.includes("is not open")) {
        return "This course offering is closed and cannot accept new registrations.";
      }
    }

    return error.message;
  }

  return "Something went wrong. Please try again.";
}

type RegistrationActionsProps = {
  offering: AvailableOfferingRow;
  matricNo: string;
  layout?: "inline" | "card";
};

export function RegistrationActions({
  offering,
  matricNo,
  layout = "inline",
}: RegistrationActionsProps) {
  const registerMutation = useRegisterCourse(matricNo);
  const dropMutation = useDropCourse(matricNo);
  const offeringId = Number(offering.id);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const displayState = getRegistrationDisplayState(offering);

  const isRegistering =
    registerMutation.isPending &&
    registerMutation.variables?.offeringId === offeringId;
  const isDropping =
    dropMutation.isPending && dropMutation.variables?.offeringId === offeringId;
  const isBusy = isRegistering || isDropping;

  const courseLabel = `${offering.courseCode} · ${offering.courseTitle}`;

  async function handleConfirm() {
    if (pendingAction === "register") {
      try {
        await registerMutation.mutateAsync({ offeringId });
        setPendingAction(null);
        setFeedback({
          tone: "success",
          title: "Registration successful",
          description: `You are now registered for ${courseLabel}.`,
        });
      } catch (error) {
        setPendingAction(null);
        setFeedback({
          tone: "error",
          title: "Registration failed",
          description: registrationErrorMessage(error, "register"),
        });
      }
      return;
    }

    if (pendingAction === "drop") {
      try {
        await dropMutation.mutateAsync({ offeringId });
        setPendingAction(null);
        setFeedback({
          tone: "success",
          title: "Course dropped",
          description: `Your registration for ${courseLabel} has been removed.`,
        });
      } catch (error) {
        setPendingAction(null);
        setFeedback({
          tone: "error",
          title: "Drop failed",
          description: registrationErrorMessage(error, "drop"),
        });
      }
    }
  }

  const actionButtons = (() => {
    if (displayState === "results-published") {
      return (
        <RegistrationStatusBadge
          offering={offering}
          showHelper={layout === "card"}
        />
      );
    }

    if (displayState === "registered") {
      return (
        <div
          className={
            layout === "card"
              ? "flex flex-col items-end gap-2"
              : "flex flex-wrap items-center gap-2"
          }
        >
          <RegistrationStatusBadge offering={offering} />
          <Button
            disabled={isBusy}
            onClick={() => setPendingAction("drop")}
            size="sm"
            variant="outline"
          >
            {isDropping ? (
              <>
                <Loader2 className="animate-spin" />
                Dropping
              </>
            ) : (
              "Drop"
            )}
          </Button>
        </div>
      );
    }

    return (
      <div
        className={
          layout === "card"
            ? "flex flex-col items-end gap-2"
            : "flex flex-wrap items-center gap-2"
        }
      >
        {displayState === "dropped" ? (
          <RegistrationStatusBadge offering={offering} />
        ) : null}
        <Button
          disabled={isBusy || offering.status !== "open"}
          onClick={() => setPendingAction("register")}
          size="sm"
          variant="outline"
        >
          {isRegistering ? (
            <>
              <Loader2 className="animate-spin" />
              Registering
            </>
          ) : displayState === "dropped" ? (
            "Register again"
          ) : (
            "Register"
          )}
        </Button>
      </div>
    );
  })();

  return (
    <>
      {actionButtons}

      <ConfirmDialog
        confirmLabel={pendingAction === "drop" ? "Drop course" : "Register"}
        description={
          pendingAction === "drop"
            ? `Are you sure you want to drop ${courseLabel}? This removes your seat for the current semester.`
            : `Register for ${courseLabel} (${offering.creditUnits} credit units) this semester?`
        }
        destructive={pendingAction === "drop"}
        isLoading={isBusy}
        onConfirm={() => void handleConfirm()}
        onOpenChange={(open) => {
          if (!open && !isBusy) {
            setPendingAction(null);
          }
        }}
        open={pendingAction !== null}
        title={
          pendingAction === "drop" ? "Drop course?" : "Confirm registration"
        }
      />

      <FeedbackDialog
        description={feedback?.description ?? ""}
        onOpenChange={(open) => {
          if (!open) {
            setFeedback(null);
          }
        }}
        open={feedback !== null}
        title={feedback?.title ?? ""}
        tone={feedback?.tone ?? "success"}
      />
    </>
  );
}
