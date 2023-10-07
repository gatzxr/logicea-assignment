import { useMutation } from 'react-query';

import useAuthenticatedRequest from 'contexts/AxiosContext';

import { Joke } from './useGetJokeQuery';

export type QueryParams = {
  page: string;
  limit: string;
};

export default function useUpdateJokeQuery(id: string) {
  const request = useAuthenticatedRequest({
    method: 'PATCH',
    url: `/jokes/${id}`
  });

  return useMutation((data: Omit<Joke, 'id'>) =>
    request({
      data
    })
  );
}
