import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminLecturersPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Manage lecturer records, staff numbers, departments, and course assignment readiness."
        nextStep="Wire this screen to lecturer CRUD endpoints and assignment lookups."
        title="Lecturers"
      />
    </AppShell>
  );
}
