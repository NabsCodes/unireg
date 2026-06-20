import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminDepartmentsPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Manage departments, faculties, and head-of-department assignment."
        nextStep="Wire this screen to the departments table after the schema is created."
        title="Departments"
      />
    </AppShell>
  );
}

