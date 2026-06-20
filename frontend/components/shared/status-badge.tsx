import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles = {
  active:
    "border-unireg-success/20 bg-unireg-success-subtle text-unireg-success",
  pending:
    "border-unireg-warning/20 bg-unireg-warning-subtle text-unireg-warning",
  completed:
    "border-unireg-success/20 bg-unireg-success-subtle text-unireg-success",
  failed: "border-destructive/20 bg-destructive/10 text-destructive",
  draft: "border-border bg-muted text-muted-foreground",
} as const;

export type StatusTone = keyof typeof statusStyles;

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
};

export function StatusBadge({
  label,
  tone = "draft",
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md px-2 py-0.5 text-[11px] font-medium",
        statusStyles[tone],
        className,
      )}
    >
      {label}
    </Badge>
  );
}
