import { pageSeo } from "@/content/seo";
import { StudentRegistrationView } from "@/features/student/components/student-registration-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.student.registration,
  "Student",
);

export default function StudentRegistrationPage() {
  return <StudentRegistrationView />;
}
