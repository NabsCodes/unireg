"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portalUsers } from "@/content/data/portal";
import { useLecturerCourses } from "@/features/lecturer/api/use-lecturer-courses";
import { useLecturerOfferingResults } from "@/features/lecturer/api/use-upload-result";
import { ResultUploadAction } from "@/features/lecturer/components/result-upload-dialog";
import { ResultUploadCard } from "@/features/lecturer/components/lecturer-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import { useLecturerScope, usePortalUser } from "@/hooks/use-portal-user";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import type { ResultUploadRow } from "@/types/academic";

function formatScore(value: number | null): string {
  return value === null ? "—" : String(value);
}

export function LecturerResultsView() {
  const user = usePortalUser(portalUsers.lecturer);
  const staffNo = useLecturerScope(
    portalUsers.lecturer.identifier ?? "STF-CS-001",
  );
  const searchParams = useSearchParams();
  const offeringFromUrl = (() => {
    const offeringParam = searchParams.get("offering");
    if (!offeringParam) return null;
    const parsed = Number(offeringParam);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  })();

  const { data: courses = [], isLoading: coursesLoading } =
    useLecturerCourses(staffNo);

  const [selectedOfferingId, setSelectedOfferingId] = useState<number | null>(
    null,
  );

  const activeOfferingId =
    selectedOfferingId ?? offeringFromUrl ?? courses[0]?.offeringId ?? null;

  const selectedCourse =
    courses.find((course) => course.offeringId === activeOfferingId) ??
    courses[0] ??
    null;

  const {
    data: roster = [],
    isLoading: rosterLoading,
    isError,
    error,
  } = useLecturerOfferingResults(staffNo, activeOfferingId);

  const sortedRoster = useMemo(
    () =>
      [...roster].sort((a, b) => {
        if (a.status === b.status) {
          return a.studentName.localeCompare(b.studentName);
        }

        return a.status === "Pending" ? -1 : 1;
      }),
    [roster],
  );

  const pendingCount = sortedRoster.filter(
    (row) => row.status === "Pending",
  ).length;
  const uploadedCount = sortedRoster.filter(
    (row) => row.status === "Uploaded",
  ).length;

  const columns = useMemo<ColumnDef<ResultUploadRow>[]>(
    () => [
      {
        accessorKey: "matricNo",
        header: "Matric No.",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("matricNo")}</span>
        ),
      },
      {
        accessorKey: "studentName",
        header: "Student",
      },
      {
        accessorKey: "caScore",
        header: "CA",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatScore(row.getValue("caScore"))}
          </span>
        ),
      },
      {
        accessorKey: "examScore",
        header: "Exam",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatScore(row.getValue("examScore"))}
          </span>
        ),
      },
      {
        accessorKey: "totalScore",
        header: "Total",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">
            {formatScore(row.getValue("totalScore"))}
          </span>
        ),
      },
      {
        accessorKey: "grade",
        header: "Grade",
        cell: ({ row }) => {
          const grade = row.getValue("grade") as string | null;
          return grade ?? "—";
        },
      },
      {
        accessorKey: "status",
        header: "Result status",
        cell: ({ row }) => {
          const status = row.getValue("status") as ResultUploadRow["status"];
          return (
            <StatusBadge
              label={status}
              tone={status === "Uploaded" ? "completed" : "pending"}
            />
          );
        },
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) =>
          activeOfferingId ? (
            <ResultUploadAction
              offeringId={activeOfferingId}
              row={row.original}
              staffNo={staffNo}
            />
          ) : null,
      },
    ],
    [activeOfferingId, staffNo],
  );

  const resultTabs = useMemo(
    () => ({
      columnId: "status",
      ariaLabel: "Filter students by result status",
      options: [
        {
          value: ALL_FILTER_VALUE,
          label: "All",
          count: sortedRoster.length,
        },
        {
          value: "Pending",
          label: "Awaiting upload",
          count: pendingCount,
        },
        {
          value: "Uploaded",
          label: "Uploaded",
          count: uploadedCount,
        },
      ],
    }),
    [pendingCount, sortedRoster.length, uploadedCount],
  );

  return (
    <PortalPage>
      <PageHeader
        description="This is where you upload new results and edit existing scores. Assigned Courses is read-only — use this page for all score entry."
        title="Upload Results"
      />

      <Card>
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">
              {selectedCourse
                ? `${selectedCourse.courseCode} · ${selectedCourse.courseTitle}`
                : "Select a course offering"}
            </CardTitle>
            {selectedCourse ? (
              <p className="text-muted-foreground text-sm">
                {selectedCourse.session} · {selectedCourse.semester} ·{" "}
                {user.name}
              </p>
            ) : null}
          </div>
          {courses.length > 0 ? (
            <Select
              onValueChange={(value) => setSelectedOfferingId(Number(value))}
              value={activeOfferingId ? String(activeOfferingId) : undefined}
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Select offering" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem
                    key={course.offeringId}
                    value={String(course.offeringId)}
                  >
                    {course.courseCode} · {course.semester}
                    {course.resultsUploaded < course.registeredStudents
                      ? " · pending uploads"
                      : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState
            error={error}
            errorLabel="Could not load registered students."
            isError={isError}
            isLoading={coursesLoading || rosterLoading}
            loadingLabel="Loading registered students..."
            variant="panel"
            rows={5}
          >
            {courses.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No assigned course offerings yet.
              </p>
            ) : (
              <>
                <section className="grid gap-4 sm:grid-cols-2">
                  <StatCard
                    label="Awaiting upload"
                    value={String(pendingCount)}
                    helper="Click Upload scores on each pending row"
                  />
                  <StatCard
                    label="Already uploaded"
                    value={String(uploadedCount)}
                    helper="Use Edit scores to change existing entries"
                  />
                </section>

                {pendingCount === 0 && sortedRoster.length > 0 ? (
                  <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-2 text-sm">
                    All registered students already have scores for this
                    offering. Use <strong>Edit scores</strong> to change an
                    existing result.
                  </p>
                ) : null}

                {pendingCount > 0 ? (
                  <p className="text-foreground border-unireg-warning/30 bg-unireg-warning-subtle rounded-lg border px-3 py-2 text-sm">
                    {pendingCount} student{pendingCount === 1 ? "" : "s"} still
                    need scores. Use the <strong>Awaiting upload</strong> tab,
                    then click <strong>Upload scores</strong>.
                  </p>
                ) : null}

                <DataTable
                  columns={columns}
                  data={sortedRoster}
                  emptyDescription="Registered students will appear here once the offering is active."
                  emptyTitle="No registered students"
                  filterTabs={resultTabs}
                  renderMobileCard={(row) => (
                    <div className="space-y-3">
                      <ResultUploadCard row={row.original} />
                      {activeOfferingId ? (
                        <ResultUploadAction
                          offeringId={activeOfferingId}
                          row={row.original}
                          staffNo={staffNo}
                        />
                      ) : null}
                    </div>
                  )}
                  searchKey="studentName"
                  searchPlaceholder="Search by student name..."
                  showSerialNumber={false}
                />
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </PortalPage>
  );
}
