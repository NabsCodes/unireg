import { pageSeo } from "@/content/seo";
import { StudentResultsView } from "@/features/student/components/student-results-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.student.results,
  "Student",
);

export default function StudentResultsPage() {
  return <StudentResultsView />;
}
