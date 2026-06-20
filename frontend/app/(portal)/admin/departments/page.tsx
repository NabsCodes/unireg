import { pageSeo } from "@/content/seo";
import { AdminDepartmentsView } from "@/features/admin/components/admin-departments-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(
  pageSeo.admin.departments,
  "Admin",
);

export default function AdminDepartmentsPage() {
  return <AdminDepartmentsView />;
}
