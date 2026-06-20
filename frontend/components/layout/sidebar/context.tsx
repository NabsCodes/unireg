"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const SIDEBAR_COOKIE_NAME = "unireg-sidebar-collapsed";
const SIDEBAR_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarCookieStore {
  set(details: {
    name: string;
    value: string;
    path?: string;
    maxAge?: number;
    sameSite?: "lax" | "strict" | "none";
  }): Promise<void>;
}

function persistSidebarCollapsed(collapsed: boolean): void {
  if (typeof window === "undefined") return;

  const cookieStore = (window as Window & { cookieStore?: SidebarCookieStore })
    .cookieStore;
  if (!cookieStore) return;

  void cookieStore.set({
    name: SIDEBAR_COOKIE_NAME,
    value: String(collapsed),
    path: "/",
    maxAge: SIDEBAR_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
  });
}

interface SidebarContextValue {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const setCollapsedState = useCallback(
    (value: boolean | ((current: boolean) => boolean)) => {
      setCollapsed((current) => {
        const next = typeof value === "function" ? value(current) : value;
        persistSidebarCollapsed(next);
        return next;
      });
    },
    [],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsedState((current) => !current);
  }, [setCollapsedState]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (typeof event.key !== "string") return;
      if (event.key.toLowerCase() !== SIDEBAR_KEYBOARD_SHORTCUT) return;
      if (!event.metaKey && !event.ctrlKey) return;

      event.preventDefault();
      toggleCollapsed();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapsed]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      mobileOpen,
      toggleCollapsed,
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
    }),
    [collapsed, mobileOpen, toggleCollapsed],
  );

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.");
  }

  return context;
}
