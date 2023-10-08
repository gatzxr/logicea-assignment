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

export default function useGetJokeQuery(
  id: string,
  options?: UseQueryOptions<AxiosResponse<Joke>, Error>
): UseQueryResult<Joke> {
  const request = useAuthenticatedRequest({
    method: 'GET',
    url: `/jokes/${id}`
  });

  const { data, ...rest } = useQuery<AxiosResponse<Joke>, Error>(
    ['jokes', id],
    request,
    options
  );

  return {
    ...rest,
    data: data?.data
  } as UseQueryResult<Joke>;
}
