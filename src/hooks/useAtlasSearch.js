import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { featuredImages } from '../data/featuredImages';

const PAGE_SIZE = 12;

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
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);
  const activeQueryRef = useRef(query);

  const search = useCallback(async (
    nextQuery = activeQueryRef.current,
    nextPage = 1,
    append = false,
  ) => {
    const normalizedQuery = nextQuery.trim();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    controllerRef.current?.abort();

    if (!normalizedQuery) {
      setIsLoading(false);
      setError('Enter an object, mission, or place to search.');
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    setError('');

    try {
      const response = await repository.search({
        query: normalizedQuery,
        page: nextPage,
        pageSize: PAGE_SIZE,
        signal: controller.signal,
      });

      if (controller.signal.aborted || requestId !== requestIdRef.current) return;

      setItems((current) => {
        if (!append) return response.items;
        const knownIds = new Set(current.map((item) => item.id));
        return [...current, ...response.items.filter((item) => !knownIds.has(item.id))];
      });
      setQuery(normalizedQuery);
      setPage(response.page);
      setTotalHits(response.totalHits);
      setHasMore(response.page * response.pageSize < response.totalHits);
      activeQueryRef.current = normalizedQuery;
    } catch (searchError) {
      if (!controller.signal.aborted && requestId === requestIdRef.current) {
        setError(searchError.message);
      }
    } finally {
      if (!controller.signal.aborted && requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [repository]);

  useEffect(() => () => {
    requestIdRef.current += 1;
    controllerRef.current?.abort();
  }, []);

  const visibleItems = useMemo(
    () => items.filter((item) => {
      const objectMatch = filters.objectType === 'All objects'
        || item.objectType === filters.objectType;
      const missionMatch = filters.mission === 'All missions'
        || item.mission === filters.mission
        || item.source?.provider?.includes(filters.mission);
      const yearMatch = matchesYear(item.year, filters.year);
      const scaleMatch = filters.scale === 'All scales'
        || (filters.scale === 'Planetary' && ['Moon', 'Planet'].includes(item.objectType))
        || (filters.scale === 'Deep space' && !['Moon', 'Planet'].includes(item.objectType));
      return objectMatch && missionMatch && yearMatch && scaleMatch;
    }),
    [filters, items],
  );

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  }, []);

  const loadMore = useCallback(
    () => search(activeQueryRef.current, page + 1, true),
    [page, search],
  );

  return {
    query,
    setQuery,
    search,
    loadMore,
    visibleItems,
    totalHits,
    isLoading,
    error,
    filters,
    updateFilter,
    hasMore,
  };
};
