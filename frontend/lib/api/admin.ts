import { apiGet } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import { adminDashboardSummary } from "@/content/demo-data/admin";
import {
  mapDashboardSummary,
  type ApiDashboardSummary,
  type DashboardSummary,
} from "@/types/api";

export async function getAdminDashboardSummary(): Promise<DashboardSummary> {
  if (usesMockData()) {
    return {
      activeStudents: adminDashboardSummary.activeStudents,
      lecturers: adminDashboardSummary.lecturers,
      departments: adminDashboardSummary.departments,
      courses: adminDashboardSummary.courses,
      activeRegistrations: adminDashboardSummary.activeRegistrations,
      uploadedResults: adminDashboardSummary.uploadedResults,
      currentSession: adminDashboardSummary.currentSession,
    };
  }

  const summary = await apiGet<ApiDashboardSummary>("/api/admin/dashboard");
  return mapDashboardSummary(summary);
}
