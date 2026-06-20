export type ExportValue = string | number | null | undefined;

export type ExportTable = {
  headers: string[];
  rows: ExportValue[][];
};

export type TranscriptExportMeta = {
  name: string;
  matricNo: string;
  department: string;
  level: string;
  cgpa: string;
  totalCreditUnits: number;
  sessionLabel: string;
};
