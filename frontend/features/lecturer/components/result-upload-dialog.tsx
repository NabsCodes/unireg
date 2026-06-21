"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FeedbackDialog } from "@/components/shared/feedback-dialog";
import { RecordFormDialog } from "@/components/shared/record-form-dialog";
import { Button } from "@/components/ui/button";
import { ScoreFormField } from "@/features/admin/components/admin-form-fields";
import { useUploadResult } from "@/features/lecturer/api/use-upload-result";
import { ApiError } from "@/lib/api/client";
import {
  resultUploadFormSchema,
  type ResultUploadFormValues,
} from "@/schemas/admin-forms";
import type { ResultUploadRow } from "@/types/academic";

type ResultUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  row: ResultUploadRow | null;
  staffNo: string;
  offeringId: number;
};

export function ResultUploadDialog({
  open,
  onOpenChange,
  row,
  staffNo,
  offeringId,
}: ResultUploadDialogProps) {
  const uploadMutation = useUploadResult(staffNo, offeringId);
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

    const wasUploaded = row.status === "Uploaded";

    try {
      await uploadMutation.mutateAsync({
        regId: row.regId,
        caScore: Number(values.ca_score),
        examScore: Number(values.exam_score),
      });
      onOpenChange(false);
      setFeedback({
        tone: "success",
        title: wasUploaded ? "Scores updated" : "Result uploaded",
        description: wasUploaded
          ? `Updated scores for ${row.studentName}. Grade and transcript refresh automatically.`
          : `Scores saved for ${row.studentName}. Grade and transcript will update automatically.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Upload failed",
        description:
          error instanceof ApiError
            ? error.message
            : "Could not upload result. Please try again.",
      });
    }
  }

  if (!row) return null;

  return (
    <>
      <RecordFormDialog
        description={`Enter CA (0–40) and exam (0–60) scores for ${row.studentName} (${row.matricNo}).`}
        form={form}
        isSubmitting={uploadMutation.isPending}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        open={open}
        submitLabel={
          row.status === "Uploaded" ? "Update scores" : "Upload scores"
        }
        title={row.status === "Uploaded" ? "Edit result" : "Upload result"}
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

export function ResultUploadAction({
  row,
  staffNo,
  offeringId,
}: {
  row: ResultUploadRow;
  staffNo: string;
  offeringId: number;
}) {
  const [open, setOpen] = useState(false);
  const isUploaded = row.status === "Uploaded";

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" variant="outline">
        {isUploaded ? <Pencil /> : <Upload />}
        {isUploaded ? "Edit scores" : "Upload scores"}
      </Button>
      <ResultUploadDialog
        offeringId={offeringId}
        onOpenChange={setOpen}
        open={open}
        row={row}
        staffNo={staffNo}
      />
    </>
  );
}

export function ResultUploadPendingButton() {
  return (
    <Button disabled size="sm" variant="outline">
      <Loader2 className="animate-spin" />
      Uploading
    </Button>
  );
}
