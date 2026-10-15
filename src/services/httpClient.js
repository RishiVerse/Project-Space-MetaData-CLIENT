import { API_TIMEOUT_MS } from '../config/api';

export class HttpError extends Error {
  constructor(message, { status = 0, details = null } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

const joinUrl = (baseUrl, path) => {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return new URL(path.replace(/^\//, ''), normalizedBase);
};

export class FetchHttpClient {
  constructor(baseUrl, { timeoutMs = API_TIMEOUT_MS, fetchImpl = fetch } = {}) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
    this.fetchImpl = fetchImpl;
  }

  async get(path, { params = {}, signal } = {}) {
    const url = joinUrl(this.baseUrl, path);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });

    const requestController = new AbortController();
    let didTimeout = false;
    const timeoutId = globalThis.setTimeout(() => {
      didTimeout = true;
      requestController.abort();
    }, this.timeoutMs);
    const abortFromParent = () => requestController.abort(signal?.reason);

    if (signal?.aborted) abortFromParent();
    else signal?.addEventListener('abort', abortFromParent, { once: true });

    try {
      const response = await this.fetchImpl(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: requestController.signal,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new HttpError(
          payload?.message || `The atlas service returned ${response.status}.`,
          { status: response.status, details: payload },
        );
      }

      return payload;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      if (requestController.signal.aborted) {
        throw new HttpError(
          didTimeout ? 'The atlas service took too long to respond.' : 'The request was cancelled.',
        );
      }
      throw new HttpError('The atlas service is currently unreachable.');
    } finally {
      globalThis.clearTimeout(timeoutId);
      signal?.removeEventListener('abort', abortFromParent);
    }
  }
}
