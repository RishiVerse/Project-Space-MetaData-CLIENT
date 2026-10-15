import { API_BASE_URL } from '../config/api';
import { FetchHttpClient } from './httpClient';

const objectRules = [
  ['Nebula', ['nebula', 'cloud', 'supernova remnant']],
  ['Galaxy', ['galaxy', 'galaxies', 'deep field']],
  ['Planet', ['planet', 'jupiter', 'saturn', 'mars', 'earth', 'venus']],
  ['Moon', ['moon', 'lunar', 'satellite']],
  ['Star', ['star', 'stellar', 'sun']],
];

const missionRules = [
  ['JWST', ['james webb', 'webb', 'jwst']],
  ['Hubble', ['hubble']],
  ['Apollo', ['apollo']],
  ['Juno', ['juno']],
  ['Cassini', ['cassini']],
  ['Galileo', ['galileo']],
];

const normalizeKeywords = (keywords) => (
  Array.isArray(keywords) ? keywords.filter((keyword) => typeof keyword === 'string') : []
);

const searchableText = (...values) => values
  .flat()
  .filter((value) => typeof value === 'string')
  .join(' ')
  .toLowerCase();

const inferObjectType = (image, keywords) => {
  const searchable = searchableText(image.title, keywords);
  return objectRules.find(([, words]) => words.some((word) => searchable.includes(word)))?.[0]
    || 'Deep Space';
};

const inferMission = (image, keywords, provider) => {
  const searchable = searchableText(image.center, image.title, keywords, provider);
  return missionRules.find(([, words]) => words.some((word) => searchable.includes(word)))?.[0]
    || provider;
};

const toViewModel = (image = {}) => {
  const keywords = normalizeKeywords(image.keywords);
  const source = {
    provider: image.source?.provider || 'NASA',
    url: image.source?.url || '#',
  };
  const parsedDate = image.dateCreated ? new Date(image.dateCreated) : null;
  const year = parsedDate && !Number.isNaN(parsedDate.getTime())
    ? parsedDate.getUTCFullYear()
    : null;

  return {
    id: String(image.id || image.previewUrl || image.title || 'untitled-observation'),
    title: image.title || 'Untitled observation',
    description: image.description || 'No description is available for this observation.',
    previewUrl: typeof image.previewUrl === 'string' ? image.previewUrl : '',
    mediaType: image.mediaType || 'image',
    center: image.center || 'Public archive',
    dateCreated: image.dateCreated || null,
    year,
    keywords,
    source,
    mission: inferMission(image, keywords, source.provider),
    objectType: inferObjectType(image, keywords),
  };
};

const positiveNumberOr = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
};

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

    const items = Array.isArray(response?.items) ? response.items.map(toViewModel) : [];

    return {
      ...response,
      query: response?.query || normalizedQuery,
      page: positiveNumberOr(response?.page, page),
      pageSize: positiveNumberOr(response?.pageSize, pageSize),
      totalHits: positiveNumberOr(response?.totalHits, items.length),
      items,
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
