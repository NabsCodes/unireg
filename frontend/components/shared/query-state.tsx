import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  loadingLabel?: string;
  errorLabel?: string;
  children: ReactNode;
};

export function QueryState({
  isLoading,
  isError,
  error,
  loadingLabel = "Loading records...",
  errorLabel = "Could not load records.",
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">{loadingLabel}</p>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-destructive/30 bg-destructive/5 rounded-lg border px-4 py-3">
        <p className="text-destructive text-sm font-medium">{errorLabel}</p>
        {error?.message ? (
          <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>
        ) : null}
      </div>
    );
  }

  return children;
}
