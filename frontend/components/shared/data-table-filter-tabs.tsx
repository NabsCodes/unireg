"use client";

import { cn } from "@/lib/utils";
import type { DataTableFilterTabOption } from "@/types/data-table";

type DataTableFilterTabsProps<T extends string = string> = {
  value: T;
  onValueChange: (value: T) => void;
  options: readonly DataTableFilterTabOption[];
  ariaLabel: string;
  className?: string;
};

function formatCount(count: number | string): string {
  return typeof count === "number" ? count.toLocaleString() : count;
}

export function DataTableFilterTabs<T extends string = string>({
  value,
  onValueChange,
  options,
  ariaLabel,
  className,
}: DataTableFilterTabsProps<T>) {
  return (
    <div
      className={cn(
        "border-border bg-muted/30 w-fit max-w-full min-w-0 rounded-lg border p-1",
        className,
      )}
    >
      <div
        role="group"
        aria-label={ariaLabel}
        className="flex min-w-0 [scrollbar-width:none] items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onValueChange(option.value as T)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                isActive
                  ? "border-primary/20 bg-background text-foreground"
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground border-transparent",
              )}
            >
              <span>{option.label}</span>
              {option.count !== undefined ? (
                <span
                  className={cn(
                    "rounded px-1.5 py-px text-[10px] leading-none font-semibold tabular-nums",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground",
                  )}
                >
                  {formatCount(option.count)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
