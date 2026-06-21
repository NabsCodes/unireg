"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { PortalUser } from "@/content/data/portal";
import { SidebarProvider, useSidebar } from "./context";
import { SidebarNav, type SidebarNavItem } from "./sidebar-nav";

interface SidebarLayoutProps {
  children: ReactNode;
  topbar: ReactNode;
  navItems: SidebarNavItem[];
  roleLabel: string;
  user: PortalUser;
  defaultCollapsed?: boolean;
}

export function SidebarLayout({
  children,
  topbar,
  navItems,
  roleLabel,
  user,
  defaultCollapsed = false,
}: SidebarLayoutProps) {
  return (
    <SidebarProvider defaultCollapsed={defaultCollapsed}>
      <SidebarLayoutInner
        topbar={topbar}
        navItems={navItems}
        roleLabel={roleLabel}
        user={user}
      >
        {children}
      </SidebarLayoutInner>
    </SidebarProvider>
  );
}

function SidebarLayoutInner({
  children,
  topbar,
  navItems,
  roleLabel,
  user,
}: Omit<SidebarLayoutProps, "defaultCollapsed">) {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <div
      data-unireg-collapsed={collapsed}
      className="group/shell bg-unireg-page text-foreground relative min-h-screen"
    >
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden h-screen overflow-hidden md:block",
          "w-unireg-sidebar group-data-[unireg-collapsed=true]/shell:w-unireg-sidebar-collapsed",
          "transition-[width] duration-200 ease-linear motion-reduce:transition-none",
        )}
      >
        <SidebarNav items={navItems} roleLabel={roleLabel} user={user} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="animate-in fade-in-0 absolute inset-0 bg-slate-950/45 duration-200"
            onClick={closeMobile}
          />
          <div className="w-unireg-sidebar animate-in slide-in-from-left-4 relative h-full overflow-hidden duration-200">
            <SidebarNav
              items={navItems}
              roleLabel={roleLabel}
              user={user}
              forceExpanded
              onNavigate={closeMobile}
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex min-h-screen min-w-0 flex-col",
          "md:pl-unireg-sidebar group-data-[unireg-collapsed=true]/shell:md:pl-unireg-sidebar-collapsed",
          "transition-[padding-left] duration-200 ease-linear motion-reduce:transition-none",
        )}
      >
        {topbar}
        <main className="flex-1">
          <div className="unireg-page-frame">{children}</div>
        </main>
      </div>
    </div>
  );
}
