"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { currentAcademicPeriod, portalUsers } from "@/content/data/portal";
import { semesterFilter } from "@/content/data/table-filters";
import { useStudentRegistrationOfferings } from "@/features/student/api/use-student-registration";
import { RegistrationActions } from "@/features/student/components/registration-actions";
import { RegistrationStatusBadge } from "@/features/student/components/registration-status-badge";
import { RegistrationOfferingCard } from "@/features/student/components/student-list-cards";
import { PortalPage } from "@/features/portal/components/portal-page";
import { usePortalUser, useStudentScope } from "@/hooks/use-portal-user";
import { ALL_FILTER_VALUE } from "@/lib/data-table/column-filters";
import { getRegistrationDisplayState } from "@/lib/academic/registration-state";
import type { AvailableOfferingRow } from "@/types/academic";

export function StudentRegistrationView() {
  const user = usePortalUser(portalUsers.student);
  const matricNo = useStudentScope(
    portalUsers.student.identifier ?? "A00025332",
  );
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useStudentRegistrationOfferings(matricNo);

  const columns = useMemo<ColumnDef<AvailableOfferingRow>[]>(
    () => [
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
        header: "Registered filter",
      },
      {
        id: "registrationState",
        header: "Your status",
        accessorFn: (row) => getRegistrationDisplayState(row),
        cell: ({ row }) => <RegistrationStatusBadge offering={row.original} />,
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
        header: "Offering status",
        cell: ({ row }) => {
          const status = row.getValue(
            "status",
          ) as AvailableOfferingRow["status"];
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
        cell: ({ row }) => (
          <RegistrationActions matricNo={matricNo} offering={row.original} />
        ),
      },
    ],
    [matricNo],
  );

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
          label: "My courses",
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
        description={`${user.name} (${user.identifier ?? matricNo}) · Browse open offerings, register for courses, or manage your current registrations for ${currentAcademicPeriod.label}.`}
      />

      {!isLoading && data.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Open offerings"
            value={String(data.length)}
            helper="Available this session"
          />
          <StatCard
            label="My courses"
            value={String(
              data.filter((offering) => offering.isRegistered).length,
            )}
            helper="Currently registered"
          />
          <StatCard
            label="Available to register"
            value={String(
              data.filter((offering) => !offering.isRegistered).length,
            )}
            helper="Not registered yet"
          />
        </section>
      ) : null}

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
            <RegistrationOfferingCard
              matricNo={matricNo}
              offering={row.original}
            />
          )}
          searchKey="course"
          searchPlaceholder="Search by course code or title..."
        />
      </QueryState>
    </PortalPage>
  );
}
