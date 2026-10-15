import { describe, expect, it, vi } from 'vitest';
import { CosmicImageRepository } from './cosmicImageRepository';

describe('CosmicImageRepository', () => {
  it('maps API records into client-facing image models', async () => {
    const client = {
      get: vi.fn().mockResolvedValue({
        query: 'moon',
        page: 1,
        pageSize: 12,
        totalHits: 1,
        items: [{
          id: 'MOON-1',
          title: 'Lunar farside',
          description: 'A cratered hemisphere.',
          center: 'JPL',
          dateCreated: '2025-01-01T00:00:00Z',
          keywords: ['Moon', 'lunar'],
          source: { provider: 'NASA', url: 'https://example.com' },
        }],
      }),
    };
    const repository = new CosmicImageRepository(client);

    const response = await repository.search({ query: ' moon ' });

    expect(client.get).toHaveBeenCalledWith('/api/v1/images/search', expect.objectContaining({
      params: { query: 'moon', page: 1, pageSize: 12 },
    }));
    expect(response.items[0]).toMatchObject({
      mission: 'NASA',
      objectType: 'Moon',
      year: 2025,
    });
  });

  it('normalizes incomplete records and infers named missions', async () => {
    const client = {
      get: vi.fn().mockResolvedValue({
        items: [{
          id: 'APOLLO-8',
          title: 'Earthrise during Apollo 8',
          dateCreated: 'not-a-date',
          keywords: 'not-an-array',
          source: { url: 'https://example.com/apollo-8' },
        }],
      }),
    };
    const repository = new CosmicImageRepository(client);

    const response = await repository.search({ query: 'apollo' });

    expect(response).toMatchObject({ page: 1, pageSize: 12, totalHits: 1 });
    expect(response.items[0]).toMatchObject({
      keywords: [],
      mission: 'Apollo',
      source: { provider: 'NASA', url: 'https://example.com/apollo-8' },
      year: null,
    });
  });

  it('reports the actuator health state', async () => {
    const client = { get: vi.fn().mockResolvedValue({ status: 'UP' }) };
    const repository = new CosmicImageRepository(client);

    await expect(repository.health()).resolves.toBe(true);
  });
});
