import { AxiosResponse } from 'axios';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

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

type Response = Omit<UseQueryResult, 'data'> & {
  data: { totalCount: number; items: Joke[] };
};

export default function useGetJokesQuery(
  query: QueryParams,
  options?: UseQueryOptions<AxiosResponse<Joke[]>, Error>
): Response {
  const request = useAuthenticatedRequest({
    method: 'GET',
    url: `/jokes?_page=${query.page}&_limit=${query.limit}`
  });

  const { data, ...rest } = useQuery<AxiosResponse<Joke[]>, Error>(
    ['jokes', query.limit, query.page],
    request,
    options
  );

  return {
    ...rest,
    data: data
      ? {
          totalCount: parseInt(data.headers['x-total-count'], 10),
          items: data.data
        }
      : { totalCount: 0, items: [] }
  } as Response;
}
