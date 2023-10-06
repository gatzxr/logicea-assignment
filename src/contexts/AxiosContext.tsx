import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ReactNode, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import useToaster from 'hooks/useToaster';

import useAuthContext from './AuthContext';

const AxiosContext = createContext({} as AxiosInstance);

interface IAxiosContextProvider {
  children: ReactNode;
  baseURL: string;
}
export function AxiosContextProvider({
  children,
  baseURL
}: IAxiosContextProvider) {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true
  });

  return (
    <AxiosContext.Provider value={axiosInstance as AxiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}

export default function useAuthenticatedRequest(options: AxiosRequestConfig) {
  const { toastError } = useToaster();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const axiosInstance = useContext(AxiosContext);

  return async () => {
    if (!isLoggedIn) {
      toastError('You need to be logged in to perform this request.');
      navigate('/login');
    }

    const res = await axiosInstance(options);
    return res.data;
  };
}
