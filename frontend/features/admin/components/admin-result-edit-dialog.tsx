"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FeedbackDialog } from "@/components/shared/feedback-dialog";
import { RecordFormDialog } from "@/components/shared/record-form-dialog";
import { Button } from "@/components/ui/button";
import { ScoreFormField } from "@/features/admin/components/admin-form-fields";
import { useAdminUpdateResult } from "@/features/admin/api/use-admin-results";
import { ApiError } from "@/lib/api/client";
import {
  resultUploadFormSchema,
  type ResultUploadFormValues,
} from "@/schemas/admin-forms";
import type { ResultUploadRow } from "@/types/academic";

type AdminResultEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  row: ResultUploadRow | null;
  offeringId: number;
};

export function AdminResultEditDialog({
  open,
  onOpenChange,
  row,
  offeringId,
}: AdminResultEditDialogProps) {
  const updateMutation = useAdminUpdateResult(offeringId);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  const form = useForm<ResultUploadFormValues>({
    resolver: zodResolver(resultUploadFormSchema),
    defaultValues: {
      ca_score: "",
      exam_score: "",
    },
  });

  useEffect(() => {
    if (!open || !row) return;
    form.reset({
      ca_score: row.caScore === null ? "" : String(row.caScore),
      exam_score: row.examScore === null ? "" : String(row.examScore),
    });
  }, [form, open, row]);

  async function onSubmit(values: ResultUploadFormValues) {
    if (!row) return;

    try {
      await updateMutation.mutateAsync({
        regId: row.regId,
        caScore: Number(values.ca_score),
        examScore: Number(values.exam_score),
      });
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title:
          row.status === "Uploaded" ? "Correction saved" : "Correction applied",
        description: `${row.studentName}'s result was updated by the registry. Grade, GPA, and audit log refresh automatically in PostgreSQL.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Could not save scores",
        description:
          error instanceof ApiError ? error.message : "Please try again.",
      });
    }
  }

  if (!row) return null;

  const isEdit = row.status === "Uploaded";

  return (
    <>
      <RecordFormDialog
        description={`Registry correction for ${row.studentName} (${row.matricNo}). Lecturers normally enter scores first; use this only when a correction is required. CA is out of 40 and exam out of 60.`}
        form={form}
        isSubmitting={updateMutation.isPending}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={isEdit ? "Save correction" : "Apply correction"}
        title={
          isEdit ? "Correct published scores" : "Apply registry correction"
        }
      >
        <ScoreFormField
          control={form.control}
          label="CA score"
          max={40}
          name="ca_score"
        />
        <ScoreFormField
          control={form.control}
          label="Exam score"
          max={60}
          name="exam_score"
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

export function AdminResultEditAction({
  row,
  offeringId,
}: {
  row: ResultUploadRow;
  offeringId: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" variant="outline">
        <Pencil />
        {row.status === "Uploaded" ? "Correct scores" : "Apply correction"}
      </Button>
      <AdminResultEditDialog
        offeringId={offeringId}
        onOpenChange={setOpen}
        open={open}
        row={row}
      />
    </>
  );
}
