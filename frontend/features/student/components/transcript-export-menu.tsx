"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  downloadTranscriptCsv,
  printTranscriptDocument,
} from "@/lib/exports/transcript";
import type { TranscriptExportMeta } from "@/lib/exports/types";
import type { StudentResultRow } from "@/types/academic";

type TranscriptExportMenuProps = {
  rows: StudentResultRow[];
  meta: TranscriptExportMeta;
  disabled?: boolean;
};

export function TranscriptExportMenu({
  rows,
  meta,
  disabled = false,
}: TranscriptExportMenuProps) {
  const [exporting, setExporting] = useState<"csv" | "pdf" | null>(null);

  async function handleCsvExport() {
    setExporting("csv");
    try {
      downloadTranscriptCsv({ rows, matricNo: meta.matricNo });
    } finally {
      setExporting(null);
    }
  }

  async function handlePdfExport() {
    setExporting("pdf");
    try {
      printTranscriptDocument(rows, meta);
    } finally {
      setExporting(null);
    }
  }

  const isBusy = exporting !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled || isBusy || rows.length === 0} variant="outline">
          {isBusy ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Download />
          )}
          {isBusy ? "Exporting..." : "Export"}
          {!isBusy ? <ChevronDown /> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Transcript export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isBusy} onClick={handleCsvExport}>
          <FileSpreadsheet />
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isBusy} onClick={handlePdfExport}>
          <FileText />
          Print / Save as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
