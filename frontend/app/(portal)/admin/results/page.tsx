import { pageSeo } from "@/content/data/seo";
import { AdminResultsView } from "@/features/admin/components/admin-results-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.results, "Admin");

export default function AdminResultsPage() {
  return <AdminResultsView />;
}
