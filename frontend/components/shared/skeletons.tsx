import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type QuerySkeletonVariant =
  | "table"
  | "dashboard"
  | "stats"
  | "stats-table"
  | "list"
  | "inline"
  | "panel";

type TableSkeletonProps = {
  rows?: number;
  showToolbar?: boolean;
};

export function TableSkeleton({
  rows = 6,
  showToolbar = true,
}: TableSkeletonProps) {
  return (
    <div className="space-y-3">
      {showToolbar ? (
        <Skeleton className="h-10 w-full max-w-md rounded-lg" />
      ) : null}
      <div className="border-border overflow-hidden rounded-lg border">
        <div className="bg-muted/40 border-border border-b px-4 py-3">
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        {Array.from({ length: rows }).map((_, index) => (
          <div
            className="border-border flex items-center gap-4 border-b px-4 py-3 last:border-0"
            key={index}
          >
            <Skeleton className="h-4 w-8 rounded-md" />
            <Skeleton className="h-4 flex-1 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-3 w-24 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-32 rounded-md" />
      </CardContent>
    </Card>
  );
}

type StatsRowSkeletonProps = {
  count?: number;
};

export function StatsRowSkeleton({ count = 4 }: StatsRowSkeletonProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
}

type DashboardSkeletonProps = {
  statCount?: number;
  showActivity?: boolean;
};

export function DashboardSkeleton({
  statCount = 4,
  showActivity = true,
}: DashboardSkeletonProps) {
  return (
    <div className="space-y-6">
      <StatsRowSkeleton count={statCount} />
      {showActivity ? (
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-72 max-w-full rounded-md" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="space-y-1" key={index}>
                <Skeleton className="h-4 w-full max-w-lg rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

type ListSkeletonProps = {
  rows?: number;
};

export function ListSkeleton({ rows = 5 }: ListSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="space-y-1" key={index}>
          <Skeleton className="h-4 w-full max-w-xl rounded-md" />
          <Skeleton className="h-3 w-28 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function InlineSkeleton() {
  return <Skeleton className="h-4 w-48 rounded-md" />;
}

export function PanelSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="h-4 w-full max-w-md rounded-md" />
      </CardHeader>
      <CardContent>
        <TableSkeleton rows={4} />
      </CardContent>
    </Card>
  );
}

export function StatsTablePageSkeleton({
  statCount = 3,
  rows = 5,
}: {
  statCount?: number;
  rows?: number;
}) {
  return (
    <div className="space-y-6">
      <StatsRowSkeleton count={statCount} />
      <div className="space-y-3">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="h-4 w-72 max-w-full rounded-md" />
        <TableSkeleton rows={rows} />
      </div>
    </div>
  );
}

export function resolveQuerySkeleton(
  variant: QuerySkeletonVariant,
  options?: { rows?: number; statCount?: number },
) {
  switch (variant) {
    case "table":
      return <TableSkeleton rows={options?.rows} />;
    case "dashboard":
      return <DashboardSkeleton statCount={options?.statCount} />;
    case "stats":
      return <StatsRowSkeleton count={options?.statCount ?? 3} />;
    case "stats-table":
      return (
        <StatsTablePageSkeleton
          rows={options?.rows}
          statCount={options?.statCount ?? 3}
        />
      );
    case "list":
      return <ListSkeleton rows={options?.rows} />;
    case "inline":
      return <InlineSkeleton />;
    case "panel":
      return <PanelSkeleton />;
    default:
      return <TableSkeleton rows={options?.rows} />;
  }
}
