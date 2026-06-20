import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { lecturerNavigation } from "@/content/navigation";

export default function LecturerResultsPage() {
  return (
    <AppShell
      navItems={lecturerNavigation}
      roleLabel="Lecturer"
      userName="Dr. Gabriel Ayem"
    >
      <PlaceholderPage
        description="Upload CA and exam scores for students registered in assigned course offerings."
        nextStep="Implement after result table, grade trigger, and audit trigger are ready."
        title="Result Upload"
      />
    </AppShell>
  );
}
