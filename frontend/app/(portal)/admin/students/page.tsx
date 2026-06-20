import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminStudentsPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Manage student biodata, matric numbers, department, level, and academic status."
        nextStep="Wire this screen to student CRUD endpoints and student summary views."
        title="Students"
      />
    </AppShell>
  );
}
