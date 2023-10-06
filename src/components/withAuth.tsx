import useAuthContext from 'contexts/AuthContext';
import { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useToaster from 'hooks/useToaster';

export default function withAuth<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  return function WithAuth(props: T) {
    const { isLoggedIn } = useAuthContext();
    const { toastError } = useToaster();
    const location = useLocation();

    if (isLoggedIn && location.pathname === '/login') {
      return <Navigate to="/" />;
    }

    if (!isLoggedIn && location.pathname !== '/login') {
      toastError('Unauthorised! You need to be logged in to access this page.');
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}
