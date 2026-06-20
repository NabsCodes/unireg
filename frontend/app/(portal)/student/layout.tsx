"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { studentNavigation } from "@/content/navigation";
import { portalUsers } from "@/content/portal";

export default function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalShell
      navItems={studentNavigation}
      roleLabel="Student"
      user={portalUsers.student}
    >
      {children}
    </PortalShell>
  );
}
