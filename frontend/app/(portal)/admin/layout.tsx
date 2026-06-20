"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { adminNavigation } from "@/content/navigation";
import { portalUsers } from "@/content/portal";

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalShell
      navItems={adminNavigation}
      roleLabel="Admin"
      user={portalUsers.admin}
    >
      {children}
    </PortalShell>
  );
}
