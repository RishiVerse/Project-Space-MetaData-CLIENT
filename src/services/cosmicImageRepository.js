import { API_BASE_URL } from '../config/api';
import { FetchHttpClient } from './httpClient';

const objectRules = [
  ['Nebula', ['nebula', 'cloud', 'supernova remnant']],
  ['Galaxy', ['galaxy', 'galaxies', 'deep field']],
  ['Planet', ['planet', 'jupiter', 'saturn', 'mars', 'earth', 'venus']],
  ['Moon', ['moon', 'lunar', 'satellite']],
  ['Star', ['star', 'stellar', 'sun']],
];

const inferObjectType = (image) => {
  const searchable = [image.title, ...(image.keywords || [])].join(' ').toLowerCase();
  return objectRules.find(([, words]) => words.some((word) => searchable.includes(word)))?.[0]
    || 'Deep Space';
};

const inferMission = (image) => {
  const searchable = [image.center, image.title, ...(image.keywords || [])]
    .join(' ')
    .toLowerCase();
  if (searchable.includes('webb') || searchable.includes('jwst')) return 'JWST';
  if (searchable.includes('hubble')) return 'Hubble';
  return image.source?.provider || 'NASA';
};

const toViewModel = (image) => ({
  id: image.id,
  title: image.title || 'Untitled observation',
  description: image.description || 'No description is available for this observation.',
  previewUrl: image.previewUrl,
  mediaType: image.mediaType || 'image',
  center: image.center || 'Public archive',
  dateCreated: image.dateCreated,
  year: image.dateCreated ? new Date(image.dateCreated).getUTCFullYear() : null,
  keywords: image.keywords || [],
  source: image.source || { provider: 'NASA', url: '#' },
  mission: inferMission(image),
  objectType: inferObjectType(image),
});

export class CosmicImageRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async search({ query, page = 1, pageSize = 12, signal } = {}) {
    const normalizedQuery = query?.trim();
    if (!normalizedQuery) throw new Error('Enter a search term to explore the atlas.');

    const response = await this.httpClient.get('/api/v1/images/search', {
      params: { query: normalizedQuery, page, pageSize },
      signal,
    });

    return {
      ...response,
      items: (response.items || []).map(toViewModel),
    };
  }

  async health(signal) {
    const response = await this.httpClient.get('/actuator/health', { signal });
    return response?.status === 'UP';
  }
}

export const cosmicImageRepository = new CosmicImageRepository(
  new FetchHttpClient(API_BASE_URL),
);
