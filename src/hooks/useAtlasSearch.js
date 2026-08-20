import { useMemo, useRef, useState } from 'react';
import { featuredImages } from '../data/featuredImages';

const initialFilters = {
  objectType: 'All objects',
  mission: 'All missions',
  year: 'Any year',
  scale: 'All scales',
};

const matchesYear = (year, filter) => {
  if (filter === 'Any year') return true;
  if (!year) return false;
  if (filter === '2020–now') return year >= 2020;
  if (filter === '2010–2019') return year >= 2010 && year <= 2019;
  if (filter === '2000–2009') return year >= 2000 && year <= 2009;
  return year < 2000;
};

export const useAtlasSearch = (repository) => {
  const [items, setItems] = useState(featuredImages);
  const [query, setQuery] = useState('moon');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(featuredImages.length);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const controllerRef = useRef(null);

  const search = async (nextQuery = query, nextPage = 1, append = false) => {
    const normalizedQuery = nextQuery.trim();
    if (!normalizedQuery) {
      setError('Enter an object, mission, or place to search.');
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    setError('');

    try {
      const response = await repository.search({
        query: normalizedQuery,
        page: nextPage,
        pageSize: 12,
        signal: controller.signal,
      });
      setItems((current) => (append ? [...current, ...response.items] : response.items));
      setQuery(normalizedQuery);
      setPage(response.page);
      setTotalHits(response.totalHits);
      if (!response.items.length && !append) {
        setError(`No public images matched “${normalizedQuery}”. Try a broader term.`);
      }
    } catch (searchError) {
      if (!controller.signal.aborted) setError(searchError.message);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  };

  const visibleItems = useMemo(
    () => items.filter((item) => {
      const objectMatch = filters.objectType === 'All objects'
        || item.objectType === filters.objectType;
      const missionMatch = filters.mission === 'All missions'
        || item.mission === filters.mission
        || item.source.provider.includes(filters.mission);
      const yearMatch = matchesYear(item.year, filters.year);
      const scaleMatch = filters.scale === 'All scales'
        || (filters.scale === 'Planetary' && ['Moon', 'Planet'].includes(item.objectType))
        || (filters.scale === 'Deep space' && !['Moon', 'Planet'].includes(item.objectType));
      return objectMatch && missionMatch && yearMatch && scaleMatch;
    }),
    [filters, items],
  );

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return {
    query,
    setQuery,
    search,
    loadMore: () => search(query, page + 1, true),
    visibleItems,
    totalHits,
    isLoading,
    error,
    filters,
    updateFilter,
    hasMore: items.length < totalHits,
  };
};
