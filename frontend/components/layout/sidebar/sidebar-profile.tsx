"use client";

import { useState, type ComponentType } from "react";
import {
  Building2,
  CalendarDays,
  ChevronRight,
  Mail,
  Shield,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currentAcademicPeriod, type PortalUser } from "@/content/portal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function identifierLabel(role: string): string {
  if (role === "Student") return "Matric number";
  if (role === "Lecturer") return "Staff number";
  return "Account ID";
}

type ProfileFieldProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function ProfileField({ icon: Icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-transparent px-1 py-1">
      <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {label}
        </p>
        <p className="text-foreground mt-0.5 text-sm break-all">{value}</p>
      </div>
    </div>
  );
}

type SidebarProfileProps = {
  user: PortalUser;
  collapsed: boolean;
};

export function SidebarProfile({ user, collapsed }: SidebarProfileProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const isActive = user.status !== "inactive";

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-left transition-colors",
        "text-white/85 hover:bg-white/10 hover:text-white",
        collapsed && "justify-center px-0",
      )}
    >
      <Avatar className="size-9 shrink-0 border border-white/15">
        <AvatarFallback className="bg-white/15 text-xs font-semibold text-white">
          {initials(user.name)}
        </AvatarFallback>
      </Avatar>
      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{user.name}</span>
            <span className="block truncate text-xs text-white/65">
              View profile
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-white/50" />
        </>
      ) : null}
    </button>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side="right" className="bg-foreground text-background">
            My profile
          </TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}

      <Sheet onOpenChange={setOpen} open={open}>
        <SheetContent
          className={cn(
            "flex w-full flex-col gap-0 p-0",
            isMobile
              ? "h-[min(85dvh,85svh)] max-h-[min(85dvh,85svh)] rounded-t-xl"
              : "data-[side=right]:w-full data-[side=right]:sm:max-w-lg",
          )}
          side={isMobile ? "bottom" : "right"}
        >
          <SheetHeader className="border-border shrink-0 border-b px-5 py-4 text-left sm:px-6 sm:py-5">
            <SheetTitle>My profile</SheetTitle>
            <SheetDescription>
              Read-only account overview for your portal session.
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
            <article className="border-border overflow-hidden rounded-lg border">
              <div className="border-primary bg-muted/20 border-b-4 px-5 py-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-16 border border-white">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {initials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="truncate text-lg font-semibold">{user.name}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {user.email}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        className="bg-primary/10 text-primary border-primary/15"
                        variant="outline"
                      >
                        {user.role}
                      </Badge>
                      <StatusBadge
                        label={isActive ? "Active" : "Inactive"}
                        tone={isActive ? "active" : "draft"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 px-4 py-4 sm:px-5">
                <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
                  Account details
                </p>
                <ProfileField icon={Mail} label="Email address" value={user.email} />
                {user.identifier ? (
                  <ProfileField
                    icon={Shield}
                    label={identifierLabel(user.role)}
                    value={user.identifier}
                  />
                ) : null}
                {user.department ? (
                  <ProfileField
                    icon={Building2}
                    label="Department"
                    value={user.department}
                  />
                ) : null}
                <ProfileField
                  icon={CalendarDays}
                  label="Current period"
                  value={currentAcademicPeriod.label}
                />
              </div>
            </article>

            <p className="text-muted-foreground mt-5 text-center text-xs leading-relaxed">
              This profile is view-only. Account updates and password changes
              will be added when authentication is connected.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
