import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { studentNavigation } from "@/content/navigation";

export default function StudentRegistrationPage() {
  return (
    <AppShell
      navItems={studentNavigation}
      roleLabel="Student"
      userName="Batul Hassan"
    >
      <PlaceholderPage
        description="Register available course offerings for the current semester."
        nextStep="Implement after course_offering and course_registration SQL are ready."
        title="Course Registration"
      />
    </AppShell>
  );
}
