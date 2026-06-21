import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

import {
  resolveQuerySkeleton,
  type QuerySkeletonVariant,
} from "@/components/shared/skeletons";

type QueryStateErrorProps = {
  errorLabel?: string;
  error?: Error | null;
};

function QueryStateError({
  errorLabel = "Could not load records.",
  error,
}: QueryStateErrorProps) {
  return (
    <div className="border-destructive/30 bg-destructive/5 rounded-lg border px-4 py-3">
      <p className="text-destructive text-sm font-medium">{errorLabel}</p>
      {error?.message ? (
        <p className="text-muted-foreground mt-1 text-sm">{error.message}</p>
      ) : null}
    </div>
  );
}

type QueryStateLegacyProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  loadingLabel?: string;
  errorLabel?: string;
  variant?: QuerySkeletonVariant;
  skeleton?: ReactNode;
  rows?: number;
  statCount?: number;
  children: ReactNode;
};

type QueryStateQueryProps<TData> = {
  query: Pick<
    UseQueryResult<TData>,
    "data" | "isLoading" | "isError" | "error"
  >;
  variant?: QuerySkeletonVariant;
  skeleton?: ReactNode;
  rows?: number;
  statCount?: number;
  errorLabel?: string;
  isEmpty?: (data: TData) => boolean;
  empty?: ReactNode;
  children: (data: TData) => ReactNode;
};

export type QueryStateProps<TData = unknown> =
  | QueryStateLegacyProps
  | QueryStateQueryProps<TData>;

function isQueryProps<TData>(
  props: QueryStateProps<TData>,
): props is QueryStateQueryProps<TData> {
  return "query" in props;
}

function resolveSkeletonNode(
  variant: QuerySkeletonVariant = "table",
  skeleton: ReactNode | undefined,
  rows?: number,
  statCount?: number,
) {
  return skeleton ?? resolveQuerySkeleton(variant, { rows, statCount });
}

export function QueryState<TData>(props: QueryStateProps<TData>) {
  if (isQueryProps(props)) {
    const {
      query,
      variant = "table",
      skeleton,
      rows,
      statCount,
      errorLabel,
      isEmpty,
      empty,
      children,
    } = props;

    if (query.isError) {
      return (
        <QueryStateError
          error={query.error ?? undefined}
          errorLabel={errorLabel}
        />
      );
    }

    if (query.isLoading || query.data === undefined) {
      return <>{resolveSkeletonNode(variant, skeleton, rows, statCount)}</>;
    }

    if (empty && isEmpty?.(query.data)) {
      return <>{empty}</>;
    }

    return <>{children(query.data)}</>;
  }

  const {
    isLoading,
    isError,
    error,
    loadingLabel = "Loading records...",
    errorLabel,
    variant = "table",
    skeleton,
    rows,
    statCount,
    children,
  } = props;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">{loadingLabel}</p>
        {resolveSkeletonNode(variant, skeleton, rows, statCount)}
      </div>
    );
  }

  if (isError) {
    return <QueryStateError error={error} errorLabel={errorLabel} />;
  }

  return children;
}
