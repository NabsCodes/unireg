"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAdminSemesters,
  useAdminSessions,
} from "@/features/admin/api/use-admin-lists";
import {
  SemesterFormDialog,
  SessionFormDialog,
} from "@/features/admin/components/admin-crud-dialogs";
import { PortalPage } from "@/features/portal/components/portal-page";
import type { SemesterRow, SessionRow } from "@/types/academic";

const sessionColumns: ColumnDef<SessionRow>[] = [
  {
    accessorKey: "name",
    header: "Session",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start",
  },
  {
    accessorKey: "endDate",
    header: "End",
  },
  {
    accessorKey: "isCurrent",
    header: "Current",
    cell: ({ row }) =>
      row.original.isCurrent ? (
        <StatusBadge label="Current" tone="active" />
      ) : (
        "—"
      ),
  },
];

const semesterColumns: ColumnDef<SemesterRow>[] = [
  {
    accessorKey: "sessionName",
    header: "Session",
  },
  {
    accessorKey: "name",
    header: "Semester",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start",
  },
  {
    accessorKey: "endDate",
    header: "End",
  },
];

export function AdminAcademicSetupView() {
  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
    error: sessionsErr,
  } = useAdminSessions();
  const {
    data: semesters = [],
    isLoading: semestersLoading,
    isError: semestersError,
    error: semestersErr,
  } = useAdminSemesters();

  const [sessionOpen, setSessionOpen] = useState(false);
  const [semesterOpen, setSemesterOpen] = useState(false);

  return (
    <PortalPage>
      <PageHeader
        description="Configure academic sessions and semesters used when publishing course offerings."
        title="Academic Setup"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-base">Sessions</CardTitle>
            <Button onClick={() => setSessionOpen(true)} size="sm">
              <Plus />
              Add session
            </Button>
          </CardHeader>
          <CardContent>
            <QueryState
              error={sessionsErr}
              errorLabel="Could not load sessions."
              isError={sessionsError}
              isLoading={sessionsLoading}
              loadingLabel="Loading sessions..."
              variant="table"
              rows={3}
            >
              <DataTable
                columns={sessionColumns}
                data={sessions}
                emptyDescription="Create a session to begin academic setup."
                emptyTitle="No sessions"
                searchKey="name"
                searchPlaceholder="Search sessions..."
                showSerialNumber={false}
              />
            </QueryState>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-base">Semesters</CardTitle>
            <Button onClick={() => setSemesterOpen(true)} size="sm">
              <Plus />
              Add semester
            </Button>
          </CardHeader>
          <CardContent>
            <QueryState
              error={semestersErr}
              errorLabel="Could not load semesters."
              isError={semestersError}
              isLoading={semestersLoading}
              loadingLabel="Loading semesters..."
              variant="table"
              rows={3}
            >
              <DataTable
                columns={semesterColumns}
                data={semesters}
                emptyDescription="Add semesters under an academic session."
                emptyTitle="No semesters"
                searchKey="name"
                searchPlaceholder="Search semesters..."
                showSerialNumber={false}
              />
            </QueryState>
          </CardContent>
        </Card>
      </div>

      <SessionFormDialog onOpenChange={setSessionOpen} open={sessionOpen} />
      <SemesterFormDialog onOpenChange={setSemesterOpen} open={semesterOpen} />
    </PortalPage>
  );
}
