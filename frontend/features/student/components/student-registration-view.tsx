"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { studentProfile } from "@/content/demo-data/student";
import { currentAcademicPeriod } from "@/content/portal";
import { semesterFilter } from "@/content/table-filters";
import { useStudentRegistrationOfferings } from "@/features/student/api/use-student-registration";
import { RegistrationOfferingCard } from "@/features/student/components/student-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import type { AvailableOfferingRow } from "@/types/academic";

const columns: ColumnDef<AvailableOfferingRow>[] = [
  {
    id: "course",
    header: "Course",
    accessorFn: (row) => `${row.courseCode} ${row.courseTitle}`,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.courseCode}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.courseTitle}
        </p>
      </div>
    ),
  },
  {
    id: "isRegistered",
    accessorFn: (row) => String(row.isRegistered),
    header: "Registration state",
  },
  {
    accessorKey: "creditUnits",
    header: "Credits",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("creditUnits")}</span>
    ),
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    id: "slots",
    header: "Slots",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.registered}/{row.original.capacity}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Offering",
    cell: ({ row }) => {
      const status = row.getValue("status") as AvailableOfferingRow["status"];
      return (
        <StatusBadge
          label={status === "open" ? "Open" : "Closed"}
          tone={status === "open" ? "active" : "draft"}
        />
      );
    },
  },
  {
    id: "action",
    header: "Registration",
    cell: ({ row }) =>
      row.original.isRegistered ? (
        <StatusBadge label="Registered" tone="active" />
      ) : (
        <Button disabled size="sm" variant="outline">
          Register
        </Button>
      ),
  },
];

export function StudentRegistrationView() {
  const { data = [], isLoading, isError, error } =
    useStudentRegistrationOfferings(studentProfile.matricNo);

  const registrationTabs = useMemo(
    () => ({
      columnId: "isRegistered",
      ariaLabel: "Filter offerings by registration status",
      options: [
        {
          value: ALL_FILTER_VALUE,
          label: "All",
          count: data.length,
        },
        {
          value: "true",
          label: "Registered",
          count: data.filter((offering) => offering.isRegistered).length,
        },
        {
          value: "false",
          label: "Available",
          count: data.filter((offering) => !offering.isRegistered).length,
        },
      ],
    }),
    [data],
  );

  return (
    <PortalPage>
      <PageHeader
        title="Course Registration"
        description={`${studentProfile.name} (${studentProfile.matricNo}) · ${currentAcademicPeriod.label}`}
      />
      <QueryState
        error={error}
        errorLabel="Could not load course offerings."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading course offerings..."
      >
        <DataTable
          columns={columns}
          data={data}
          emptyDescription="No course offerings are available for registration in this period."
          emptyTitle="No offerings available"
          filterTabs={registrationTabs}
          filters={[semesterFilter]}
          hiddenColumnIds={["isRegistered"]}
          renderMobileCard={(row) => (
            <RegistrationOfferingCard offering={row.original} />
          )}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
