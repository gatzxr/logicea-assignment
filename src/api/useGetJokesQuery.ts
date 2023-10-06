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
  page: number;
  limit: number;
};

export default function useGetJokesQuery(
  query: QueryParams,
  options?: UseQueryOptions<Joke[], Error>
) {
  const request = useAuthenticatedRequest({
    method: 'GET',
    url: `/jokes?_page=${query.page}&_limit=${query.limit}`
  });

  return useQuery<Joke[], Error>('jokes', request, options);
}
