import { pageSeo } from "@/content/seo";
import { AdminCoursesView } from "@/features/admin/components/admin-courses-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.courses, "Admin");

export default function AdminCoursesPage() {
  return <AdminCoursesView />;
}
