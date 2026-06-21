"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { studentNavigation } from "@/content/navigation";
import { portalUsers } from "@/content/portal";
import { usePortalUser } from "@/hooks/use-portal-user";

export default function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = usePortalUser(portalUsers.student);

  return (
    <PortalShell
      navItems={studentNavigation}
      roleLabel="Student"
      user={user}
    >
      {children}
    </PortalShell>
  );
}
