import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { studentNavigation } from "@/content/navigation";

export default function StudentTranscriptPage() {
  return (
    <AppShell
      navItems={studentNavigation}
      roleLabel="Student"
      userName="Batul Hassan"
    >
      <PlaceholderPage
        description="Generate an academic transcript with course history, semester GPA, and CGPA."
        nextStep="Wire this to the transcript view after SQL views and functions are complete."
        title="Transcript"
      />
    </AppShell>
  );
}

