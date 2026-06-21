"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { lecturerNavigation } from "@/content/navigation";
import { portalUsers } from "@/content/portal";
import { usePortalUser } from "@/hooks/use-portal-user";

export default function LecturerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = usePortalUser(portalUsers.lecturer);

  return (
    <PortalShell
      navItems={lecturerNavigation}
      roleLabel="Lecturer"
      user={user}
    >
      {children}
    </PortalShell>
  );
}
