import { UseQueryOptions, useQuery } from 'react-query';

import useAuthenticatedRequest from 'contexts/AxiosContext';

export type Joke = {
  id: number;
  title: string;
  body: string;
  author: string;
  views: number;
  createdAt: string;
};

export type QueryParams = {
  page: string;
  limit: string;
};

export default function useGetJokesQuery(
  query: QueryParams,
  options?: UseQueryOptions<Joke[], Error>
) {
  const request = useAuthenticatedRequest({
    method: 'GET',
    url: `/jokes?_page=${query.page}&_limit=${query.limit}`
  });

  return useQuery<Joke[], Error>(
    ['jokes', query.limit, query.page],
    request,
    options
  );
}
