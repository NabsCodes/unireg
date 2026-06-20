import { pageSeo } from "@/content/seo";
import { AdminLecturersView } from "@/features/admin/components/admin-lecturers-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.lecturers, "Admin");

export default function AdminLecturersPage() {
  return <AdminLecturersView />;
}
