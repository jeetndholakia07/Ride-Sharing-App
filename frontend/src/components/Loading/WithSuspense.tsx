import { Suspense, type JSX } from "react";

interface WithSuspenseProps<T> {
  data: T[] | null | undefined;
  isLoading: boolean;
  fallback: React.ReactNode;
  empty: React.ReactNode;
  children: React.ReactNode;
}

function WithSuspense<T>({
  data,
  isLoading,
  fallback,
  empty,
  children,
}: WithSuspenseProps<T>): JSX.Element {
  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!data || data.length === 0) {
    return <>{empty}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}

export default WithSuspense;