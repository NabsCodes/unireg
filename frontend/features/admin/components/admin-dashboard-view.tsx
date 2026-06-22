"use client";

import { PageHeader } from "@/components/layout/page-header";
import { QueryState } from "@/components/shared/query-state";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentAcademicPeriod } from "@/content/data/portal";
import { useAdminDashboard } from "@/features/admin/api/use-admin-dashboard";
import { useAdminRecentActivity } from "@/features/admin/api/use-admin-recent-activity";
import { PortalPage } from "@/features/portal/components/portal-page";

export function AdminDashboardView() {
  const { data, isLoading, isError, error } = useAdminDashboard();
  const {
    data: activity = [],
    isLoading: activityLoading,
    isError: activityError,
    error: activityQueryError,
  } = useAdminRecentActivity();

  return (
    <PortalPage>
      <PageHeader
        title="Admin Dashboard"
        description="Manage academic setup, course offerings, registrations, and registry corrections."
      />

      <QueryState
        error={error}
        errorLabel="Could not load dashboard summary."
        isError={isError}
        isLoading={isLoading}
        loadingLabel="Loading dashboard summary..."
        variant="dashboard"
      >
        {data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Students"
                value={String(data.activeStudents)}
                helper="Active academic records"
              />
              <StatCard
                label="Courses"
                value={String(data.courses)}
                helper="Across all departments"
              />
              <StatCard
                label="Registrations"
                value={String(data.activeRegistrations)}
                helper={currentAcademicPeriod.label}
              />
              <StatCard
                label="Results Uploaded"
                value={String(data.uploadedResults)}
                helper="First semester scores recorded"
              />
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-muted-foreground text-sm">
                  Latest audit events from result uploads and system changes.
                </p>
              </CardHeader>
              <CardContent>
                <QueryState
                  error={activityQueryError}
                  errorLabel="Could not load recent activity."
                  isError={activityError}
                  isLoading={activityLoading}
                  loadingLabel="Loading recent activity..."
                  variant="list"
                >
                  {activity.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No audit activity yet. Result uploads and admin changes
                      will appear here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {activity.map((item) => (
                        <div
                          className="border-border flex flex-col gap-0.5 border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                          key={item.id}
                        >
                          <p className="text-foreground text-sm">{item.text}</p>
                          <p className="text-muted-foreground shrink-0 text-xs">
                            {item.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </QueryState>
              </CardContent>
            </Card>
          </>
        ) : null}
      </QueryState>
    </PortalPage>
  );
}
