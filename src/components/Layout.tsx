import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function Layout(): ReactElement {
  return (
    <div className="w-screem h-screen bg-gray-200 dark:bg-gray-700">
      <Header />
      <Outlet />
    </div>
  );
}
