import { pageSeo } from "@/content/data/seo";
import { LecturerDashboardView } from "@/features/lecturer/components/lecturer-dashboard-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.lecturer.dashboard,
  "Lecturer",
);

export default function LecturerDashboardPage() {
  return <LecturerDashboardView />;
}
