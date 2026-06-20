import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { studentNavigation } from "@/content/navigation";

export default function StudentResultsPage() {
  return (
    <AppShell
      navItems={studentNavigation}
      roleLabel="Student"
      userName="Batul Hassan"
    >
      <PlaceholderPage
        description="Display semester scores, grades, grade points, and GPA."
        nextStep="Wire this to the semester results view and GPA function."
        title="Results"
      />
    </AppShell>
  );
}

