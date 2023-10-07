import { useMutation } from 'react-query';

import useAuthenticatedRequest from 'contexts/AxiosContext';

import { Joke } from './useGetJokeQuery';

export default function useCreateJokeQuery() {
  const request = useAuthenticatedRequest({
    method: 'POST',
    url: '/jokes'
  });

  return useMutation((data: Omit<Joke, 'id'>) =>
    request({
      data
    })
  );
}
