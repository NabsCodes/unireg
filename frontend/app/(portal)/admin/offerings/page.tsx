import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { adminNavigation } from "@/content/navigation";

export default function AdminOfferingsPage() {
  return (
    <AppShell
      navItems={adminNavigation}
      roleLabel="Admin"
      userName="Admin User"
    >
      <PlaceholderPage
        description="Create semester-specific course offerings and assign lecturers."
        nextStep="Implement offerings after sessions, semesters, courses, and lecturers exist."
        title="Course Offerings"
      />
    </AppShell>
  );
}

