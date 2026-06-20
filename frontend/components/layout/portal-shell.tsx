"use client";

import type { ReactNode } from "react";
import type { PortalUser } from "@/content/portal";
import { SidebarLayout } from "./sidebar/layout";
import type { SidebarNavItem } from "./sidebar/sidebar-nav";
import { Topbar } from "./topbar";

interface PortalShellProps {
  children: ReactNode;
  navItems: SidebarNavItem[];
  roleLabel: string;
  user: PortalUser;
  defaultCollapsed?: boolean;
}

export function PortalShell({
  children,
  navItems,
  roleLabel,
  user,
  defaultCollapsed,
}: PortalShellProps) {
  return (
    <SidebarLayout
      navItems={navItems}
      roleLabel={roleLabel}
      user={user}
      defaultCollapsed={defaultCollapsed}
      topbar={<Topbar user={user} />}
    >
      {children}
    </SidebarLayout>
  );
}
