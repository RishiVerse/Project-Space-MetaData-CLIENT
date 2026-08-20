export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080';

export const API_TIMEOUT_MS = 10_000;
export const HEALTHCHECK_INTERVAL_MS = 30_000;
