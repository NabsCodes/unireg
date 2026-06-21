import { pageSeo } from "@/content/data/seo";
import { AdminOfferingsView } from "@/features/admin/components/admin-offerings-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.offerings, "Admin");

export default function AdminOfferingsPage() {
  return <AdminOfferingsView />;
}
