import { pageSeo } from "@/content/seo";
import { StudentTranscriptView } from "@/features/student/components/student-transcript-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.student.transcript,
  "Student",
);

export default function StudentTranscriptPage() {
  return <StudentTranscriptView />;
}
