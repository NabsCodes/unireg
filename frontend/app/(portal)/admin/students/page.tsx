import { pageSeo } from "@/content/seo";
import { AdminStudentsView } from "@/features/admin/components/admin-students-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.students, "Admin");

export default function AdminStudentsPage() {
  return <AdminStudentsView />;
}
