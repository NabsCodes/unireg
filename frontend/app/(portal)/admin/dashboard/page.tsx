import { pageSeo } from "@/content/data/seo";
import { AdminDashboardView } from "@/features/admin/components/admin-dashboard-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.dashboard, "Admin");

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
