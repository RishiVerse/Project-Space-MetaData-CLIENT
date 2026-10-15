import { describe, expect, it, vi } from 'vitest';
import { FetchHttpClient, HttpError } from './httpClient';

const abortableFetch = vi.fn((url, { signal }) => new Promise((resolve, reject) => {
  const rejectOnAbort = () => reject(new DOMException('Aborted', 'AbortError'));
  if (signal.aborted) rejectOnAbort();
  else signal.addEventListener('abort', rejectOnAbort, { once: true });
}));

describe('FetchHttpClient', () => {
  it('serializes query parameters and returns JSON payloads', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ items: [] }),
    });
    const client = new FetchHttpClient('https://example.com', { fetchImpl });

    await expect(client.get('/images', { params: { query: 'moon', empty: '' } }))
      .resolves.toEqual({ items: [] });
    expect(fetchImpl.mock.calls[0][0].toString()).toBe('https://example.com/images?query=moon');
  });

  it('distinguishes caller cancellation from a timeout', async () => {
    const cancelledController = new AbortController();
    cancelledController.abort();
    const cancelledClient = new FetchHttpClient('https://example.com', {
      fetchImpl: abortableFetch,
      timeoutMs: 100,
    });

    await expect(cancelledClient.get('/images', { signal: cancelledController.signal }))
      .rejects.toMatchObject({ message: 'The request was cancelled.' });

    const timeoutClient = new FetchHttpClient('https://example.com', {
      fetchImpl: abortableFetch,
      timeoutMs: 1,
    });
    await expect(timeoutClient.get('/images')).rejects.toEqual(expect.objectContaining({
      name: 'HttpError',
      message: 'The atlas service took too long to respond.',
    }));
  });

  it('preserves API error details', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: vi.fn().mockResolvedValue({ message: 'Rate limited' }),
    });
    const client = new FetchHttpClient('https://example.com', { fetchImpl });

    await expect(client.get('/images')).rejects.toEqual(expect.objectContaining({
      name: 'HttpError',
      status: 429,
      message: 'Rate limited',
    }));
    await expect(client.get('/images')).rejects.toBeInstanceOf(HttpError);
  });
});
