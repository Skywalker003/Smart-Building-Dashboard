import { useState, useEffect, useCallback } from 'react';

export function useFetch(url, { simulateError = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setData(null);
    setLoading(true);
    setError(null);
    setRetryCount(c => c + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const delay = 1000 + Math.random() * 1000;

    const timer = setTimeout(async () => {
      try {
        if (simulateError && retryCount === 0) {
          throw new Error('Simulated network failure. Click Retry to reload.');
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const json = await res.json();

        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [url, simulateError, retryCount]);

  return { data, loading, error, retry };
}
