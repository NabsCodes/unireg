"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { adminNavigation } from "@/content/data/navigation";
import { portalUsers } from "@/content/data/portal";
import { usePortalUser } from "@/hooks/use-portal-user";

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = usePortalUser(portalUsers.admin);

  return (
    <PortalShell navItems={adminNavigation} roleLabel="Admin" user={user}>
      {children}
    </PortalShell>
  );
}
