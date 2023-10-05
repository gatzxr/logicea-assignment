import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from 'components/Layout';
import Login from 'components/Login';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
