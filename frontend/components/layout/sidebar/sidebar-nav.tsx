"use client";

import type { PortalUser } from "@/content/portal";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";
import { GraduationCap } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useSidebar } from "./context";
import { SidebarProfile } from "./sidebar-profile";

export type SidebarNavItem = {
  label: string;
  href: Route;
  icon: LucideIcon;
};

interface SidebarNavProps {
  items: SidebarNavItem[];
  roleLabel: string;
  user: PortalUser;
  forceExpanded?: boolean;
  onNavigate?: () => void;
}

function isNavPathActive(pathname: string, href: Route): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({
  items,
  roleLabel,
  user,
  forceExpanded = false,
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const effectiveCollapsed = forceExpanded ? false : collapsed;

  return (
    <div
      data-collapsed={effectiveCollapsed}
      className="group/sidebar bg-unireg-shell-gradient flex h-full min-h-screen flex-col overflow-hidden text-white"
    >
      <SidebarBrand roleLabel={roleLabel} />

      <nav className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = isNavPathActive(pathname, item.href);
            const link = (
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex h-9 w-full items-center gap-3 overflow-hidden rounded-lg px-3 text-sm font-medium",
                  "transition-colors duration-150 motion-reduce:transition-none",
                  "group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:gap-0 group-data-[collapsed=true]/sidebar:px-0",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                <span className="flex size-5 shrink-0 items-center justify-center">
                  <item.icon className="size-[17px]" />
                </span>
                <NavLabel>{item.label}</NavLabel>
              </Link>
            );

            return (
              <li key={item.href}>
                {wrapCollapsedTooltip(link, item.label, effectiveCollapsed)}
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "mt-auto shrink-0 overflow-hidden border-t border-white/10 px-3 py-3 transition-[padding] duration-200 motion-reduce:transition-none",
          "group-data-[collapsed=true]/sidebar:px-2 group-data-[collapsed=true]/sidebar:py-2",
        )}
      >
        <SidebarProfile
          collapsed={effectiveCollapsed}
          user={user}
        />
      </div>
    </div>
  );
}

function SidebarBrand({ roleLabel }: { roleLabel: string }) {
  return (
    <div
      className={cn(
        "h-unireg-sidebar-header flex items-center gap-3 overflow-hidden border-b border-white/10 px-4",
        "transition-[padding,gap] duration-200 ease-linear motion-reduce:transition-none",
        "group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:gap-0 group-data-[collapsed=true]/sidebar:px-3",
      )}
    >
      <div className="text-primary flex size-10 shrink-0 items-center justify-center rounded-lg bg-white">
        <GraduationCap className="size-5" />
      </div>
      <div
        className={cn(
          "min-w-0 flex-1 overflow-hidden",
          "transition-[opacity,width] duration-200 ease-linear motion-reduce:transition-none",
          "group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:flex-none group-data-[collapsed=true]/sidebar:opacity-0",
        )}
      >
        <p className="truncate text-base leading-6 font-semibold">UniReg</p>
        <p className="truncate text-xs leading-5 text-white/75">
          {roleLabel} Portal
        </p>
      </div>
    </div>
  );
}

function NavLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "min-w-0 flex-1 truncate text-left",
        "transition-[opacity,width] duration-200 ease-linear motion-reduce:transition-none",
        "group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:flex-none group-data-[collapsed=true]/sidebar:opacity-0",
      )}
    >
      {children}
    </span>
  );
}

function wrapCollapsedTooltip(
  node: ReactElement,
  label: string,
  collapsed: boolean,
) {
  if (!collapsed) return node;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{node}</TooltipTrigger>
      <TooltipContent side="right" className="bg-foreground text-background">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
