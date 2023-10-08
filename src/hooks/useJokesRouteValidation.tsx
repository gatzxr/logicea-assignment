import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Joke } from 'api/useGetJokeQuery';

export const defaultParams = {
  page: '1',
  limit: '10'
};

export default function useJokesRouteValidation({
  jokes,
  totalCount,
  isLoading,
  queryParams
}: {
  jokes: Joke[];
  totalCount: number;
  isLoading: boolean;
  queryParams: URLSearchParams;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(queryParams.get('page')!, 10);
    const limit = parseInt(queryParams.get('limit')!, 10);
    if (jokes.length === 0 && !isLoading && page > 1) {
      navigate(
        `/jokes?page=${
          totalCount > 0 ? Math.ceil(totalCount / limit) : 1
        }&limit=${limit}`
      );
    }
  }, [jokes, totalCount, queryParams, navigate, isLoading]);

  useEffect(() => {
    const page = parseInt(queryParams.get('page')!, 10);
    const limit = parseInt(queryParams.get('limit')!, 10);
    if (
      Number.isNaN(page) ||
      Number.isNaN(limit) ||
      page <= 0 ||
      (limit !== 5 && limit !== 10)
    ) {
      navigate(
        `/jokes?page=${defaultParams.page}&limit=${defaultParams.limit}`
      );
    }
  }, [queryParams, navigate]);
}
