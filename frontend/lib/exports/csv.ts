import type { ExportTable, ExportValue } from "@/lib/exports/types";

function escapeCsvCell(value: ExportValue): string {
  const stringValue = value == null ? "" : String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function renderCsv(table: ExportTable): string {
  return [table.headers, ...table.rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n");
}

export function downloadTextFile({
  filename,
  content,
  mimeType,
}: {
  filename: string;
  content: string;
  mimeType: string;
}) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
