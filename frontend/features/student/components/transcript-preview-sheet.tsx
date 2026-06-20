"use client";

import { FileSpreadsheet, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentAcademicPeriod } from "@/content/portal";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  downloadTranscriptCsv,
  printTranscriptDocument,
} from "@/lib/exports/transcript";
import { cn } from "@/lib/utils";
import type { TranscriptExportMeta } from "@/lib/exports/types";
import type { StudentResultRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

type TranscriptPreviewSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: StudentResultRow[];
  meta: TranscriptExportMeta;
};

export function TranscriptPreviewSheet({
  open,
  onOpenChange,
  rows,
  meta,
}: TranscriptPreviewSheetProps) {
  const isMobile = useIsMobile();

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        className={cn(
          "flex w-full flex-col gap-0 p-0",
          isMobile
            ? "h-[min(92dvh,92svh)] max-h-[min(92dvh,92svh)] rounded-t-xl"
            : "data-[side=right]:w-full data-[side=right]:sm:max-w-2xl data-[side=right]:lg:max-w-3xl",
        )}
        side={isMobile ? "bottom" : "right"}
      >
        <SheetHeader className="border-border shrink-0 border-b px-5 py-4 text-left sm:px-6 sm:py-5">
          <SheetTitle>Transcript preview</SheetTitle>
          <SheetDescription>
            Review the official transcript layout before exporting.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
          <article className="border-border bg-card rounded-lg border">
            <div className="border-primary border-b-4 px-4 py-4 sm:px-5">
              <p className="text-primary text-lg font-semibold tracking-tight">
                UniReg
              </p>
              <p className="text-muted-foreground text-sm">
                Official Academic Transcript
              </p>
            </div>

            <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5">
              <div>
                <p className="text-muted-foreground text-xs uppercase">Student</p>
                <p className="font-medium">{meta.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase">
                  Matric number
                </p>
                <p className="font-medium">{meta.matricNo}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase">
                  Department
                </p>
                <p className="font-medium">{meta.department}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase">Level</p>
                <p className="font-medium">{meta.level}</p>
              </div>
            </div>

            <div className="md:hidden">
              <div className="divide-border border-border divide-y border-t px-4 sm:px-5">
                {rows.map((row) => (
                  <div className="space-y-2 py-3" key={row.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{row.courseCode}</p>
                        <p className="text-muted-foreground text-xs">
                          {row.courseTitle}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{row.grade ?? "—"}</p>
                    </div>
                    <dl className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <dt className="text-muted-foreground">Semester</dt>
                        <dd>{row.semester}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Credits</dt>
                        <dd className="tabular-nums">{row.creditUnits}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Score</dt>
                        <dd className="tabular-nums">
                          {formatScore(row.totalScore)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden overflow-x-auto px-5 pb-4 md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Course</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <p className="font-medium">{row.courseCode}</p>
                        <p className="text-muted-foreground text-xs">
                          {row.courseTitle}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm">{row.semester}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {row.creditUnits}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatScore(row.totalScore)}
                      </TableCell>
                      <TableCell>{row.grade ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border-border bg-muted/30 grid gap-3 border-t px-4 py-4 sm:grid-cols-3 sm:px-5">
              <div>
                <p className="text-muted-foreground text-xs uppercase">CGPA</p>
                <p className="font-semibold tabular-nums">{meta.cgpa}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase">
                  Credit units
                </p>
                <p className="font-semibold tabular-nums">
                  {meta.totalCreditUnits}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase">Period</p>
                <p className="text-sm">{currentAcademicPeriod.label}</p>
              </div>
            </div>
          </article>
        </div>

        <SheetFooter className="border-border shrink-0 gap-2 border-t px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:px-6">
          <Button
            className="w-full sm:flex-1"
            onClick={() => downloadTranscriptCsv({ rows, matricNo: meta.matricNo })}
            type="button"
            variant="outline"
          >
            <FileSpreadsheet />
            Download CSV
          </Button>
          <Button
            className="w-full sm:flex-1"
            onClick={() => printTranscriptDocument(rows, meta)}
            type="button"
          >
            <Printer />
            Print / Save as PDF
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
