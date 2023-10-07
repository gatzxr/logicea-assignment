import { useMutation } from 'react-query';

import useAuthenticatedRequest from 'contexts/AxiosContext';

export default function useDeleteJokeQuery() {
  const request = useAuthenticatedRequest({
    method: 'DELETE'
  });

  return useMutation((id: string) =>
    request({
      url: `/jokes/${id}`
    })
  );
}
