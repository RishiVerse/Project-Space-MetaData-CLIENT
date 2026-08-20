import { useCallback, useEffect, useRef, useState } from 'react';
import { HEALTHCHECK_INTERVAL_MS } from '../config/api';

export const useHealthCheck = (repository) => {
  const [status, setStatus] = useState('checking');
  const controllerRef = useRef(null);

  const check = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setStatus((current) => (current === 'checking' ? current : 'refreshing'));
      const isHealthy = await repository.health(controller.signal);
      setStatus(isHealthy ? 'online' : 'offline');
    } catch {
      if (!controller.signal.aborted) setStatus('offline');
    }
  }, [repository]);

  useEffect(() => {
    check();
    const intervalId = window.setInterval(check, HEALTHCHECK_INTERVAL_MS);
    return () => {
      window.clearInterval(intervalId);
      controllerRef.current?.abort();
    };
  }, [check]);

  return { status, refresh: check };
};
