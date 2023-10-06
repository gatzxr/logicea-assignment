import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const TOKEN = 'token';
interface IAuthContext {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({
  children
}: {
  children: ReactNode;
}): ReactElement {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token: string | null = localStorage.getItem(TOKEN);
    setLoggedIn(!!token);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem(TOKEN);
    setLoggedIn(false);
  }, []);

  const logIn = useCallback(() => {
    setLoggedIn(true);
    localStorage.setItem(TOKEN, 'user_token');
  }, []);

  const value: IAuthContext = useMemo(
    () => ({
      isLoggedIn: isLoggedIn as boolean,
      logOut,
      logIn
    }),
    [isLoggedIn, logOut, logIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return useContext(AuthContext);
}
