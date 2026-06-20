import { pageSeo } from "@/content/seo";
import { LecturerCoursesView } from "@/features/lecturer/components/lecturer-courses-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.lecturer.courses,
  "Lecturer",
);

export default function LecturerCoursesPage() {
  return <LecturerCoursesView />;
}
