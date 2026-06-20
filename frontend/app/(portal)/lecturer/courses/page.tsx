import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { lecturerNavigation } from "@/content/navigation";

export default function LecturerCoursesPage() {
  return (
    <AppShell
      navItems={lecturerNavigation}
      roleLabel="Lecturer"
      userName="Dr. Gabriel Ayem"
    >
      <PlaceholderPage
        description="List course offerings assigned to the signed-in lecturer."
        nextStep="Wire this to course_assignment and course_offering joins."
        title="Assigned Courses"
      />
    </AppShell>
  );
}
