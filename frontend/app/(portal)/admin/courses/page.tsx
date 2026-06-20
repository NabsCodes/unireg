import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminCoursesPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Manage the course catalog, including course code, title, credit units, level, and department."
        nextStep="Wire this screen to the courses table after schema and seed data are ready."
        title="Courses"
      />
    </AppShell>
  );
}
