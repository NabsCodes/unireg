import Link from "next/link";
import type { Route } from "next";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DashboardSuggestion = {
  id: string;
  title: string;
  description: string;
  href: Route;
  icon: LucideIcon;
  tone?: "default" | "action" | "success" | "warning";
};

type DashboardSuggestionsProps = {
  suggestions: DashboardSuggestion[];
  title?: string;
  description?: string;
};

const toneStyles: Record<NonNullable<DashboardSuggestion["tone"]>, string> = {
  default: "bg-muted text-foreground",
  action: "bg-primary text-primary-foreground",
  success: "bg-unireg-success-subtle text-unireg-success",
  warning: "bg-unireg-warning-subtle text-unireg-warning",
};

export function DashboardSuggestions({
  suggestions,
  title = "Suggested next steps",
  description = "Quick actions based on your current status.",
}: DashboardSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;
          const tone = suggestion.tone ?? "default";

          return (
            <Link
              className="border-border hover:bg-muted/60 focus-visible:ring-ring group flex items-start gap-3 rounded-lg border p-3 transition-colors outline-none focus-visible:ring-2"
              href={suggestion.href}
              key={suggestion.id}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                  toneStyles[tone],
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="min-w-0 flex-1 space-y-0.5">
                <span className="text-foreground block text-sm font-medium">
                  {suggestion.title}
                </span>
                <span className="text-muted-foreground block text-sm">
                  {suggestion.description}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="text-muted-foreground mt-2 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
