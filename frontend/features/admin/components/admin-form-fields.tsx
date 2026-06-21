"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { LecturerRow } from "@/types/academic";

type Option = { value: string; label: string };

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "date" | "number";
  disabled?: boolean;
  placeholder?: string;
};

export function TextFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  disabled,
  placeholder,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control as unknown as Control<FieldValues>}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={(event) => {
                if (type === "number") {
                  field.onChange(event.target.valueAsNumber || 0);
                  return;
                }
                field.onChange(event.target.value);
              }}
              value={field.value ?? (type === "number" ? 0 : "")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type ScoreFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  max: number;
  disabled?: boolean;
};

export function ScoreFormField<T extends FieldValues>({
  control,
  name,
  label,
  max,
  disabled,
}: ScoreFieldProps<T>) {
  return (
    <FormField
      control={control as unknown as Control<FieldValues>}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              autoComplete="off"
              disabled={disabled}
              inputMode="decimal"
              placeholder={`0–${max}`}
              type="text"
              value={field.value ?? ""}
              onChange={(event) => {
                const next = event.target.value;
                if (next === "") {
                  field.onChange("");
                  return;
                }

                if (!/^\d*\.?\d*$/.test(next)) {
                  return;
                }

                field.onChange(next);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
};

export function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select...",
  disabled,
  allowEmpty,
  emptyLabel = "None",
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control as unknown as Control<FieldValues>}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent position="popper">
              {allowEmpty ? (
                <SelectItem value="none">{emptyLabel}</SelectItem>
              ) : null}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type LecturerMultiSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  lecturers: LecturerRow[];
};

export function LecturerMultiSelectField<T extends FieldValues>({
  control,
  name,
  label,
  lecturers,
}: LecturerMultiSelectProps<T>) {
  return (
    <FormField
      control={control as unknown as Control<FieldValues>}
      name={name as string}
      render={({ field }) => {
        const selected = (field.value as string[] | undefined) ?? [];

        function toggle(lecturerId: string) {
          if (selected.includes(lecturerId)) {
            field.onChange(selected.filter((id) => id !== lecturerId));
            return;
          }
          field.onChange([...selected, lecturerId]);
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="border-border max-h-40 space-y-1 overflow-y-auto rounded-lg border p-2">
              {lecturers.length === 0 ? (
                <p className="text-muted-foreground px-2 py-1 text-sm">
                  No lecturers available.
                </p>
              ) : (
                lecturers.map((lecturer) => {
                  const isSelected = selected.includes(lecturer.id);
                  return (
                    <button
                      className={cn(
                        "hover:bg-muted/60 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isSelected && "bg-muted",
                      )}
                      key={lecturer.id}
                      onClick={() => toggle(lecturer.id)}
                      type="button"
                    >
                      <span>
                        {lecturer.title} {lecturer.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {isSelected ? "Selected" : "Select"}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
