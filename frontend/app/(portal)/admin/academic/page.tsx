import { pageSeo } from "@/content/data/seo";
import { AdminAcademicSetupView } from "@/features/admin/components/admin-academic-setup-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.academic, "Admin");

export default function AdminAcademicPage() {
  return <AdminAcademicSetupView />;
}
