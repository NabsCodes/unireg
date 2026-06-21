import { Suspense } from "react";

import { pageSeo } from "@/content/seo";
import { LecturerResultsView } from "@/features/lecturer/components/lecturer-results-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.lecturer.results,
  "Lecturer",
);

export default function LecturerResultsPage() {
  return (
    <Suspense fallback={null}>
      <LecturerResultsView />
    </Suspense>
  );
}
