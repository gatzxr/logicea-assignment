import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function Layout(): ReactElement {
  return (
    <div className="w-screem h-screen overflow-hidden bg-gray-200 transition duration-200 dark:bg-gray-700">
      <Header />
      <Outlet />
    </div>
  );
}
