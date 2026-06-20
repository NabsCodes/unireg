import { downloadTextFile, renderCsv } from "@/lib/exports/csv";
import type { ExportTable, TranscriptExportMeta } from "@/lib/exports/types";
import type { StudentResultRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "" : String(value);
}

export function buildTranscriptExportTable(
  rows: StudentResultRow[],
): ExportTable {
  return {
    headers: [
      "Session",
      "Semester",
      "Course Code",
      "Course Title",
      "Credit Units",
      "Total Score",
      "Grade",
      "Grade Point",
    ],
    rows: rows.map((row) => [
      row.session,
      row.semester,
      row.courseCode,
      row.courseTitle,
      row.creditUnits,
      formatScore(row.totalScore),
      row.grade ?? "",
      row.gradePoint ?? "",
    ]),
  };
}

export function downloadTranscriptCsv({
  rows,
  matricNo,
}: {
  rows: StudentResultRow[];
  matricNo: string;
}) {
  const table = buildTranscriptExportTable(rows);
  const csv = renderCsv(table);
  downloadTextFile({
    filename: `transcript-${matricNo}.csv`,
    content: csv,
    mimeType: "text/csv;charset=utf-8",
  });
}

function buildTranscriptPrintHtml(
  rows: StudentResultRow[],
  meta: TranscriptExportMeta,
): string {
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td>${row.session}</td>
          <td>${row.semester}</td>
          <td>${row.courseCode}</td>
          <td>${row.courseTitle}</td>
          <td class="num">${row.creditUnits}</td>
          <td class="num">${formatScore(row.totalScore) || "—"}</td>
          <td>${row.grade ?? "—"}</td>
          <td class="num">${row.gradePoint ?? "—"}</td>
        </tr>
      `,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Transcript · ${meta.name}</title>
    <style>
      body {
        font-family: Georgia, "Times New Roman", serif;
        color: #111827;
        margin: 40px;
        line-height: 1.5;
      }
      .header {
        border-bottom: 3px solid #7A1F2E;
        padding-bottom: 16px;
        margin-bottom: 24px;
      }
      .brand {
        color: #7A1F2E;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }
      .subtitle {
        color: #6B7280;
        font-size: 13px;
        margin-top: 4px;
      }
      .meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px 24px;
        margin-bottom: 24px;
        font-size: 14px;
      }
      .meta dt {
        color: #6B7280;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .meta dd {
        margin: 2px 0 0;
        font-weight: 600;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      th, td {
        border: 1px solid #D1D5DB;
        padding: 8px 10px;
        text-align: left;
        vertical-align: top;
      }
      th {
        background: #F9FAFB;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .num {
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .summary {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #E5E7EB;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        font-size: 14px;
      }
      .footer {
        margin-top: 32px;
        color: #6B7280;
        font-size: 11px;
      }
      @media print {
        body { margin: 24px; }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="brand">UniReg</div>
      <div class="subtitle">Official Academic Transcript</div>
    </div>
    <dl class="meta">
      <div><dt>Student</dt><dd>${meta.name}</dd></div>
      <div><dt>Matric Number</dt><dd>${meta.matricNo}</dd></div>
      <div><dt>Department</dt><dd>${meta.department}</dd></div>
      <div><dt>Level</dt><dd>${meta.level}</dd></div>
    </dl>
    <table>
      <thead>
        <tr>
          <th>Session</th>
          <th>Semester</th>
          <th>Code</th>
          <th>Course</th>
          <th>Credits</th>
          <th>Score</th>
          <th>Grade</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div class="summary">
      <div><strong>CGPA:</strong> ${meta.cgpa}</div>
      <div><strong>Total Credit Units:</strong> ${meta.totalCreditUnits}</div>
      <div><strong>Generated:</strong> ${meta.sessionLabel}</div>
    </div>
    <p class="footer">
      Generated from UniReg. This document is produced from published academic records.
    </p>
  </body>
</html>`;
}

export function printTranscriptDocument(
  rows: StudentResultRow[],
  meta: TranscriptExportMeta,
) {
  const html = buildTranscriptPrintHtml(rows, meta);
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  const frameWindow = iframe.contentWindow;
  const frameDocument = frameWindow?.document;

  if (!frameWindow || !frameDocument) {
    iframe.remove();
    return;
  }

  frameDocument.open();
  frameDocument.write(html);
  frameDocument.close();

  const cleanup = () => {
    iframe.remove();
  };

  frameWindow.addEventListener("afterprint", cleanup, { once: true });
  window.setTimeout(cleanup, 60_000);

  frameWindow.focus();
  frameWindow.print();
}

/** @deprecated Use printTranscriptDocument */
export function openTranscriptPdfExport(
  rows: StudentResultRow[],
  meta: TranscriptExportMeta,
) {
  printTranscriptDocument(rows, meta);
}

