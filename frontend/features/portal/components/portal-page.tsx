import type { ReactNode } from "react";

type PortalPageProps = {
  children: ReactNode;
};

export function PortalPage({ children }: PortalPageProps) {
  return <div className="space-y-6">{children}</div>;
}
