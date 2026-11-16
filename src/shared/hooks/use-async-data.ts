import { useEffect, useState } from 'react';

export type AsyncStatus = 'loading' | 'error' | 'ready';

type Loader<T> = () => Promise<T>;

interface Result<T> {
  load: Loader<T>;
  attempt: number;
  data: T | null;
  failed: boolean;
}

/**
 * Runs `load` whenever it changes (pass a memoized function, or null to wait).
 * `retry` reloads from scratch; `refresh` reloads while keeping the shown data.
 * A result only counts for the request that produced it, so a fast switch
 * (e.g. Women → Men) never shows the previous one's data.
 */
export function useAsyncData<T>(load: Loader<T> | null) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!load) return;
    let active = true;
    load().then(
      (data) => {
        if (active) setResult({ load, attempt, data, failed: false });
      },
      () => {
        if (active) setResult({ load, attempt, data: null, failed: true });
      },
    );
    return () => {
      active = false;
    };
  }, [load, attempt]);

  const current =
    result && result.load === load && result.attempt === attempt
      ? result
      : null;
  const status: AsyncStatus = !current
    ? 'loading'
    : current.failed
      ? 'error'
      : 'ready';

  async function refresh() {
    if (!load) return;
    const requested = attempt;
    setIsRefreshing(true);
    try {
      const data = await load();
      // Ignored if the shopper switched to something else meanwhile.
      setResult((previous) =>
        previous && previous.load === load && previous.attempt === requested
          ? { load, attempt: requested, data, failed: false }
          : previous,
      );
    } catch {
      // A failed pull-to-refresh keeps what is already on screen.
    } finally {
      setIsRefreshing(false);
    }
  }

  return {
    data: status === 'ready' ? (current?.data ?? null) : null,
    status,
    isRefreshing,
    retry: () => setAttempt((value) => value + 1),
    refresh,
  };
}
