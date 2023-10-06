import App from 'App';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthContextProvider } from 'contexts/AuthContext';
import { AxiosContextProvider } from 'contexts/AxiosContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';

import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <AxiosContextProvider baseURL="https://retoolapi.dev/vcv4zy/">
        <ThemeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeContextProvider>
        <ToastContainer />
      </AxiosContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
