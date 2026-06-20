"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { lecturerNavigation } from "@/content/navigation";
import { portalUsers } from "@/content/portal";

export default function LecturerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalShell
      navItems={lecturerNavigation}
      roleLabel="Lecturer"
      user={portalUsers.lecturer}
    >
      {children}
    </PortalShell>
  );
}
