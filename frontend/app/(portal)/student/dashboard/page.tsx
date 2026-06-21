import { pageSeo } from "@/content/data/seo";
import { StudentDashboardView } from "@/features/student/components/student-dashboard-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.student.dashboard,
  "Student",
);

export default function StudentDashboardPage() {
  return <StudentDashboardView />;
}
