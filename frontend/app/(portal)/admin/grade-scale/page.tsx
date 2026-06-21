import { pageSeo } from "@/content/data/seo";
import { AdminGradeScaleView } from "@/features/admin/components/admin-grade-scale-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.gradeScale, "Admin");

export default function AdminGradeScalePage() {
  return <AdminGradeScaleView />;
}
