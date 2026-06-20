import { pageSeo } from "@/content/seo";
import { AdminAuditLogsView } from "@/features/admin/components/admin-audit-logs-view";
import { createPortalMetadata } from "@/lib/metadata";

export const metadata = createPortalMetadata(pageSeo.admin.auditLogs, "Admin");

export default function AdminAuditLogsPage() {
  return <AdminAuditLogsView />;
}
