import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminAuditLogsPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Review sensitive system actions such as result uploads and updates."
        nextStep="Wire this to audit logs after triggers are implemented."
        title="Audit Logs"
      />
    </AppShell>
  );
}

