import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from 'components/Layout';
import { EditJoke, Jokes, Login, NotFound } from 'components/Pages';

import { AuthContextProvider } from 'contexts/AuthContext';
import { AxiosContextProvider } from 'contexts/AxiosContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AxiosContextProvider baseURL="https://retoolapi.dev/vcv4zy/">
          <ThemeContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/jokes" />} />
                <Route path="/jokes" element={<Layout />}>
                  <Route index element={<Jokes />} />
                  <Route path="new" element={<EditJoke isNew />} />
                  <Route path=":id" element={<EditJoke isNew={false} />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ThemeContextProvider>
          <ToastContainer />
        </AxiosContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
