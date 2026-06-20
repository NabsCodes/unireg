"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./context";

interface SidebarTriggerProps {
  className?: string;
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { collapsed, toggleCollapsed, openMobile } = useSidebar();
  const DesktopIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <>
      <Button
        type="button"
        aria-label="Open navigation"
        onClick={openMobile}
        size="icon"
        variant="outline"
        className={cn(
          "border-border text-muted-foreground hover:bg-muted size-9 shrink-0 rounded-lg md:hidden",
          className,
        )}
      >
        <Menu className="size-5" />
      </Button>
      <Button
        type="button"
        aria-label={
          collapsed
            ? "Expand sidebar (Cmd/Ctrl+B)"
            : "Collapse sidebar (Cmd/Ctrl+B)"
        }
        title="Toggle sidebar (Cmd/Ctrl+B)"
        onClick={toggleCollapsed}
        size="icon"
        variant="outline"
        className={cn(
          "border-border text-muted-foreground hover:bg-muted hidden size-9 shrink-0 rounded-lg md:flex",
          className,
        )}
      >
        <DesktopIcon className="size-4" />
      </Button>
    </>
  );
}
