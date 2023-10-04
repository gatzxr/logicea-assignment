import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';



import Layout from 'components/Layout';

import './index.css';
import React from 'react';


const router
= createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  }
])

const root 
= ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);