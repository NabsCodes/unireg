"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

type RecordFormDialogProps<T extends FieldValues> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
  children: ReactNode;
};

export function RecordFormDialog<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  form,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save",
  children,
}: RecordFormDialogProps<T>) {
  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) {
          onOpenChange(nextOpen);
        }
      }}
      open={open}
    >
      <DialogContent className="sm:max-w-lg" showCloseButton={!isSubmitting}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
          >
            {children}

            <DialogFooter showCloseButton={false}>
              <Button
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
