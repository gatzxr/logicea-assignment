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

export default function useGetJokeQuery(
  id: string,
  options?: UseQueryOptions<Joke, Error>
) {
  const request = useAuthenticatedRequest({
    method: 'GET',
    url: `/jokes/${id}`
  });

  return useQuery<Joke, Error>(['jokes', id], request, options);
}
