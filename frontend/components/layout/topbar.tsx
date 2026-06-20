"use client";

import type { PortalUser } from "@/content/portal";
import { currentAcademicPeriod } from "@/content/portal";
import { SidebarTrigger } from "./sidebar/trigger";
import { UserMenu } from "./user-menu";

interface TopbarProps {
  user: PortalUser;
}

export function Topbar({ user }: TopbarProps) {
  return (
    <header className="h-unireg-topbar border-border bg-card sticky top-0 z-30 flex items-center gap-3 border-b px-4 sm:gap-4 sm:px-5">
      <SidebarTrigger />

      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-medium">
          {currentAcademicPeriod.label}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {currentAcademicPeriod.helper}
        </p>
      </div>

      <UserMenu user={user} />
    </header>
  );
}
